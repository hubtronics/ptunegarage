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
