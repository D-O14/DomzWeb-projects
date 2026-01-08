const slider = document.querySelector('.slider');
document.querySelector('.right').onclick = () => {
    slider.scrollBy({ left: slider.clientWidth, behavior: "smooth" });
};

document.querySelector('.left').onclick = () => {
    slider.scrollBy({ left: -slider.clientWidth, behavior: "smooth" });
};

document.addEventListener('DOMContentLoaded', () => {

    const sliderTile = document.querySelector('.tile-slider');

    if (!sliderTile) return;

    let hideTimer;

    function showNav() {
        sliderTile.classList.add('show-nav');

        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            sliderTile.classList.remove('show-nav');
        }, 2500)
    }

    ['mousemove', 'click', 'touchstart', 'focusin'].forEach(event => {
        sliderTile.addEventListener(event, showNav);
    });
});



const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dyyvwfgqr', 
  api_key: '359132321779776', 
  api_secret: 'h4soM2tnY_AcrTiIStMa-FDlLTI' 
});

// Upload a file
cloudinary.uploader.upload("local_image.jpg", function(error, result) {
  console.log(result.url);
});