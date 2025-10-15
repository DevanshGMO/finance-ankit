<?php
// Force POST only
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit('Method Not Allowed'); }
// Honeypot
if (!empty($_POST['form-anti-honeypot'] ?? '')) { http_response_code(400); exit('Bad Request'); }

// Collect fields
$name    = trim($_POST['quote-request-name']    ?? '');
$company = trim($_POST['quote-request-company'] ?? '');
$email   = trim($_POST['quote-request-email']   ?? '');
$phone   = trim($_POST['quote-request-phone']   ?? '');
$msg     = trim($_POST['quote-request-message'] ?? '');

// Validate
if ($name === '' || $email === '' || $phone === '' || $msg === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422); exit('Invalid form data.');
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php'; // Composer

// Helper: configure an SMTP-only PHPMailer instance
function smtpMailer(): PHPMailer {
  $m = new PHPMailer(true);
  $m->isSMTP();                                    // SMTP ONLY
  $m->Host       = getenv('SMTP_HOST');            // e.g. smtp.hostinger.com
  $m->SMTPAuth   = true;
  $m->Username   = getenv('SMTP_USER');            // e.g. info@ankitpanchalfinance.com
  $m->Password   = getenv('SMTP_PASS');            // put real password/app password in env
  $m->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // or ENCRYPTION_SMTPS
  $m->Port       = (int)(getenv('SMTP_PORT') ?: 587);
  $m->CharSet    = 'UTF-8';
  $m->AllowEmpty = false;
  return $m;
}

$ownerTo = 'info@ankitpanchalfinance.com';
$now = date('Y-m-d H:i:s');

// 1) Send to site owner
try {
  $mail = smtpMailer();
  // From should usually match SMTP user
  $mail->setFrom(getenv('SMTP_USER') ?: $ownerTo, 'Website Contact Form');
  $mail->addAddress($ownerTo, 'Ankit Panchal & Associates');
  $mail->addReplyTo($email, $name); // you can reply to the user

  $mail->isHTML(true);
  $mail->Subject = 'New Contact Form: ' . $name;
  $mail->Body = "
    <h2 style='margin:0 0 10px;'>New Website Enquiry</h2>
    <p><strong>Time:</strong> {$now}</p>
    <table cellpadding='6' style='border-collapse:collapse;'>
      <tr><td><strong>Name</strong></td><td>{$name}</td></tr>
      <tr><td><strong>Company</strong></td><td>{$company}</td></tr>
      <tr><td><strong>Email</strong></td><td>{$email}</td></tr>
      <tr><td><strong>Phone</strong></td><td>{$phone}</td></tr>
      <tr><td valign='top'><strong>Message</strong></td><td style='white-space:pre-line;'>{$msg}</td></tr>
    </table>";
  $mail->AltBody =
    "New Website Enquiry\nTime: {$now}\nName: {$name}\nCompany: {$company}\nEmail: {$email}\nPhone: {$phone}\n\nMessage:\n{$msg}";
  $mail->send();
} catch (Exception $e) {
  http_response_code(500); exit('Send failed (owner): ' . $mail->ErrorInfo);
}

// 2) Auto-reply to the visitor (optional—remove this block if not needed)
try {
  $ack = smtpMailer();
  $ack->setFrom(getenv('SMTP_USER') ?: $ownerTo, 'Ankit Panchal & Associates');
  $ack->addAddress($email, $name);
  $ack->isHTML(true);
  $ack->Subject = 'Thanks, we received your message';
  $ack->Body = "
    <p>Hi {$name},</p>
    <p>Thanks for contacting <strong>Ankit Panchal &amp; Associates</strong>. We’ve received your message and will reply shortly.</p>
    <p><em>Your message:</em></p>
    <blockquote style='border-left:3px solid #eee;padding-left:10px;color:#444;'>{$msg}</blockquote>
    <p>— Team APA</p>";
  $ack->AltBody = "Hi {$name},\n\nThanks for contacting Ankit Panchal & Associates. We’ll reply shortly.\n\nYour message:\n{$msg}\n\n— Team APA";
  $ack->send();
} catch (Exception $e) {
  // Don’t block the user if acknowledgement fails
}

// Success → redirect
header('Location: thank-you.html');
exit;
