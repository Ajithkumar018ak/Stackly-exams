/* =========================================================
   ACHIEVE ACADEMY
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loginModal = document.getElementById("loginModal");

    const loginModalClose = document.getElementById("loginModalClose");

    const loginTriggers = document.querySelectorAll(".login-trigger");

    const loginTabs = document.querySelectorAll("[data-login-tab]");

    const loginForms = document.querySelectorAll("[data-login-form]");

    const userLoginForm = document.getElementById("userLoginForm");

    const adminLoginForm = document.getElementById("adminLoginForm");

    const menuToggle = document.getElementById("menuToggle");

    const mainNav = document.getElementById("mainNav");

    const siteHeader = document.getElementById("siteHeader");

    const scrollProgress = document.getElementById("scrollProgress");


    /* =====================================================
       LOGIN MODAL OPEN
    ===================================================== */

    function openLoginModal() {

        if (!loginModal) return;

        loginModal.classList.add("active");

        loginModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        // Default tab: Student Login
        switchLoginTab("user");

        // Focus email input
        setTimeout(() => {

            const emailInput = document.getElementById("userEmail");

            if (emailInput) {
                emailInput.focus();
            }

        }, 150);

    }


    /* =====================================================
       LOGIN MODAL CLOSE
    ===================================================== */

    function closeLoginModal() {

        if (!loginModal) return;

        loginModal.classList.remove("active");

        loginModal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

    }


    /* =====================================================
       LOGIN BUTTON EVENTS

       Header Login
       Hero Student Login
       Footer Student Login
    ===================================================== */

    loginTriggers.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            openLoginModal();

        });

    });


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (loginModalClose) {

        loginModalClose.addEventListener("click", () => {

            closeLoginModal();

        });

    }


    /* =====================================================
       CLOSE MODAL WHEN CLICKING OUTSIDE
    ===================================================== */

    if (loginModal) {

        loginModal.addEventListener("click", (event) => {

            if (event.target === loginModal) {

                closeLoginModal();

            }

        });

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeLoginModal();

        }

    });


    /* =====================================================
       STUDENT / ADMIN LOGIN TABS
    ===================================================== */

    function switchLoginTab(type) {

        loginTabs.forEach((tab) => {

            const isActive = tab.dataset.loginTab === type;

            tab.classList.toggle("active", isActive);

            tab.setAttribute(
                "aria-selected",
                String(isActive)
            );

        });


        loginForms.forEach((form) => {

            const isActive = form.dataset.loginForm === type;

            form.classList.toggle("active", isActive);

            form.hidden = !isActive;

        });


        // Update modal heading
        const loginTitle = document.getElementById("loginTitle");

        if (loginTitle) {

            loginTitle.textContent =
                type === "admin"
                    ? "Admin sign in"
                    : "Sign in to continue";

        }

    }


    loginTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            switchLoginTab(tab.dataset.loginTab);

        });

    });


    // Initial tab setup
    switchLoginTab("user");


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    const passwordToggleButtons = document.querySelectorAll(
        "[data-password-toggle]"
    );

    passwordToggleButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const inputId = button.dataset.passwordToggle;

            const passwordInput = document.getElementById(inputId);

            if (!passwordInput) return;

            const isPassword = passwordInput.type === "password";

            passwordInput.type = isPassword ? "text" : "password";

            button.setAttribute(
                "aria-label",
                isPassword ? "Hide password" : "Show password"
            );

            button.setAttribute(
                "aria-pressed",
                String(isPassword)
            );

        });

    });


    /* =====================================================
       STUDENT LOGIN SUBMIT

       user-dashboard.html
    ===================================================== */

    if (userLoginForm) {

        userLoginForm.addEventListener("submit", (event) => {

            event.preventDefault();

            if (!userLoginForm.checkValidity()) {

                userLoginForm.reportValidity();

                return;

            }

            const emailInput = document.getElementById("userEmail");

            const passwordInput = document.getElementById("userPassword");

            if (!emailInput || !passwordInput) return;

            const email = emailInput.value.trim();

            const password = passwordInput.value;

            if (!email || !password) {

                alert("Please enter your email and password.");

                return;

            }

            // Demo navigation only.
            // No database or authentication is connected.
            window.location.href = "user-dashboard.html";

        });

    }


    /* =====================================================
       ADMIN LOGIN SUBMIT

       admin-dashboard.html
    ===================================================== */

    if (adminLoginForm) {

        adminLoginForm.addEventListener("submit", (event) => {

            event.preventDefault();

            if (!adminLoginForm.checkValidity()) {

                adminLoginForm.reportValidity();

                return;

            }

            const emailInput = document.getElementById("adminEmail");

            const passwordInput = document.getElementById("adminPassword");

            if (!emailInput || !passwordInput) return;

            const email = emailInput.value.trim();

            const password = passwordInput.value;

            if (!email || !password) {

                alert("Please enter your admin email and password.");

                return;

            }

            // Demo navigation only.
            // No database or authentication is connected.
            window.location.href = "admin-dashboard.html";

        });

    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "nav-open",
                isOpen
            );

        });


        // Close mobile navigation after selecting a link
        mainNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                document.body.classList.remove("nav-open");

            });

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!siteHeader) return;

        siteHeader.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        if (!scrollProgress) return;

        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        if (scrollableHeight <= 0) {

            scrollProgress.style.width = "0%";

            return;

        }

        const progress =
            (window.scrollY / scrollableHeight) * 100;

        scrollProgress.style.width = `${progress}%`;

    }

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });

    window.addEventListener("resize", updateScrollProgress);

    updateScrollProgress();


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        backToTop.addEventListener("click", (event) => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       HERO IMAGE SLIDER
    ===================================================== */

    const heroImages = document.querySelectorAll(".hero-image");

    const heroDots = document.querySelectorAll(".hero-dot");

    let currentHeroIndex = 0;

    let heroSliderInterval;


    function showHeroImage(index) {

        if (!heroImages.length) return;

        currentHeroIndex =
            (index + heroImages.length) % heroImages.length;

        heroImages.forEach((image, imageIndex) => {

            image.classList.toggle(
                "active",
                imageIndex === currentHeroIndex
            );

        });

        heroDots.forEach((dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === currentHeroIndex
            );

        });

    }


    heroDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showHeroImage(index);

            restartHeroSlider();

        });

    });


    function startHeroSlider() {

        if (heroImages.length < 2) return;

        heroSliderInterval = setInterval(() => {

            showHeroImage(currentHeroIndex + 1);

        }, 4500);

    }


    function restartHeroSlider() {

        clearInterval(heroSliderInterval);

        startHeroSlider();

    }


    showHeroImage(0);

    startHeroSlider();


    /* =====================================================
       ANIMATED STAT COUNTERS
    ===================================================== */

    const statNumbers = document.querySelectorAll(".stat-number");


    function animateCounter(element) {

        if (element.dataset.counted === "true") return;

        element.dataset.counted = "true";

        const target = Number(element.dataset.count);

        if (!Number.isFinite(target)) return;

        const duration = 1400;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            // Smooth ease-out
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            element.textContent = Math.round(
                target * easedProgress
            );

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                element.textContent = target;

            }

        }

        requestAnimationFrame(updateCounter);

    }


    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.5
            }
        );

        statNumbers.forEach((number) => {

            counterObserver.observe(number);

        });

    } else {

        statNumbers.forEach(animateCounter);

    }


    /* =====================================================
       TESTIMONIAL SLIDER
    ===================================================== */

    const testimonialTrack = document.getElementById("testimonialTrack");

    const testimonialPrev = document.getElementById("testimonialPrev");

    const testimonialNext = document.getElementById("testimonialNext");


    if (
        testimonialTrack &&
        testimonialPrev &&
        testimonialNext
    ) {

        const testimonialCards = Array.from(
            testimonialTrack.querySelectorAll(".testimonial-card")
        );

        let testimonialIndex = 0;


        function getVisibleTestimonials() {

            if (window.innerWidth <= 600) return 1;

            if (window.innerWidth <= 900) return 2;

            return 3;

        }


        function updateTestimonials() {

            if (!testimonialCards.length) return;

            const visibleCount = getVisibleTestimonials();

            const maxIndex = Math.max(
                0,
                testimonialCards.length - visibleCount
            );

            testimonialIndex = Math.min(
                testimonialIndex,
                maxIndex
            );

            const cardWidth = testimonialCards[0].getBoundingClientRect().width;

            const trackStyles = window.getComputedStyle(testimonialTrack);

            const gap = parseFloat(trackStyles.gap) || 0;

            testimonialTrack.style.transform =
                `translateX(-${testimonialIndex * (cardWidth + gap)}px)`;

        }


        testimonialNext.addEventListener("click", () => {

            const maxIndex = Math.max(
                0,
                testimonialCards.length - getVisibleTestimonials()
            );

            testimonialIndex =
                testimonialIndex >= maxIndex
                    ? 0
                    : testimonialIndex + 1;

            updateTestimonials();

        });


        testimonialPrev.addEventListener("click", () => {

            const maxIndex = Math.max(
                0,
                testimonialCards.length - getVisibleTestimonials()
            );

            testimonialIndex =
                testimonialIndex <= 0
                    ? maxIndex
                    : testimonialIndex - 1;

            updateTestimonials();

        });


        window.addEventListener("resize", updateTestimonials);

        updateTestimonials();

    }

});










