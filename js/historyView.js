var undoBtn = document.querySelector("#undo-btn");
undoBtn.addEventListener('click', function (event) {
    if (currentViewIndex >= 0) {
        console.log("Undo", currentViewIndex);
        processCanvas(currentViewIndex, true);
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < currentViewIndex; i++) {
            processCanvas(i, false); // re-creates every past action before this undone current action
        }
        if (currentViewIndex - 1 >= 0)
            currentViewIndex--;
    }
});

var redoBtn = document.querySelector("#redo-btn");
redoBtn.addEventListener('click', function (event) {
    if (currentViewIndex < actionHistory.length - 1) {
        currentViewIndex++;
        console.log("Forward", currentViewIndex);
        processCanvas(currentViewIndex, false);
    }
});

function processCanvas(index, isUndo) {
    let actions = actionHistory[index];
    for (let currentAction of actions) {
        if (currentAction.action == "clear") {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        else {
            let settingsHistory = { ...currentAction.currentSettings };
            if (isUndo) {
                settingsHistory.strokeColor = "white";
                settingsHistory.strokePixels++;
            }
            if (currentAction.action == "drawDot") {
                context.lineWidth = settingsHistory.strokePixels;
                context.strokeStyle = settingsHistory.strokeColor;
                drawDot(currentAction.x, currentAction.y);
            }
            else if (currentAction.action == "drawPath") {
                context.lineWidth = settingsHistory.strokePixels;
                context.strokeStyle = settingsHistory.strokeColor;
                drawPath(currentAction.x, currentAction.y);
            }
        }

    }
}