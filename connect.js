function sendEmail(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'abhiranda21@gmail.com'
    };

    emailjs.send('service_fr26a0q', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again.');
        });

    return false;
} 