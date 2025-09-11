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
