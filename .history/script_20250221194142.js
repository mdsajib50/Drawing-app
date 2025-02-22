const canvas = document.getElementById('myCanvas');
ctx = canvas.getContext("2d");

window.addEventListener("")

const drawing = (e) => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}
canvas.addEventListener("mousemove", drawing);