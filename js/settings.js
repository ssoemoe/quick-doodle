//default settings
var settings = {
    strokeColor: "black",
    strokePixels: 5
}

var penPixelsSlider = document.querySelector("#pen-pixels");
penPixelsSlider.addEventListener('input', function () {
    let pixels = parseInt(penPixelsSlider.value);
    let sample = document.querySelector("#pixels-sample");
    sample.style.height = `${pixels}px`;
});