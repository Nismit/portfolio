var elImages = getElem('img[data-src]');

// Count loaded images
var numOfLoaded = 0;
var numOfImages = elImages.length;
function onLoad(event) {
  numOfLoaded++;
  if (numOfLoaded >= numOfImages) {
    //console.log('Done.');
    var loader = getElem('.loader');
    loader[0].classList.add('js-hidden');
    //var hero = getElem('.hero__intro');
    //setTimeout(hero[0].classList.add('js'), 2500);
  }
}

// start loading
for (var i = 0; i < numOfImages; i++) {
  var elImage = elImages[i];
  elImage.addEventListener('load', onLoad);
  if(elImage.getAttribute('data-srcset') != null) {
    elImage.srcset = elImage.getAttribute('data-srcset');
  }
  elImage.src = elImage.getAttribute('data-src');
}

function getElem(elem) {
  var elements = document.querySelectorAll(elem);
  if(elements.length === 0)
    return false;
  else
    return elements;
}

