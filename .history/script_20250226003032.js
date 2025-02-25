const canvas = document.getElementById('myCanvas');
const toolBtn = document.querySelectorAll(".tool"),
    fillColor = document.getElementById("fill-color"),
    sizeSlider = document.getElementById("size-slider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.getElementById("color-picker"),
    clearCanvas = document.querySelector
    (".clear-canvas"),
    saveBtn = document.querySelector(".save-btn");

ctx = canvas.getContext("2d");

let prevMouseX, prevMouseY, snapshot,
    isDrawing = false,
    selectedTool = "brush",
    selectedColor = "#000",
    brushWidth = 5;

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const drawRect = (e) => {
    if (!fillColor.checked) {
        
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }

    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    const radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2));
    ctx.beginPath();
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    !fillColor.checked ? ctx.stroke() : ctx.fill();
 }

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX - (e.offsetX - prevMouseX), e.offsetY);
    ctx.closePath();
    !fillColor.checked ? ctx.stroke() : ctx.fill();
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (selectedTool === "rectangle") {
        drawRect(e)
    }else if (selectedTool === "circle") {
        drawCircle(e);
        
    }else if (selectedTool ===  "triangle") {
        drawTriangle(e);
    }
}

toolBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool)
    })
});

sizeSlider.addEventListener("change", () => {
    brushWidth = sizeSlider.value; //passing the value of the slider to the brushWidth

});

colorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor =window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.backgroundColor = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}   

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", ()=> isDrawing = false);