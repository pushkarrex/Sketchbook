


         var canvas,ctx;
 
    var mouseX,mouseY,mouseDown=0;


    var touchX,touchY;

    var lastX,lastY=-1;

    function drawLine(ctx,x,y,size) {

        if (lastX==-1) {
            lastX=x;
	    lastY=y;
        }

        r=0; g=0; b=0; a=255;


        ctx.strokeStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";


        ctx.lineCap = "round";

        ctx.beginPath();


	ctx.moveTo(lastX,lastY);

	ctx.lineTo(x,y);


        ctx.lineWidth = size;
        ctx.stroke();

        ctx.closePath();

	
	lastX=x;
	lastY=y;
    } 

    
    function clearCanvas(canvas,ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    function sketchpad_mouseDown() {
        mouseDown=1;
        drawLine(ctx,mouseX,mouseY,12);
    }


    function sketchpad_mouseUp() {
        mouseDown=0;

        
        lastX=-1;
        lastY=-1;
    }

    
    function sketchpad_mouseMove(e) { 

        getMousePos(e);

        if (mouseDown==1) {
            drawLine(ctx,mouseX,mouseY,12);
        }
    }

    function getMousePos(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
     }


    function sketchpad_touchStart() {

        getTouchPos();

        drawLine(ctx,touchX,touchY,12);


        event.preventDefault();
    }

    function sketchpad_touchEnd() {
        lastX=-1;
        lastY=-1;
    }

    function sketchpad_touchMove(e) { 
        getTouchPos(e);

        drawLine(ctx,touchX,touchY,12); 

        event.preventDefault();
    }

    function getTouchPos(e) {
        if (!e)
            var e = event;

        if(e.touches) {
            if (e.touches.length == 1) { 
                var touch = e.touches[0]; 
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
            }
        }
    }


    function init() {
        canvas = document.getElementById('sketchpad');

        if (canvas.getContext)
            ctx = canvas.getContext('2d');
          canvas.style.width ='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

        if (ctx) {
            canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
            canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
            window.addEventListener('mouseup', sketchpad_mouseUp, false);

            canvas.addEventListener('touchstart', sketchpad_touchStart, false);
            canvas.addEventListener('touchend', sketchpad_touchEnd, false);
            canvas.addEventListener('touchmove', sketchpad_touchMove, false);
        }
    }