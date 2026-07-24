function initApp() {

    /* ==========================================================================
       1. Auto-Rotating Carousel (Why It Matters & Carousel Support)
       ========================================================================== */
    const carousels = document.querySelectorAll('.why-carousel, .senses-carousel');
    
    carousels.forEach(carouselContainer => {
        const slides = carouselContainer.querySelectorAll('.why-slide, .sense-slide');
        const dots = carouselContainer.querySelectorAll('.why-dot, .dot');

        if (!slides.length) return;

        let currentSlide = 0;
        let slideTimer = null;
        const DURATION = 5000; // 5-second auto-rotation

        function showSlide(index) {
            if (index === currentSlide && slides[index].classList.contains('active')) return;

            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            currentSlide = index;
            resetTimer();
        }

        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        function resetTimer() {
            clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, DURATION);
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const targetIndex = parseInt(dot.getAttribute('data-slide'));
                showSlide(targetIndex);
            });
        });

        // Touch Swiping Support for Mobile Phones
        let touchStartX = 0;
        let touchEndX = 0;

        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 35;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(prevIndex);
            }
        }

        // Start auto-rotation immediately
        resetTimer();
    });

    /* ==========================================================================
       2. Web3Forms Submission Handler
       ========================================================================== */
    const bookingForms = document.querySelectorAll('.booking-form');
    bookingForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(form);
            formData.append('access_key', '2176489b-98a3-4e01-b53d-9d53fa473b1b');
            formData.append('subject', 'New French Salon Booking Request');

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    alert('Thank you! Your booking request has been received. Cecile will contact you shortly to confirm details.');
                    form.reset();
                } else {
                    alert('Oops! Something went wrong submitting your request. Please try emailing contact@french-salon.com directly.');
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('Thank you! Your request has been recorded. If you do not hear back within 24 hours, please email contact@french-salon.com.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    });

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
