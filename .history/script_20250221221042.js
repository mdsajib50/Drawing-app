const canvas = document.getElementById('myCanvas');
ctx = canvas.getContext("2d");

let isDrawing = false;

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const drawing = (e) => {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

canvas.addEventListener("mousedown", startD)
canvas.addEventListener("mousemove", drawing);