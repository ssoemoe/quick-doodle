var canvas = document.querySelector('canvas');
canvas.height = 500;
canvas.width = window.innerWidth;
var context = canvas.getContext('2d');
context.lineCap = "round";
var canDoodle = false; // to keep track of correct mouse moves

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
    canDoodle = true;
    actionHistory = actionHistory.splice(0, currentViewIndex + 1);
    drawDot(event.offsetX, event.offsetY);
    recent.push({ action: "drawDot", x: event.offsetX, y: event.offsetY, currentSettings: { ...settings } });
}

var touchesInAction = {};
function startTouchDrawing(event) {
    var touches = event.changedTouches;

    for (var j = 0; j < touches.length; j++) {

        /* store touch info on touchstart */
        touchesInAction["$" + touches[j].identifier] = {

            identifier: touches[j].identifier,
            pageX: touches[j].pageX,
            pageY: touches[j].pageY
        };
        console.log(touches[j].pageX, touches[j].pageY);
    }
}

function endDrawing(event) {
    canDoodle = false;
    drawDot(event.offsetX, event.offsetY);
    recent.push({ action: "drawDot", x: event.offsetX, y: event.offsetY, currentSettings: { ...settings } });
    actionHistory.push(recent);
    recent = []; //reset recent actions array
    currentViewIndex = actionHistory.length - 1;
}

function drawing(event) {
    if (!canDoodle)
        return;
    drawPath(event.offsetX, event.offsetY);
    recent.push({ action: "drawPath", x: event.offsetX, y: event.offsetY, currentSettings: { ...settings } });
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('touchstart', function (event) {
    // stop touch event
    event.stopPropagation();
    event.preventDefault();

    // translate to mouse event
    var clickEvent = document.createEvent('MouseEvent');
    clickEvent.initMouseEvent('mousedown', true, true, window, event.detail,
        event.touches[0].screenX, event.touches[0].screenY,
        event.touches[0].clientX, event.touches[0].clientY,
        false, false, false, false,
        0, null);
    canvas.dispatchEvent(clickEvent);
    startDrawing(event);
});
canvas.addEventListener('touchmove', function (event) {
    // stop touch event
    event.stopPropagation();
    event.preventDefault();

    // translate to mouse event
    var clickEvent = document.createEvent('MouseEvent');
    clickEvent.initMouseEvent('mousemove', true, true, window, event.detail,
        event.touches[0].screenX, event.touches[0].screenY,
        event.touches[0].clientX, event.touches[0].clientY,
        false, false, false, false,
        0, null);
    canvas.dispatchEvent(clickEvent);
    drawing(event);
});
canvas.addEventListener('touchend', function (event) {
    // stop touch event
    event.stopPropagation();
    event.preventDefault();

    // translate to mouse event
    var clickEvent = document.createEvent('MouseEvent');
    clickEvent.initMouseEvent('mouseup');
    canvas.dispatchEvent(clickEvent);
    endDrawing(event);
});