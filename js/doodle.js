var canvas = document.querySelector('canvas');
canvas.height = 500;
canvas.width = window.innerWidth;
var context = canvas.getContext('2d');
context.lineCap = "round";
var isMousedown = false; // to keep track of correct mouse moves

// draws the path following the context.beginPath() of a dot
// it moves to itself for another offset
function drawPath(x, y) {
    context.lineTo(x, y);
    context.stroke();
    context.moveTo(x, y);
}

// when the mouse is pressed down for the first time or releases the press, a dot needs to be drawn
function drawDot(x, y) {
    context.beginPath(); // beginning of the stroke
    context.moveTo(x, y);
    context.lineTo(x, y);
    context.stroke(); // a dot
}

function startDrawing(event) {
    // set the context styles
    context.lineWidth = settings.strokePixels;
    context.strokeStyle = settings.strokeColor;
    isMousedown = true;
    actionHistory = actionHistory.splice(0, currentViewIndex + 1);
    drawDot(event.offsetX, event.offsetY);
    recent.push({ action: "drawDot", x: event.offsetX, y: event.offsetY, currentSettings: { ...settings } });
}

function endDrawing(event) {
    isMousedown = false;
    drawDot(event.offsetX, event.offsetY);
    recent.push({ action: "drawDot", x: event.offsetX, y: event.offsetY, currentSettings: { ...settings } });
    actionHistory.push(recent);
    recent = []; //reset recent actions array
    currentViewIndex = actionHistory.length - 1;
}

function drawing(event) {
    if (!isMousedown)
        return;
    drawPath(event.offsetX, event.offsetY);
    recent.push({ action: "drawPath", x: event.offsetX, y: event.offsetY, currentSettings: { ...settings } });
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('touchend', endDrawing);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('touchmove', drawing);