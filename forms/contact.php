<?php
// Replace contact@example.com with your real receiving email address
$receiving_email_address = 'abhiranda21@gmail.com';

// Process AJAX request
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message'])) {
  
  // Sanitize and validate input (you can add more validation as needed)
  $name = htmlspecialchars($_POST['name']);
  $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ? $_POST['email'] : '';
  $subject = htmlspecialchars($_POST['subject']);
  $message = htmlspecialchars($_POST['message']);
  
  // Check if email is valid
  if (empty($email)) {
    echo 'error';
    exit;
  }
  
  // Send email (example using mail function, replace with your preferred method)
  $headers = "From: $name <$email>";
  $body = "Subject: $subject\n\n$message";
  
  if (mail($receiving_email_address, $subject, $body, $headers)) {
    echo 'success';
  } else {
    echo 'error';
  }
  
} else {
  echo 'error';
}
?>
