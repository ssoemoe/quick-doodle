var exportBtn = document.getElementById("export-btn");
exportBtn.addEventListener('click', function (event) {
    let imageRadioButtons = document.getElementsByName("format");
    for (let i = 0; i < imageRadioButtons.length; i++) {
        if (imageRadioButtons[i].checked) {
            //download image
            let downloadLink = document.createElement('a');
            downloadLink.download = `quick-doodle.${imageRadioButtons[i].value}`;
            downloadLink.href = canvas.toDataURL(`image/${imageRadioButtons[i].value}`);
            document.body.appendChild(downloadLink);
            downloadLink.click(); //Open the url under the hood
        }
    }
});