var clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener('click', function (event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    actionHistory.push(recent);
    recent = [];
    if (actionHistory.length > 0 && actionHistory[actionHistory.length - 1][0].action !== "clear") {
        console.log(actionHistory[actionHistory.length - 1][0].action);
        actionHistory.push([
            {
                action: "clear"
            }
        ]);
    }
    currentViewIndex = actionHistory.length - 1;
});