/* =====================================================
   ACHIEVE ACADEMY — PRELOADER CONTROLLER
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const preloader = document.getElementById("academyPreloader");

    const progressBar = document.getElementById("preloaderProgress");

    const percentageText = document.getElementById("preloaderPercentage");

    const message = document.getElementById("preloaderMessage");

    if (!preloader) return;


    let progress = 0;

    const messages = [
        {
            limit: 20,
            text: "Preparing Your Future"
        },
        {
            limit: 45,
            text: "Opening New Possibilities"
        },
        {
            limit: 70,
            text: "Building Your Knowledge"
        },
        {
            limit: 90,
            text: "Almost Ready"
        },
        {
            limit: 100,
            text: "Your Journey Begins Now"
        }
    ];


    const progressTimer = setInterval(() => {

        // Gradually increase the progress.
        progress += Math.random() * 3 + 1;

        progress = Math.min(progress, 100);

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        if (percentageText) {
            percentageText.textContent =
                `${Math.floor(progress)}%`;
        }

        const currentMessage = messages.find((item) => {
            return progress <= item.limit;
        }) || messages[messages.length - 1];

        if (message) {
            message.textContent = currentMessage.text;
        }

        if (progress >= 100) {

            clearInterval(progressTimer);

            // Let the book, pen and cup animation finish.
            setTimeout(() => {

                preloader.classList.add("preloader-exit");

                setTimeout(() => {

                    preloader.classList.add("preloader-hidden");

                    document.body.classList.remove("preloader-active");

                    // Remove the overlay after the fade-out.
                    setTimeout(() => {

                        preloader.remove();

                    }, 950);

                }, 850);

            }, 350);

        }

    }, 65);

});
















/* =========================================================
   ACHIEVE ACADEMY — ABOUT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. FOOTER CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       2. ABOUT HERO IMAGE CAROUSEL
    ===================================================== */

    const carousel = document.getElementById("aboutCarousel");

    if (carousel) {

        const slides = [
            {
                title: "Knowledge Creates Possibilities.",
                description: "Build your foundation, one step at a time."
            },
            {
                title: "Every Goal Deserves a Plan.",
                description: "Prepare with purpose and make every study session count."
            },
            {
                title: "Your Future Starts with Learning.",
                description: "Take small steps towards your ambitions every day."
            }
        ];

        const images = Array.from(
            carousel.querySelectorAll(".about-carousel-image")
        );

        const dots = Array.from(
            carousel.querySelectorAll(".about-carousel-dot")
        );

        const previousButton = document.getElementById(
            "aboutCarouselPrev"
        );

        const nextButton = document.getElementById(
            "aboutCarouselNext"
        );

        const slideNumber = document.getElementById(
            "aboutSlideNumber"
        );

        const slideTitle = document.getElementById(
            "aboutSlideTitle"
        );

        const slideDescription = document.getElementById(
            "aboutSlideDescription"
        );

        let currentSlide = 0;
        let autoplayTimer = null;

        const autoplayDelay = 5000;


        function showSlide(index) {

            if (!images.length) return;

            currentSlide =
                (index + images.length) % images.length;

            images.forEach((image, imageIndex) => {

                image.classList.toggle(
                    "active",
                    imageIndex === currentSlide
                );

            });

            dots.forEach((dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === currentSlide
                );

                dot.setAttribute(
                    "aria-pressed",
                    dotIndex === currentSlide ? "true" : "false"
                );

            });

            if (slideNumber) {

                slideNumber.textContent =
                    String(currentSlide + 1).padStart(2, "0") +
                    " / " +
                    String(images.length).padStart(2, "0");

            }

            if (slideTitle && slides[currentSlide]) {

                slideTitle.textContent =
                    slides[currentSlide].title;

            }

            if (slideDescription && slides[currentSlide]) {

                slideDescription.textContent =
                    slides[currentSlide].description;

            }

        }


        function nextSlide() {
            showSlide(currentSlide + 1);
        }


        function previousSlide() {
            showSlide(currentSlide - 1);
        }


        function stopAutoplay() {

            if (autoplayTimer !== null) {
                window.clearInterval(autoplayTimer);
                autoplayTimer = null;
            }

        }


        function startAutoplay() {

            stopAutoplay();

            if (
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            ) {
                return;
            }

            autoplayTimer = window.setInterval(
                nextSlide,
                autoplayDelay
            );

        }


        function restartAutoplay() {
            startAutoplay();
        }


        if (nextButton) {

            nextButton.addEventListener("click", () => {

                nextSlide();
                restartAutoplay();

            });

        }


        if (previousButton) {

            previousButton.addEventListener("click", () => {

                previousSlide();
                restartAutoplay();

            });

        }


        dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {

                showSlide(index);
                restartAutoplay();

            });

        });


        /* Pause while the user hovers over the carousel */

        carousel.addEventListener("mouseenter", stopAutoplay);

        carousel.addEventListener("mouseleave", startAutoplay);


        /* Pause when the browser tab is hidden */

        document.addEventListener("visibilitychange", () => {

            if (document.hidden) {
                stopAutoplay();
            } else {
                startAutoplay();
            }

        });


        /* Touch swipe support */

        let touchStartX = 0;
        let touchEndX = 0;

        const carouselFrame = carousel.querySelector(
            ".about-carousel-frame"
        );

        if (carouselFrame) {

            carouselFrame.addEventListener(
                "touchstart",
                (event) => {

                    touchStartX = event.changedTouches[0].clientX;

                },
                { passive: true }
            );


            carouselFrame.addEventListener(
                "touchend",
                (event) => {

                    touchEndX = event.changedTouches[0].clientX;

                    const difference = touchStartX - touchEndX;

                    if (Math.abs(difference) < 45) {
                        return;
                    }

                    if (difference > 0) {
                        nextSlide();
                    } else {
                        previousSlide();
                    }

                    restartAutoplay();

                },
                { passive: true }
            );

        }


        /* Initialize */

        showSlide(0);
        startAutoplay();

    }



    /* =====================================================
       3. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        function closeMenu() {

            mainNav.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove("about-menu-open");

        }


        function openMenu() {

            mainNav.classList.add("active");

            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            document.body.classList.add("about-menu-open");

        }


        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        /* Close after selecting a navigation link */

        mainNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", closeMenu);

        });


        /* Close with Escape */

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        /* Restore desktop navigation after resizing */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {
                closeMenu();
            }

        });

    }



    /* =====================================================
       4. BACK TO TOP
    ===================================================== */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        backToTop.addEventListener("click", (event) => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth"
            });

        });

    }

});