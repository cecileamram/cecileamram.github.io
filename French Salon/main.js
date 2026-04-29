document.addEventListener('DOMContentLoaded', () => {
    // Handle all forms with class 'ajax-form'
    const forms = document.querySelectorAll('.ajax-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    window.location.href = 'thankyou.html';
                } else {
                    alert('Oops! There was a problem submitting your form');
                    btn.innerText = originalText;
                    btn.disabled = false;
                }
            }).catch(error => {
                alert('Oops! There was a problem submitting your form');
                btn.innerText = originalText;
                btn.disabled = false;
            });
        });
    });
});
