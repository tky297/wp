$(function () {
    $('.dragbox').draggable();
    $('#canvas1').droppable({
        drop: function (e, ui) {
            loadImg(ui.draggable.attr("src"));
        }
    });
    $('#canvas2').droppable({
        drop: function (e, ui) {
            setFlatTexture(ui.draggable.attr("src"));
        }
    });
    $('#canvas3').droppable({
        drop: function (e, ui) {
            setSphereTexture(ui.draggable.attr("src"));
        }
    });
});

let sliders = document.getElementsByClassName("slider");

for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("input", function (e) {
        let target = e.target.parentNode.querySelector(".value");
        target.innerText = e.target.value;
        values[e.target.id] = e.target.value;
    });
}

let resetFlag = true;
let checkbox = document.getElementById("reset");
checkbox.addEventListener("change", function () {
    frameCount = 301;
    resetFlag = !resetFlag;
    if (resetFlag == false) {
        imageParticle();
    } else {
        randomParticle();
    }
});

// ドラッグアンドドロップの処理
var dropZones = document.getElementsByClassName("canvas");
for (let i = 0; i < dropZones.length; i++) {
    let dropZone = dropZones[i];
    dropZone.addEventListener('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.style.background = '#f0f8ff';
    }, false);

    dropZone.addEventListener('dragleave', function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.style.background = '#ffffff';
    }, false);

    dropZone.addEventListener('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.style.background = '#ffffff'; //背景色を白に戻す
        var files = e.dataTransfer.files; //ドロップしたファイルを取得
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.includes("image")) {
                var fr = new FileReader();
                fr.readAsDataURL(files[i]);
                fr.onload = function () {
                    let img = document.createElement('img');
                    img.className = "dragbox";
                    img.src = fr.result;
                    let gallery = document.getElementById("gallery");
                    gallery.appendChild(img);
                    $('.dragbox').draggable();
                    let target = e.target.parentNode;
                    if (target.id == "canvas1") {
                        loadImg(img.src);
                    } else if (target.id == "canvas2") {
                        setFlatTexture(img.src);
                    } else if (target.id == "canvas3") {
                        setSphereTexture(img.src);
                    }
                };
            }
        }
    }, false);
}

