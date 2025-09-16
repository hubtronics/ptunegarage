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

// Gallery fade effect on mobile
document.addEventListener("DOMContentLoaded", function() {
  const gallery = document.querySelector('.gallery-fade');
  if (!gallery) return;

  const images = gallery.querySelectorAll('img');
  const dotsContainer = gallery.querySelector('.gallery-dots');
  let current = 0;
  let timer;

  // Create dots
  images.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.classList.add('gallery-dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showImage(idx));
    dotsContainer.appendChild(dot);
  });

  function showImage(idx) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
    dotsContainer.querySelectorAll('.gallery-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
    current = idx;
    resetTimer();
  }

  function nextImage() {
    showImage((current + 1) % images.length);
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextImage, 3000); // Change every 3 seconds
  }

  resetTimer();
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
