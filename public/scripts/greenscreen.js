var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;

function loadForegroundImage() {
  var file = document.getElementById("fgfile");
  fgImage = new SimpleImage(file);
  fgCanvas = document.getElementById("fgcan");
  fgImage.drawTo(fgCanvas);
}

function loadBackgroundImage() {
  var file = document.getElementById("bgfile");
  bgImage = new SimpleImage(file);
  bgCanvas = document.getElementById("bgcan");
  bgImage.drawTo(bgCanvas);
}

function crop(image,width,height){
    var n = new SimpleImage(width,height);
    for(var p of image.values()){
   	   var x = p.getX();
   	   var y = p.getY();
  	   if (x < width && y < height){
       var np = n.getPixel(x,y);
       np.setRed(p.getRed());
       np.setBlue(p.getBlue());
       np.setGreen(p.getGreen()); 
       }
    }
    return n;
}

function createComposite() {
	fgImage.setSize(500, 300);
	bgImage.setSize(500, 300);
	
	var cropWidth = fgImage.getWidth();
	if (bgImage.getWidth() < cropWidth) {
		cropWidth = bgImage.getWidth();
	}
	var cropHeight = fgImage.getHeight();
	if (bgImage.getHeight() < cropHeight) {
		cropHeight = bgImage.getHeight();
	}
	fgImage = crop(fgImage,cropWidth, cropHeight);
	bgImage = crop(bgImage,cropWidth, cropHeight);
	
  var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  for (var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > pixel.getRed()+pixel.getBlue()) {
      //pixel is green, use background
      var bgPixel = bgImage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }
    else {
      //pixel is not green, use foreground
      output.setPixel(x,y,pixel);
    }
  }
  return output;
}

function doGreenScreen() {
  //check that images are loaded
  if (fgImage == null  || ! fgImage.complete()) {
    alert("Foreground image not loaded");
  }
  if (bgImage == null || ! bgImage.complete()) {
    alert("Background image not loaded");
  }
  // clear canvases
  clearCanvas();
  var finalImage = createComposite();
  finalImage.drawTo(fgCanvas);
		var sec_can = document.getElementById("bgcan");
		var fir_can = document.getElementById("fgcan");
		if (x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
			y.style.margin = "20%";
	  }
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
  document.getElementById("fgfile").value = "";
  document.getElementById("bgfile").value = "";
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}

function download_image(){
  var canvas = document.getElementById("fgcan");
  image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "edited_image.png";
  link.href = image;
  link.click();
}