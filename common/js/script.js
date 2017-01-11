const elImages = document.querySelectorAll('img[data-srcset]');

// Count loaded images
let numOfLoaded = 0;
const numOfImages = elImages.length;
function onLoad(event) {
  numOfLoaded++;
  if (numOfLoaded >= numOfImages) {
    console.log('Done.');
  }
}

// start loading
for (let i = 0; i < numOfImages; i++ ) {
  const elImage = elImages[i];
  elImage.addEventListener('load', onLoad);
  elImage.srcset = elImage.getAttribute('data-srcset');
  elImage.src = elImage.getAttribute('data-src');
}


function getElem(elem) {
  const elements = document.querySelectorAll(elem);
  if(elements.length === 0)
    return false;
  else
    return elements;
}

function styleSkillLevel(elem) {
  for(i = 0; i < elem.length; i++){
    //console.log(elem[i]);
    elem[i].style.width = elem[i].dataset.skillLevel+'%';
  }
}

styleSkillLevel(getElem('.skill__progress--percent'));

// Menu
const menuTrigger = getElem('.nav--button');

const throttleFunc = (function() {
  const interval = 1000;
  let lastTime = new Date().getTime() - interval;
  return function() {
    if ((lastTime + interval) <= new Date().getTime()) {
      lastTime = new Date().getTime();
      if(menuTrigger[0].classList.contains('close')) {
        menuTrigger[0].classList.remove('close');
      }else{
        menuTrigger[0].classList.add('close');
      }
    }
  };
})();

menuTrigger[0].addEventListener('click', throttleFunc, false);
