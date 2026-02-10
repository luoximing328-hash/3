// 首页专用脚本：顶部轮播（占位图可后续替换为真实图片）
document.addEventListener('DOMContentLoaded', function() {
    var wrap = document.querySelector('.home-carousel-wrap');
    if (!wrap) return;

    var carousel = wrap.querySelector('.home-carousel');
    var track = wrap.querySelector('.home-carousel-track');
    var dotsContainer = document.getElementById('carouselDots');
    if (!carousel || !track || !dotsContainer) return;

    var slides = track.querySelectorAll('.home-carousel-slide');
    var total = slides.length;
    if (total === 0) return;

    // 生成指示点
    for (var i = 0; i < total; i++) {
        var dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('data-index', i);
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', '切换到第' + (i + 1) + '张');
        dotsContainer.appendChild(dot);
    }

    var dots = dotsContainer.querySelectorAll('.dot');

    function updateDots() {
        var scrollLeft = carousel.scrollLeft;
        var width = carousel.clientWidth;
        var index = Math.round(scrollLeft / width);
        index = Math.max(0, Math.min(index, total - 1));
        dots.forEach(function(d, i) {
            d.classList.toggle('active', i === index);
        });
    }

    function goToSlide(index) {
        var width = carousel.clientWidth;
        carousel.scrollTo({ left: index * width, behavior: 'smooth' });
    }

    carousel.addEventListener('scroll', updateDots);
    dots.forEach(function(dot, i) {
        dot.addEventListener('click', function() { goToSlide(i); });
    });

    updateDots();
});
