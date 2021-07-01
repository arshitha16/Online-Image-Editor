var imageIn;
var image;
var canvas;
var imageorgnl = null;
var grayImage = null;
var redfilter = null;
var blurfilter = null;
var output = null;
var outImage;
var pixel;
var red;
var green;
var blue;
var output;
var avgColor;
var img64;

//loadImage
window.onload = function loadImage() {
  imageIn = document.getElementById("imge");
  image = new SimpleImage(imageIn);
  imageorgnl = new SimpleImage(image);
  canvas = document.getElementById("c1");
  image.drawTo(canvas);
}

//reset
function doReset() {
  outImage = new SimpleImage(image);
  outImage.drawTo(canvas);
  img64 = canvas.toDataURL();
	console.log(img64);
}

//gray
function makeGray() {
  grayImage = new SimpleImage(image);
  for (var pixel of grayImage.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  grayImage.drawTo(canvas);
  img64 = canvas.toDataURL();
  console.log(img64);
}




//Red
function makeRedfilter(){
  redfilter = new SimpleImage(image);
  for (var pixel of redfilter.values()){
    var avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen())/3
    if (avg < 128){
      pixel.setRed(2*avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
    }
    else {
        pixel.setRed(255);
        pixel.setGreen((2*avg)-255);
        pixel.setBlue((2*avg)-255);
    } 
    }
    redfilter.drawTo(canvas);
	img64 = canvas.toDataURL();
	console.log(img64);
}



//check
function checkImageLoad() {
  if ((image === null)) {
    return false;
  } else {
    return true;
  }
}


// Main function for Rainbow
function doRainbow() {
  if (checkImageLoad()) {
    drawRainbow();
    outImage.drawTo(canvas);
	img64 = canvas.toDataURL();
	console.log(img64);
  } else {
    alert("Image Not Loaded");
  }
}
//Draw Rainbow
function drawRainbow() {
  outImage = new SimpleImage(image);
  var rectHeight = outImage.getHeight();
  var rectSegment = parseInt(rectHeight) / 7;
  var Y;
  var X;
  for (pixel of outImage.values()) {
    X = pixel.getX();
    Y = pixel.getY();
//    outImage.setPixel(X, Y, pixel);
    avgColor = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (Y >= 6 * parseInt(rectSegment)) {
      doRed();
    } else if (Y >= (5 * parseInt(rectSegment))) {
      doOrange();
    } else if (Y >= (4 * parseInt(rectSegment))) {
      doYellow();
    } else if (Y >= (3 * parseInt(rectSegment))) {
      doGreen();
    } else if (Y >= (2 * parseInt(rectSegment))) {
      doBlue();
    } else if (Y >= parseInt(rectSegment)) {
      doIndigo();
    } else {
      doViolet();
    }
  }
}

function doViolet() {
  if (avgColor < 128) {
    red = Math.round(1.6 * avgColor);
    green = 0;
    blue = Math.round(1.6 * avgColor);
  } else {
    red = Math.round(0.4 * avgColor + 153 );
    green = Math.round(2 * avgColor - 255);
    blue = Math.round(0.4 * avgColor + 153 );
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doIndigo() {
  if (avgColor < 128) {
    red = Math.round(.8 * avgColor);
    green = 0;
    blue = Math.round(2 * avgColor);
  } else {
    red = Math.round(1.2 * avgColor - 51);
    green = Math.round(2*avgColor - 255);
    blue = 255;
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doBlue() {
 if (avgColor < 128) {
    red = 0;
    green = 0;
    blue = Math.round(2*avgColor);
  } else {
    red = Math.round(2*avgColor-255);
    green =Math.round(2*avgColor-255);
    blue = 255;
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}
function doGreen() {
  if (avgColor < 128) {
    red = 0;
    green = Math.round(2*avgColor);
    blue = 0;
  } else {
    red = Math.round(2*avgColor-255);
    green = 255;
    blue = Math.round(2*avgColor-255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doYellow() {
  if (avgColor < 128) {
    red = Math.round(2 * avgColor);
    green = Math.round(2 * avgColor);
    blue = 0;
  } else {
    red = 255;
    green = 255;
    blue = Math.round(2 * avgColor - 255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doOrange() {
   if (avgColor < 128) {
    red = Math.round(2 * avgColor);
    green = Math.round(.8 * avgColor);
    blue = 0;
  } else {
    red = 255;
    green = Math.round(1.2 * avgColor - 51);
    blue =  Math.round(2 * avgColor - 255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doRed() {
  if (avgColor < 128) {
    red = Math.round(2*avgColor);
    green = 0;
    blue = 0;
  } else {
    red = 255;
    green = Math.round(2*avgColor-255);
    blue = Math.round(2*avgColor-255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}


//Blur 
function ensureInImage (coordinate, size) {
    if (coordinate < 0) {
        return 0;
    }
    if (coordinate >= size) {
        return size - 1;
    }
    return coordinate;
}

function getPixelNearby (image, x, y, diameter) {
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, image.getWidth());
    var ny = ensureInImage(y + dy, image.getHeight());
    return image.getPixel(nx, ny);
}

function BlurImage()
{
    blurfilter = new SimpleImage(image);
    // output = new SimpleImage(image.getWidth(), image.getHeight());

    for (var pixel of image.values()) 
    {
        var x = pixel.getX();
        var y = pixel.getY();
        if (Math.random() > 0) 
        {
            var other = getPixelNearby(image, x, y, 15);
            blurfilter.setPixel(x, y, other);
        }
        else 
        {
            blurfilter.setPixel(x, y, pixel);
        }
    }
    blurfilter.drawTo(canvas);
	img64 = canvas.toDataURL();
	console.log(img64);
}
function download_image(){
  var canvas = document.getElementById("c1");
  image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "edited_image.png";
  link.href = image;
  link.click();
}
