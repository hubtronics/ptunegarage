// Overlay menu logic (only overlay, not old nav)
const mobileHamburger = document.getElementById('mobileHamburger');
const mobileOverlayMenu = document.getElementById('mobileOverlayMenu');
const mobileOverlayClose = document.getElementById('mobileOverlayClose');
if (mobileHamburger && mobileOverlayMenu) {
  mobileHamburger.addEventListener('click', function() {
    mobileOverlayMenu.classList.add('open');
  });
}
if (mobileOverlayClose && mobileOverlayMenu) {
  mobileOverlayClose.addEventListener('click', function() {
    mobileOverlayMenu.classList.remove('open');
  });
}
// Optional: close overlay when clicking a nav link
if (mobileOverlayMenu) {
  mobileOverlayMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      mobileOverlayMenu.classList.remove('open');
    });
  });
}
// Hamburger menu toggle for mobile nav
const srHamburger = document.getElementById('srHamburger');
const srNav = document.getElementById('srNav');
if (srHamburger && srNav) {
  srHamburger.addEventListener('click', function() {
    srNav.classList.toggle('open');
  });
  // Optional: close nav when clicking a link (mobile UX)
  srNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      srNav.classList.remove('open');
    });
  });
}
// Booking form handler
document.getElementById('bookingForm').onsubmit = function(e) {
  e.preventDefault();
  fetch(this.action, {
    method: 'POST',
    body: new FormData(this),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      document.getElementById('bookingSuccess').style.display = 'block';
      this.reset();
    }
  });
};

// Map modal open/close
document.getElementById('openMap').onclick = function() {
  document.getElementById('mapModal').style.display = 'flex';
};
document.getElementById('closeMap').onclick = function() {
  document.getElementById('mapModal').style.display = 'none';
};
document.getElementById('mapModal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};

// Smooth scroll and nav highlight
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
      this.classList.add('active');
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Sliding gallery (carousel)
document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.querySelector('.gallery-fade');
  if (!gallery) return;

  const images = Array.from(gallery.querySelectorAll('img'));
  const dotsContainer = gallery.querySelector('.gallery-dots') || document.createElement('div');

  // Wrap images in a track
  const track = document.createElement('div');
  track.className = 'gallery-track';
  // wrap each image in a slide container so flex sizing is reliable
  const slides = images.map(img => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide';
    slide.appendChild(img);
    return slide;
  });
  // insert track first so flex layout is computed by the browser
  gallery.insertBefore(track, gallery.querySelector('.gallery-dots'));
  slides.forEach(s => track.appendChild(s));

  // ensure track is a direct child and gallery overflow hides extra slides
  gallery.style.position = gallery.style.position || 'relative';
  gallery.style.overflow = 'hidden';

  // maintain explicit pixel widths so translateX in pixels is precise
  let slideWidth = 0;
  function updateSizes() {
    slideWidth = gallery.clientWidth;
    slides.forEach(s => { s.style.width = slideWidth + 'px'; });
    track.style.width = (slideWidth * slides.length) + 'px';
    // reposition to current after sizes change
    track.style.transform = `translateX(${-current * slideWidth}px)`;
  }
  // Ensure dots container exists
  if (!gallery.querySelector('.gallery-dots')) {
    dotsContainer.className = 'gallery-dots';
    gallery.appendChild(dotsContainer);
  }
  // initial sizing after elements are in DOM
  updateSizes();

  let current = 0;
  let timer = null;
  const interval = 3000;

  function goTo(index) {
    current = (index + images.length) % images.length;
    // move track so that slide at `current` is visible using computed slideWidth
    const offset = -current * slideWidth;
    track.style.transform = `translateX(${offset}px)`;
    // update dots
    Array.from(dotsContainer.children).forEach((d, i) => d.classList.toggle('active', i === current));
  }

  // handle resize: recalc sizes and position so current slide remains visible
  window.addEventListener('resize', function() {
    clearTimeout(window._galleryResizeTimeout);
    window._galleryResizeTimeout = setTimeout(() => updateSizes(), 120);
  });

  // Create dots
  images.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = 'gallery-dot';
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goTo(idx);
      restart();
    });
    dotsContainer.appendChild(dot);
  });

  function next() { goTo((current + 1) % images.length); }
  function start() { if (!timer) timer = setInterval(next, interval); }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  // Pause on hover
  gallery.addEventListener('mouseenter', stop);
  gallery.addEventListener('mouseleave', start);

  // start autoplay
  goTo(0);
  start();
});

document.addEventListener("DOMContentLoaded", function() {
  if (window.innerWidth > 600) return; // Only on mobile

  document.querySelectorAll('.service-title').forEach(function(title) {
    title.addEventListener('click', function() {
      // Close other open descriptions
      document.querySelectorAll('.service').forEach(function(svc) {
        if (svc !== title.parentElement) svc.classList.remove('active');
      });
      // Toggle current
      title.parentElement.classList.toggle('active');
    });
  });
});

// Mobile: toggle service description on click
if (window.matchMedia('(max-width: 600px)').matches) {
  document.querySelectorAll('.service').forEach(service => {
    service.addEventListener('click', function(e) {
      // Toggle active class
      if (this.classList.contains('active')) {
        this.classList.remove('active');
      } else {
        document.querySelectorAll('.service').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
}

// Split carousel auto-scroll and manual control for mobile
function initSplitCarousel() {
  if (window.matchMedia('(max-width: 600px)').matches) {
    const topCards = document.querySelectorAll('.carousel-top .service');
    const bottomCards = document.querySelectorAll('.carousel-bottom .service');
    let topIndex = 0;
    let bottomIndex = bottomCards.length - 1;
    function showCards() {
      topCards.forEach((card, i) => card.classList.toggle('active', i === topIndex));
      bottomCards.forEach((card, i) => card.classList.toggle('active', i === bottomIndex));
    }
    function nextTop() {
      topIndex = (topIndex + 1) % topCards.length;
      showCards();
    }
    function prevBottom() {
      bottomIndex = (bottomIndex - 1 + bottomCards.length) % bottomCards.length;
      showCards();
    }
    // Auto-scroll every 3 seconds
    setInterval(() => {
      nextTop();
      prevBottom();
    }, 3000);
    // Manual tap/swipe for top
    document.querySelector('.carousel-top').addEventListener('click', nextTop);
    // Manual tap/swipe for bottom
    document.querySelector('.carousel-bottom').addEventListener('click', prevBottom);
    showCards();
  }
}
document.addEventListener('DOMContentLoaded', initSplitCarousel);
