document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.booking-form');
    
    // Replace this with your actual Web3Forms Access Key
    const WEB3FORMS_ACCESS_KEY = "2176489b-98a3-4e01-b53d-9d53fa473b1b";
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = form.querySelector('input[name="email"]');
            if (emailInput) {
                // Simple but robust regex for email validation ensuring a TLD exists
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    alert('Please enter a valid email address.');
                    return;
                }
            }
            
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

    // Flip cards click-to-flip behavior for mobile/touch
    const flipCards = document.querySelectorAll('.exp-item');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
});
