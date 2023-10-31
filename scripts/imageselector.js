var index = 0;
var imageList = [img1, img2...];

function changeImageForward() {
  index = index + 1;
  if (index == imageList.length) {
     index = 0;
  }
  var image1 = document.getElementById("productImage");
  image1.src = imageList[index];
}

function changeImageBackward() {
    index = index - 1;
    if (index == 0) {
       index = imageList.length;
    }
    var image1 = document.getElementById("productImage");
    image1.src = imageList[index];
  }