//Text_in_Image

var imgdatauri;
var timgdatauri;
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      document.querySelector("#image1").src = e.target.result;
      imgdatauri = e.target.result;
    };
  }
  reader.readAsDataURL(input.files[0]);
}

function prepHref(linkElement) { 
    var myDiv = document.getElementById('encodedimg'); 
    var myImage = myDiv.children[1]; 
    linkElement.href = myImage.src; 
} 

function hideText() {
  document.querySelector("#image2").src = steg.encode(document.querySelector('#text').value, imgdatauri);
}

// Text Decoding
function treadURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      document.querySelector("#image3").src = e.target.result;
      timgdatauri = e.target.result;
    };
  }
  reader.readAsDataURL(input.files[0]);
}

function decode() {
   document.querySelector('#decoded').innerText = steg.decode(timgdatauri);
}

//Image_in_Image
var fgImage = null;
var bgImage = null;
var cImage = null;
var start;
var startc;
var starts;
var hide;
var hidec;
var hides;
var fgCanvas;
var bgCanvas;
var cCanvas;
var hCanvas;
var combinedimage;

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


function pixchange(pixval){
    var x = Math.floor(pixval/4) * 4;
    return x;
}

function chop2hide(image){
    for(var px of image.values()){
        px.setRed(pixchange(px.getRed()));
        px.setGreen(pixchange(px.getGreen()));
        px.setBlue(pixchange(px.getBlue()));
    }
    return image;
}

function shift(im){
  var nim = new SimpleImage(im.getWidth(), 
                            im.getHeight());
  for(var px of im.values()){
    var x = px.getX();
    var y = px.getY();
    var npx = nim.getPixel(x,y);
    npx.setRed(Math.floor(px.getRed()/64));
    npx.setGreen(Math.floor(px.getGreen()/64));
    npx.setBlue(Math.floor(px.getBlue()/64));
  }
  return nim;
}


function newpv(va,vb){
    var answer = va + vb;
    if (va + vb>255) print("error:RGB value cannot be greater than 255"); 
    return answer;
}

function combine(a,b){
    var n = new SimpleImage (a.getWidth(),a.getHeight());
    for (var pa of a.values()){
        var x = pa.getX();
        var y = pa.getY();
        var pb = b.getPixel (x,y);
        var np = n.getPixel (x,y);
        np.setRed(newpv(pa.getRed(),pb.getRed()));
        np.setGreen(newpv(pa.getGreen(),pb.getGreen()));
        np.setBlue(newpv(pa.getBlue(),pb.getBlue()));
    }
    return n;
}

function HidenCombine()
{
	start = new SimpleImage(fgImage);
	start.setSize(500, 300);
	hide = new SimpleImage(bgImage);
	hide.setSize(500, 300);
	
	var cropWidth = start.getWidth();
	if (hide.getWidth() < cropWidth) {
		cropWidth = hide.getWidth();
	}
	var cropHeight = start.getHeight();
	if (hide.getHeight() < cropHeight) {
		cropHeight = hide.getHeight();
	}
	
	startc = crop(start,cropWidth, cropHeight);
	hidec = crop(hide,cropWidth, cropHeight);
	
	starts = chop2hide(startc);
	hides = shift(hidec);
	
	combinedimage = combine(starts,hides);
	cCanvas = document.getElementById("ccan");
	combinedimage.drawTo(cCanvas);
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
  doClear(cCanvas);
  document.getElementById("fgfile").value = "";
  document.getElementById("bgfile").value = "";
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}

function download_image(){
  var canvas = document.getElementById("ccan");
  image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "steg_image.png";
  link.href = image;
  link.click();
  clearCanvas();
}
