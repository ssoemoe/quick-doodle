var actionHistory = [
    [{ action: "clear" }]
];
var recent = [];
var currentViewIndex = 0;
//default settings
var settings = {
    strokeColor: "black",
    strokePixels: 5
}

// slider event listener
var sample = document.querySelector("#pixels-sample");
var penPixelsSlider = document.querySelector("#pen-pixels");
penPixelsSlider.addEventListener('input', function () {
    let pixels = parseInt(penPixelsSlider.value);
    sample.style.height = `${pixels}px`;
    settings.strokePixels = pixels;
});

//color picker event listener
var colorPicker = document.querySelector("#stroke-color");
colorPicker.addEventListener('input', function () {
    let color = colorPicker.value;
    settings.strokeColor = color;
    sample.style.backgroundColor = color;
});