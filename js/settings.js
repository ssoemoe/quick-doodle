//default settings
var settings = {
    strokeColor: "black",
    strokePixels: 5
}

// slider event listener
var penPixelsSlider = document.querySelector("#pen-pixels");
penPixelsSlider.addEventListener('input', function () {
    let pixels = parseInt(penPixelsSlider.value);
    let sample = document.querySelector("#pixels-sample");
    sample.style.height = `${pixels}px`;
    settings.strokePixels = pixels;
});

//color picker event listener
var colorPicker = document.querySelector("#stroke-color");
colorPicker.addEventListener('input', function () {
    let color = colorPicker.value;
    settings.strokeColor = color;
});