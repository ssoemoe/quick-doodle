/* This modal javascript code is taken from https://www.w3schools.com/howto/howto_css_modals.asp */

// Get the modal
var modal = document.getElementById("options-modal");
var imageModal = document.getElementById("image-format-modal");

// Get the button that opens the modal
var btn = document.getElementById("options-btn");
var saveBtn = document.getElementById("save-btn");

// Get the <span> element that closes the modal
var modalSpan = document.getElementsByClassName("close")[0];
var imageSpan = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}
saveBtn.onclick = function () {
    imageModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
modalSpan.onclick = function () {
    modal.style.display = "none";
}
imageSpan.onclick = function () {
    imageModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == imageModal) {
        imageModal.style.display = "none";
    }
}