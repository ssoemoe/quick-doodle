var canvas = document.querySelector('canvas');
canvas.height = 500;
canvas.width = window.innerWidth;
var context = canvas.getContext('2d');
// set the context styles
context.lineWidth = settings.strokePixels;
context.strokeStyle = settings.strokeColor;
context.lineCap = "round";
var isMousedown = false; // to keep track of correct mouse moves
var recentOffsets = [];
var historyOffsets = [];

// draws the path following the context.beginPath() of a dot
// it moves to itself for another offset
function drawPath(event) {
    if (!isMousedown)
        return;
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    context.moveTo(event.offsetX, event.offsetY);
}

// when the mouse is pressed down for the first time or releases the press, a dot needs to be drawn
function drawDot() {
    context.beginPath(); // beginning of the stroke
    context.moveTo(event.offsetX, event.offsetY);
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke(); // a dot
}

function undo() {

}

canvas.addEventListener('mousedown', function (event) {
    isMousedown = true;
    recentOffsets.push({ x: event.offsetX, y: event.offsetY });
    drawDot();
});
canvas.addEventListener('mouseup', function (event) {
    isMousedown = false;
    recentOffsets.push({ x: event.offsetX, y: event.offsetY });
    historyOffsets.push(recentOffsets); //record offsets for undo feature
    drawDot();
});
canvas.addEventListener('mousemove', drawPath);