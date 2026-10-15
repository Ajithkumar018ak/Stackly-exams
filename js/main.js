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


    /* Mobile navigation is handled by the dedicated navigation controller below */


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



    /* Mobile navigation is handled by the dedicated navigation controller below */



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

















/* =========================================================
   ACHIEVE ACADEMY — COURSES PAGE JAVASCRIPT
   File: js/courses.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       1. COURSE FILTERING
    ===================================================== */

    const filterButtons = document.querySelectorAll(".course-filter");
    const courseCards = document.querySelectorAll(".course-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = (
                button.dataset.filter ||
                button.textContent.trim().toLowerCase()
            ).toLowerCase();

            // Active filter button
            filterButtons.forEach((item) => {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            // Filter course cards
            courseCards.forEach((card, index) => {
                const category = (
                    card.dataset.category || ""
                ).toLowerCase();

                const shouldShow =
                    selectedFilter === "all" ||
                    selectedFilter === "all courses" ||
                    category === selectedFilter;

                if (shouldShow) {
                    card.hidden = false;

                    card.style.animation = "none";
                    void card.offsetWidth;

                    card.style.animation =
                        `courseCardReveal 0.45s ease ${Math.min(index * 0.06, 0.3)}s both`;
                } else {
                    card.hidden = true;
                    card.style.animation = "none";
                }
            });

            // Update visible course count if an element exists
            const visibleCount = Array.from(courseCards).filter(
                (card) => !card.hidden
            ).length;

            const countElement = document.querySelector(
                "[data-course-count]"
            );

            if (countElement) {
                countElement.textContent = visibleCount;
            }
        });
    });


    /* =====================================================
       2. COURSE BOOKMARK BUTTONS
       Static demo interaction — no storage used
    ===================================================== */

    const bookmarkButtons = document.querySelectorAll(
        ".course-bookmark"
    );

    bookmarkButtons.forEach((button) => {
        button.setAttribute("type", "button");

        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            const isBookmarked =
                button.classList.toggle("is-bookmarked");

            button.setAttribute(
                "aria-pressed",
                String(isBookmarked)
            );

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.toggle(
                    "fa-solid",
                    isBookmarked
                );

                icon.classList.toggle(
                    "fa-regular",
                    !isBookmarked
                );
            }

            button.setAttribute(
                "aria-label",
                isBookmarked
                    ? "Remove course from bookmarks"
                    : "Add course to bookmarks"
            );

            showToast(
                isBookmarked
                    ? "Course added to your bookmarks!"
                    : "Course removed from bookmarks."
            );
        });
    });


    /* =====================================================
       3. SCROLL REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .category-card, .course-card, " +
        ".path-card, .experience-card, .testimonial-card, " +
        ".benefit-item, .success-stat"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    /* =====================================================
       4. ANIMATED SUCCESS COUNTERS
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter) {
        if (counter.dataset.counted === "true") return;

        counter.dataset.counted = "true";

        const rawValue =
            counter.dataset.target ||
            counter.dataset.count ||
            counter.textContent.trim();

        const numericValue = Number(
            String(rawValue).replace(/[^\d.]/g, "")
        );

        if (!Number.isFinite(numericValue)) return;

        const duration = 1600;
        const startTime = performance.now();

        const originalText = counter.textContent.trim();

        const suffixMatch = originalText.match(/[+%]$/);
        const suffix = suffixMatch ? suffixMatch[0] : "";

        function updateCounter(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            // Smooth ease-out animation
            const easedProgress =
                1 - Math.pow(1 - progress, 4);

            const currentValue = Math.round(
                numericValue * easedProgress
            );

            counter.textContent =
                currentValue.toLocaleString("en-IN") + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent =
                    numericValue.toLocaleString("en-IN") + suffix;
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
            { threshold: 0.5 }
        );

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });
    } else {
        counters.forEach(animateCounter);
    }


    /* =====================================================
       5. SMOOTH SCROLL FOR INTERNAL PAGE LINKS
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        '.courses-page a[href^="#"]'
    );

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
                    ? "auto"
                    : "smooth",
                block: "start"
            });
        });
    });


    /* =====================================================
       6. COURSE CARD HOVER TILT
       Desktop only — subtle 3D interaction
    ===================================================== */

    const supportsFinePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (supportsFinePointer && !prefersReducedMotion) {
        courseCards.forEach((card) => {
            card.addEventListener("mousemove", (event) => {
                if (card.hidden) return;

                const rect = card.getBoundingClientRect();

                const mouseX =
                    (event.clientX - rect.left) / rect.width;

                const mouseY =
                    (event.clientY - rect.top) / rect.height;

                const rotateY = (mouseX - 0.5) * 4;
                const rotateX = (0.5 - mouseY) * 4;

                card.style.transform =
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }


    /* =====================================================
       7. HERO BOOK PARALLAX
    ===================================================== */

    const heroVisual = document.querySelector(".hero-visual");
    const heroBook = document.querySelector(".hero-book");

    if (
        heroVisual &&
        heroBook &&
        supportsFinePointer &&
        !prefersReducedMotion
    ) {
        heroVisual.addEventListener("mousemove", (event) => {
            const rect = heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            heroBook.style.setProperty(
                "--mouse-rotate-y",
                `${x * 8}deg`
            );

            heroBook.style.setProperty(
                "--mouse-rotate-x",
                `${y * -5}deg`
            );
        });

        heroVisual.addEventListener("mouseleave", () => {
            heroBook.style.setProperty(
                "--mouse-rotate-y",
                "0deg"
            );

            heroBook.style.setProperty(
                "--mouse-rotate-x",
                "0deg"
            );
        });
    }


    /* =====================================================
       8. HERO PARTICLES
    ===================================================== */

    const heroParticles = document.querySelectorAll(
        ".hero-particle"
    );

    heroParticles.forEach((particle, index) => {
        particle.style.setProperty(
            "--particle-delay",
            `${index * -1.4}s`
        );
    });


    /* =====================================================
       9. TOAST NOTIFICATION
    ===================================================== */

    let toastTimer;

    function showToast(message) {
        let toast = document.querySelector(
            ".courses-toast"
        );

        if (!toast) {
            toast = document.createElement("div");

            toast.className = "courses-toast";
            toast.setAttribute("role", "status");
            toast.setAttribute("aria-live", "polite");

            Object.assign(toast.style, {
                position: "fixed",
                bottom: "26px",
                left: "50%",
                transform: "translate(-50%, 20px)",
                padding: "14px 22px",
                borderRadius: "14px",
                background: "#172344",
                color: "#ffffff",
                border: "1px solid rgba(145,173,255,0.3)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
                fontSize: "14px",
                fontWeight: "600",
                zIndex: "9999",
                opacity: "0",
                pointerEvents: "none",
                transition: "opacity 0.25s ease, transform 0.25s ease",
                maxWidth: "calc(100vw - 32px)",
                textAlign: "center"
            });

            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.opacity = "1";
        toast.style.transform = "translate(-50%, 0)";

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translate(-50%, 20px)";
        }, 2400);
    }


    /* =====================================================
       10. CURRENT YEAR
       Updates the year if the page has this element
    ===================================================== */

    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       11. ACCESSIBILITY — REDUCED MOTION
    ===================================================== */

    if (prefersReducedMotion) {
        document.documentElement.style.scrollBehavior = "auto";
    }


    /* =====================================================
       12. INITIALIZE FILTER ACCESSIBILITY
    ===================================================== */

    filterButtons.forEach((button) => {
        button.setAttribute(
            "aria-pressed",
            button.classList.contains("active") ? "true" : "false"
        );
    });

    console.log("ACHIEVE Academy Courses page initialized.");
});


/* =========================================================
   COURSE CARD REVEAL ANIMATION
========================================================= */

const courseAnimationStyle = document.createElement("style");

courseAnimationStyle.textContent = `
    @keyframes courseCardReveal {
        from {
            opacity: 0;
            transform: translateY(14px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .course-card[hidden] {
        display: none !important;
    }

    .course-bookmark.is-bookmarked {
        color: #f1c879 !important;
    }

    .courses-page .reveal,
    .courses-page .category-card,
    .courses-page .course-card,
    .courses-page .path-card,
    .courses-page .experience-card,
    .courses-page .testimonial-card,
    .courses-page .benefit-item,
    .courses-page .success-stat {
        transition:
            opacity 0.6s ease,
            transform 0.6s ease,
            border-color 0.3s ease,
            background 0.3s ease;
    }

    .courses-page .reveal:not(.is-visible) {
        opacity: 0;
        transform: translateY(24px);
    }

    @media (prefers-reduced-motion: reduce) {
        .courses-page *,
        .courses-page *::before,
        .courses-page *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

document.head.appendChild(courseAnimationStyle);








/* ==========================================
   ACHIEVE ACADEMY — ABOUT IMAGE CAROUSEL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.getElementById("aboutCarousel");

    if (!carousel) return;

    const slides = carousel.querySelectorAll(".about-carousel-image");

    if (slides.length <= 1) return;

    let currentIndex = 0;
    let carouselInterval;

    // Initialize carousel
    function showSlide(index) {

        slides.forEach((slide, i) => {

            slide.classList.toggle("active", i === index);

        });

        currentIndex = index;

    }

    // Next slide
    function nextSlide() {

        const nextIndex = (currentIndex + 1) % slides.length;

        showSlide(nextIndex);

    }

    // Start automatic slideshow
    function startCarousel() {

        stopCarousel();

        carouselInterval = setInterval(nextSlide, 4000);

    }

    // Stop automatic slideshow
    function stopCarousel() {

        if (carouselInterval) {
            clearInterval(carouselInterval);
        }

    }

    // Start carousel
    showSlide(0);
    startCarousel();

    // Pause when mouse enters carousel
    carousel.addEventListener("mouseenter", stopCarousel);

    // Resume when mouse leaves carousel
    carousel.addEventListener("mouseleave", startCarousel);

    // Pause when tab is inactive
    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {
            stopCarousel();
        } else {
            startCarousel();
        }

    });

});





/* ============================================
   ACHIEVE ACADEMY
   COMPLETE MOBILE NAVIGATION
============================================ */

document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const overlay = document.getElementById("mobileNavOverlay");

    // Stop if required elements are missing
    if (!menuToggle || !mainNav) {
        return;
    }

    let isOpen = false;


    /* ========================================
       OPEN MOBILE MENU
    ======================================== */

    function openMenu() {

        if (window.innerWidth > 900) return;

        isOpen = true;

        mainNav.classList.add("active");
        if (overlay) {
            overlay.classList.add("active");
            overlay.setAttribute("aria-hidden", "false");
        }
        menuToggle.classList.add("active");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    }


    /* ========================================
       CLOSE MOBILE MENU
    ======================================== */

    function closeMenu() {

        isOpen = false;

        mainNav.classList.remove("active");
        if (overlay) {
            overlay.classList.remove("active");
            overlay.setAttribute("aria-hidden", "true");
        }
        menuToggle.classList.remove("active");

        document.body.classList.remove("menu-open");
        document.body.classList.remove("nav-open");
        document.body.classList.remove("about-menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    /* ========================================
       HAMBURGER CLICK
    ======================================== */

    menuToggle.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* ========================================
       OVERLAY CLICK
    ======================================== */

    if (overlay) {
        overlay.addEventListener("click", function () {
            closeMenu();
        });
    }


    /* ========================================
       CLOSE AFTER LINK OR BUTTON CLICK
    ======================================== */

    mainNav.querySelectorAll("a, button").forEach(function (element) {

        element.addEventListener("click", function () {

            closeMenu();

        });

    });


    /* ========================================
       ESCAPE KEY
    ======================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && isOpen) {
            closeMenu();
        }

    });


    /* ========================================
       RESET WHEN SWITCHING TO DESKTOP
    ======================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900 && isOpen) {
            closeMenu();
        }

    });


    /* ========================================
       STICKY HEADER SCROLL EFFECT
    ======================================== */

    if (header) {

        function updateHeader() {

            header.classList.toggle(
                "scrolled",
                window.scrollY > 50
            );

        }

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

        updateHeader();

    }


    /* ========================================
       INITIAL CLEAN STATE
    ======================================== */

    closeMenu();

});