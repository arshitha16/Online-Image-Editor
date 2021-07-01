var comImage = null;
var hidImage = null;
var hCanvas;
var hide;
function loadComImage() {
  var file = document.getElementById("hfile");
  comImage = new SimpleImage(file);
  hCanvas = document.getElementById("hcan");
  comImage.drawTo(hCanvas);
}
function pchange(n){
    var value = (n-Math.floor(n/4)*4)*64;
    return value;
}

function extract(i){
    for(var ip of i.values()){
        ip.setRed(pchange(ip.getRed()));
        ip.setGreen(pchange(ip.getGreen()));
        ip.setBlue(pchange(ip.getBlue()));
    }
    return i;
}
function Hide(){
	hide = new SimpleImage(comImage);
	hidImage = extract(hide);
	hCanvas = document.getElementById("hcan");
	hidImage.drawTo(hCanvas);
}
