const canvas = document.getElementById('myCanvas');
ctx = canvas.getContext("2d");


const drawing = (e) => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strock
}
canvas.addEventListener("mousemove", drawing);