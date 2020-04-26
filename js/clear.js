var clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener('click', function (event) {
    canvas.clearRect(0, 0, canvas.width, canvas.height);
});