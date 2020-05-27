function drawTime(size, color) {
    
    createCanvas();
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    canvasResize();
    

    canvas.addEventListener('mousedown', start); 
    canvas.addEventListener('mousemove', draw); 
    canvas.addEventListener('mouseup', stop); 
    window.addEventListener('resize', canvasResize);

    let isDrawing = false;
    let buttonHeld = null;
    
    
    function start({button: b}) {
        buttonHeld = b;
        isDrawing = true;
        ctx.strokeStyle = color || "black";
        ctx.lineWidth = size || 5;
        ctx.beginPath();
    }
    
    function draw({offsetX: x, offsetY: y}) {
        if (isDrawing && buttonHeld == 0){
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
    
    function stop() {
        ctx.closePath();
        isDrawing = false;
    }

    function createCanvas(){
        if (!document.body.contains(document.querySelector('canvas'))){
            let canv = document.createElement('canvas');
            canv.style.position = 'absolute';
            canv.style.top = '0px';
            document.querySelector('body').appendChild(canv);
        }
    }
    
    function canvasResize() {
        // console.log('resized the 🖼️');
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
    }

}

/**
 * simple and ugly reset
 */
function clearIt(){
    const canvas = document.querySelector('canvas');
    canvas.remove();
}


/**
 * listener for popup.html clicks
 */
browser.runtime.onMessage.addListener((message) => {
    // console.log("👂 content.js is hearing a " + message.msg);
    switch (message.msg) {
        case "pencil":
            drawTime(2, "black");
            break;
        case "paintbrush":
            drawTime(8, "red");
            break;
        case "crayon":
            drawTime(4, "purple");
            break;
        case "eraser":
            clearIt();
            break;
        default:
            break;
    }
});



