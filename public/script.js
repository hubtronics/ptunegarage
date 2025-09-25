document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("contact-form");
  if(form){
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      var data = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function(response) {
        if (response.ok) {
          form.reset();
          document.getElementById("form-success").style.display = "block";
        } else {
          response.json().then(function(data){
            alert(data.error || "There was a problem submitting the form.");
          });
        }
      }).catch(function(error) {
        alert("There was a problem submitting the form.");
      });
    });
  }
});

function updatemenu() {
  if (document.getElementById('responsive-menu').checked == true) {
    document.getElementById('menu').style.borderBottomRightRadius = '0';
    document.getElementById('menu').style.borderBottomLeftRadius = '0';
  } else {
    document.getElementById('menu').style.borderRadius = '44px';
  }
}
