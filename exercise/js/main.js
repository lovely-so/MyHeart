const mainImage = document.querySelector('#mainImage');
const mainCaption = document.querySelector('#mainCaption');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (event) => {
        // Update main image source
        const srcImage = event.target.getAttribute('src');
        mainImage.setAttribute('src', srcImage);

        // Update main caption
        const caption = event.target.getAttribute('data-caption');
        mainCaption.textContent = caption;

        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        event.target.classList.add('active');

        // Add fade effect for main image
        mainImage.style.opacity = 0;
        setTimeout(() => {
            mainImage.style.opacity = 1;
        }, 100);
    });
});