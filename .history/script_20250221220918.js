const canvas = document.getElementById('myCanvas');
ctx = canvas.getContext("2d");

let isDrawing = false;

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const drawing = (e) => {
    if
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}
canvas.addEventListener("mousemove", drawing);