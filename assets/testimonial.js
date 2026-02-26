(function () {
  function initTestimonialSlider(section) {
    var track = section.querySelector('[data-slider-track]');
    if (!track) return;

    var slides = Array.prototype.slice.call(track.children);
    if (!slides.length) return;

    var dotsContainer = section.querySelector('[data-slider-dots]');
    var prevButton = section.querySelector('[data-slider-prev]');
    var nextButton = section.querySelector('[data-slider-next]');
    var autoplay = section.dataset.autoplay === 'true';
    var autoplaySpeedMs = (parseInt(section.dataset.autoplaySpeed, 10) || 5) * 1000;
    var activeIndex = 0;
    var autoplayTimer;

    function renderDots() {
      if (!dotsContainer) return;

      dotsContainer.innerHTML = '';
      slides.forEach(function (_, index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'testimonial-slider__dot' + (index === activeIndex ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (index + 1));
        dot.addEventListener('click', function () {
          goToSlide(index);
          restartAutoplay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateTrack() {
      track.style.transform = 'translateX(-' + activeIndex * 100 + '%)';
      renderDots();
    }

    function goToSlide(index) {
      if (index < 0) {
        activeIndex = slides.length - 1;
      } else if (index >= slides.length) {
        activeIndex = 0;
      } else {
        activeIndex = index;
      }
      updateTrack();
    }

    function restartAutoplay() {
      if (!autoplay) return;
      window.clearInterval(autoplayTimer);
      autoplayTimer = window.setInterval(function () {
        goToSlide(activeIndex + 1);
      }, autoplaySpeedMs);
    }

    if (prevButton) {
      prevButton.addEventListener('click', function () {
        goToSlide(activeIndex - 1);
        restartAutoplay();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', function () {
        goToSlide(activeIndex + 1);
        restartAutoplay();
      });
    }

    updateTrack();
    restartAutoplay();
  }

  function initAll() {
    var sections = document.querySelectorAll('[data-testimonial-section]');
    sections.forEach(initTestimonialSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
