const canvas = document.getElementById('myCanvas');
ctx = canvas.getContext("2d");


const drawing = (e) => {
    ctx.lineTo(e.offsetX,)
}
canvas.addEventListener("mousemove", drawing);