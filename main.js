document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.booking-form');
    
    // Replace this with your actual Web3Forms Access Key
    const WEB3FORMS_ACCESS_KEY = "0d14d12e-b371-438d-950b-9494e6249e2c";
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.disabled = true;

            const formData = new FormData(form);
            formData.append('access_key', WEB3FORMS_ACCESS_KEY);
            // Subject line for the email you receive
            formData.append('subject', 'New French Salon Booking Request');
            // From name
            formData.append('from_name', 'French Salon Website');

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'thankyou.html';
                } else {
                    alert('Error: ' + data.message);
                    btn.innerText = originalText;
                    btn.disabled = false;
                }
            })
            .catch(error => {
                alert('Oops! There was a problem submitting your form. Please try again.');
                btn.innerText = originalText;
                btn.disabled = false;
            });
        });
    });
});
