// =========================
// AOS INIT
// =========================

AOS.init({
    once: true,
    offset: 50,
    duration: 1000,
});

// =========================
// SWIPER INIT
// =========================

const swiper = new Swiper(".mySwiper", {

    slidesPerView: 1,

    loop: true,

    effect: "fade",

    speed: 1000,

    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// =========================
// GUEST NAME FROM URL
// Example:
// ?to=Wisnu
// =========================

const urlParams = new URLSearchParams(window.location.search);

const guestName =
    urlParams.get('to') || 'Bapak/Ibu/Saudara/i';

document.getElementById('guest-name').innerText =
    decodeURIComponent(guestName);

// =========================
// MUSIC
// =========================

const bgMusic =
    document.getElementById('bg-music');

const musicBtn =
    document.getElementById('music-control');

let isPlaying = false;

// =========================
// OPEN INVITATION
// =========================

function openInvitation() {

    // Cover animation
    document
        .getElementById('cover')
        .classList
        .add('cover-opened');

    // Show content
    document
        .getElementById('main-content')
        .classList
        .remove('opacity-0');

    // Enable scroll
    document.body.style.overflow = 'auto';

    // Show music button
    musicBtn.classList.remove('hidden');

    // Play music
    toggleMusic();

    // Flower animation
    startFlowers();

    // Scroll top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// =========================
// TOGGLE MUSIC
// =========================

function toggleMusic() {

    const musicIcon =
        musicBtn.querySelector('i');

    if (isPlaying) {

        bgMusic.pause();

        musicBtn.classList.remove('spin');

        musicIcon.classList.remove('fa-compact-disc');

        musicIcon.classList.add('fa-volume-mute');

    } else {

        bgMusic.play();

        musicBtn.classList.add('spin');

        musicIcon.classList.remove('fa-volume-mute');

        musicIcon.classList.add('fa-compact-disc');
    }

    isPlaying = !isPlaying;
}

// =========================
// COUNTDOWN
// =========================

const countDownDate =
    new Date("May 28, 2026 09:00:00").getTime();

const countdown = setInterval(function () {

    const now = new Date().getTime();

    const distance = countDownDate - now;

    // Time calculation
    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    // Update HTML if element exists
    updateCountdown("days", days);
    updateCountdown("hours", hours);
    updateCountdown("minutes", minutes);
    updateCountdown("seconds", seconds);

    // Expired
    if (distance < 0) {

        clearInterval(countdown);

        updateCountdown("days", "00");
        updateCountdown("hours", "00");
        updateCountdown("minutes", "00");
        updateCountdown("seconds", "00");
    }

}, 1000);

// =========================
// UPDATE COUNTDOWN
// =========================

function updateCountdown(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.innerHTML =
            value.toString().padStart(2, '0');
    }
}

// =========================
// COPY REKENING
// =========================

function copyRekening(elementId) {

    const rekening = document
        .getElementById(elementId)
        .innerText
        .trim();

    // Modern clipboard
    if (navigator.clipboard) {

        navigator.clipboard.writeText(rekening)

            .then(() => {

                showToast(
                    "Nomor berhasil disalin!"
                );

            })

            .catch(() => {

                fallbackCopy(rekening);

            });

    } else {

        fallbackCopy(rekening);
    }
}

// =========================
// FALLBACK COPY
// =========================

function fallbackCopy(text) {

    const textarea =
        document.createElement("textarea");

    textarea.value = text;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    document.body.removeChild(textarea);

    showToast(
        "Nomor berhasil disalin!"
    );
}

// =========================
// TOAST
// =========================

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.innerHTML = `
        <i class="fas fa-check text-primary mr-2"></i>
        ${message}
    `;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}

// =========================
// FLOWER ANIMATION
// =========================

function startFlowers() {

    const container =
        document.getElementById('flower-container');

    container.classList.remove('hidden');

    // Prevent duplicate flowers
    if (container.childElementCount > 0) return;

    for (let i = 0; i < 25; i++) {

        const petal =
            document.createElement('div');

        petal.classList.add('petal');

        // Random position
        petal.style.left =
            Math.random() * 100 + 'vw';

        // Random size
        const size =
            Math.random() * 18 + 12;

        petal.style.width =
            size + 'px';

        petal.style.height =
            size + 'px';

        // Random duration
        petal.style.animationDuration =
            (Math.random() * 7 + 8) + 's';

        // Random delay
        petal.style.animationDelay =
            Math.random() * 5 + 's';

        // Random opacity
        petal.style.opacity =
            Math.random() * 0.5 + 0.3;

        container.appendChild(petal);
    }
}

// =========================
// SMOOTH SCROLL NAVIGATION
// =========================

document
    .querySelectorAll('a[href^="#"]')

    .forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute('href')
                );

            if (target) {

                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

// =========================
// AUTO PLAY MUSIC
// FIX MOBILE BROWSER
// =========================

document.addEventListener('click', () => {

    if (!isPlaying &&
        !musicBtn.classList.contains('hidden')) {

        bgMusic.play()
            .then(() => {

                isPlaying = true;

            })
            .catch(() => {});
    }

}, { once: true });

// =========================
// PRELOAD IMAGE
// =========================

window.addEventListener('load', () => {

    const images = [

        'images/cover.jpg',
        'images/hero.jpg',
        'images/mempelai.jpg',
        'images/image1.jpg',
        'images/image2.jpg',
        'images/image3.jpg',
        'images/image4.jpg'

    ];

    images.forEach(src => {

        const img = new Image();

        img.src = src;
    });
});

// =========================
// PARALLAX EFFECT
// =========================

window.addEventListener('scroll', () => {

    const scrolled =
        window.pageYOffset;

    const hero =
        document.querySelector('section');

    if (hero) {

        hero.style.backgroundPositionY =
            `${scrolled * 0.3}px`;
    }
});

// =========================
// FADE ON SCROLL
// =========================

const fadeElements =
    document.querySelectorAll('.fade-in');

const observer =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('show');
            }
        });

    }, {
        threshold: 0.2
    });

fadeElements.forEach(el => {

    observer.observe(el);
});

// =========================
// CONSOLE MESSAGE
// =========================

console.log(`
=========================================
   Wedding Invitation - Wisnu & Christia
=========================================
`);
