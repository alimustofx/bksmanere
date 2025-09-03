        document.addEventListener("DOMContentLoaded", function() {
            // Scroll-triggered animations
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            
            if ("IntersectionObserver" in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const animation = entry.target.dataset.animation || 'animate__fadeInUp';
                            entry.target.style.opacity = 1;
                            entry.target.classList.add('animate__animated', animation);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });

                animatedElements.forEach(el => {
                    observer.observe(el);
                });
            } else {
                animatedElements.forEach(el => { el.style.opacity = 1; });
            }

            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });

            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;

                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                        if (!mobileMenu.classList.contains('hidden')) {
                            mobileMenu.classList.add('hidden');
                        }
                    }
                });
            });

            // News Modal Logic
            const modal = document.getElementById('news-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalImg = document.getElementById('modal-img');
            const modalContentText = document.getElementById('modal-content-text');
            const modalCloseBtn = document.getElementById('modal-close-btn');
            const readMoreBtns = document.querySelectorAll('.read-more-btn');

            function openModal(title, img, content) {
                modalTitle.textContent = title;
                modalImg.src = img;
                modalImg.alt = title;
                modalContentText.innerHTML = content;
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }

            function closeModal() {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }

            readMoreBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    openModal(btn.dataset.title, btn.dataset.img, btn.dataset.content);
                });
            });

            modalCloseBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });
        });