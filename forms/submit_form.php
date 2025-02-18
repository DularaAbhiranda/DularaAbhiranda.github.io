<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));
    
    // Check data
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "error";
        exit;
    }
    
    // Set up email
    $recipient = "abhiranda21@gmail.com";
    $email_subject = "New Contact Form Message: $subject";
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    // Build email headers
    $email_headers = "From: $name <$email>";
    
    // Send the email
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "error";
}
?>