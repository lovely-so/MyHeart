
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('#loadingScreen');
    const loadingMessage = document.querySelector('#loadingMessage');
    const galleryContainer = document.querySelector('#galleryContainer');
    const celebrationSound = document.querySelector('#celebrationSound');
    let clickCount = 0;

    const messages = [
        "🎉 كل سنة وإنتى طيب! 🎉",
        "🎂 يوم ميلاد سعيد! 🎂",
        "🎁 جهزى نفسك للمفاجآه! 🎁",
        "🌟 لنبدأ الاحتفال 🌟"
    ];

  document.addEventListener('click', () => {
        // أول تفاعل مع المستخدم لتشغيل الصوت
        if (celebrationSound.paused) {
            celebrationSound.play().catch(error => {
                console.log("Autoplay blocked by browser:", error);
            });
        }

        clickCount++;
        if (clickCount <= 4 && loadingMessage) {
            loadingMessage.style.animation = 'none';
            void loadingMessage.offsetWidth;
            loadingMessage.style.animation = 'bounceIn 0.8s ease forwards';
            loadingMessage.textContent = messages[clickCount - 1];
        }
        if (clickCount === 4) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                galleryContainer.classList.add('visible');
                //celebrationSound.pause();
            }, 300);
        }
    });


// Gallery Logic
const mainImage = document.querySelector('#mainImage');
const mainCaption = document.querySelector('#mainCaption');
const thumbnails = document.querySelectorAll('.thumbnail');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCaption = document.querySelector('#lightboxCaption');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = Array.from(thumbnails).findIndex(thumb => thumb.classList.contains('active'));

function updateMainImage(thumbnail, index) {
    const srcImage = thumbnail.getAttribute('src');
    const caption = thumbnail.getAttribute('data-caption');

    mainImage.style.opacity = 0;
    setTimeout(() => {
        mainImage.setAttribute('src', srcImage);
        mainImage.style.opacity = 1;
    }, 300);

    mainCaption.textContent = caption;

    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');

    currentIndex = index;
}

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        updateMainImage(thumbnail, index);
    });
});

mainImage.addEventListener('click', () => {
    lightboxImage.setAttribute('src', mainImage.getAttribute('src'));
    lightboxCaption.textContent = mainCaption.textContent;
    lightbox.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

prevBtn.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    updateMainImage(thumbnails[newIndex], newIndex);
});

nextBtn.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % thumbnails.length;
    updateMainImage(thumbnails[newIndex], newIndex);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    } else if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeBtn.click();
    }
});
});