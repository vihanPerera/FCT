document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle --- */
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const body = document.body;

    // Check local storage or preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.remove('dark');
        document.getElementById('sun-icon').classList.remove('hidden');
        document.getElementById('moon-icon').classList.add('hidden');
    } else {
        body.classList.add('dark');
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        document.getElementById('sun-icon').classList.toggle('hidden');
        document.getElementById('moon-icon').classList.toggle('hidden');

        // Save preference
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    /* --- News Section Interaction --- */
    const newsItems = document.querySelectorAll('.news-item');
    const mainNewsImg = document.getElementById('main-news-img');
    const mainNewsTitle = document.getElementById('main-news-title');
    const mainNewsDesc = document.getElementById('main-news-desc');
    const mainNewsTag = document.getElementById('main-news-tag');

    newsItems.forEach(item => {
        item.addEventListener('click', function () {
            // Get data
            const img = this.getAttribute('data-img');
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            const tag = this.getAttribute('data-tag');

            // Animate out
            mainNewsImg.style.opacity = '0';
            mainNewsTitle.style.opacity = '0';
            mainNewsDesc.style.opacity = '0';

            setTimeout(() => {
                // Update content
                mainNewsImg.src = img;
                mainNewsTitle.innerText = title;
                mainNewsDesc.innerText = desc;
                mainNewsTag.innerText = tag;

                // Animate in
                mainNewsImg.style.opacity = '1';
                mainNewsTitle.style.opacity = '1';
                mainNewsDesc.style.opacity = '1';
            }, 300);
        });
    });

    /* --- Scroll Animations (Intersection Observer) --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to elements
    const animatedElements = document.querySelectorAll('.group, h2, p, .glass-panel, .btn-anim');
    animatedElements.forEach(el => {
        // Add base transition classes if not already there
        el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-10');
        fadeInObserver.observe(el);
    });

    /* --- Counter Animation --- */
    const counterSection = document.querySelector('.counter')?.closest('section');
    if (counterSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const speed = 200;
                        const inc = target / speed;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                counterObserver.disconnect();
            }
        }, { threshold: 0.5 });
        counterObserver.observe(counterSection);
    }
});
