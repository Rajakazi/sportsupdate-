function sendEmail(event) {
    event.preventDefault();

    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('body').value;

    // Log values to ensure the form is filled correctly
    console.log(`To: ${to}, Subject: ${subject}, Body: ${body}`);

    if (!to || !subject || !body) {
        alert('All fields are required.');
        return;
    }

    // Prepare the email content
    const emailContent = [
        `To: ${to}`,
        'Content-Type: text/plain; charset=utf-8',
        'MIME-Version: 1.0',
        `Subject: ${subject}`,
        '',
        body,
    ].join('\n');

    // Base64 URL encoding (removing '+' and '/' and adding '-' and '_')
    const base64EncodedEmail = btoa(emailContent)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    tokenClient.callback = async (resp) => {
        if (resp.error) {
            console.error('Error with token request:', resp.error);
            alert('Error with token request!');
            return;
        }
        try {
            // Send the email using Gmail API
            const response = await gapi.client.gmail.users.messages.send({
                'userId': 'me',
                'resource': {
                    'raw': base64EncodedEmail
                }
            });
            console.log('Email sent successfully:', response);
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Check the console for details.');
        }
    };

    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        tokenClient.requestAccessToken({ prompt: '' });
    }
}
