var clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener('click', function (event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    actionHistory.push(recent);
    recent = [];
    actionHistory.push([
        {
            action: "clear"
        }
    ]);
    currentViewIndex = actionHistory.length - 1;
});