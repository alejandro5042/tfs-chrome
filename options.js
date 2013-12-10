// Saves options to localStorage.
function save_options() {
  localStorage["baseUrl"] = document.getElementById("baseUrl").value;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var baseUrl = localStorage["baseUrl"];
  if (!favorite) {
    return;
  }
  document.getElementById("baseUrl").value = favorite;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);