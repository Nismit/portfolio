var elImages = document.querySelectorAll('img[data-src]');
var loader = getElem('.loader');
var hero = getElem('.hero__inner');
var anim = getElem('.slideUp, .slideSide');
var offsetArray = [];
var setFunc = null;
var elScrollable;

// Count loaded images
var numOfLoaded = 0;
var numOfImages = elImages.length;
function onLoad(event) {
  numOfLoaded++;
  if (numOfLoaded >= numOfImages) {
    console.log('Done.');
    loader[0].classList.add('js-hidden');
    setTimeout(hero[0].classList.add('js'), 2500);
  }
}

// start loading
for (var i = 0; i < numOfImages; i++ ) {
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

function styleSkillLevel(elem) {
  for(var i = 0; i < elem.length; i++){
    elem[i].style.width = elem[i].dataset.skillLevel+'%';
  }
}

styleSkillLevel(getElem('.skill__progress--percent'));

// Menu
var menuTrigger = getElem('.nav--button');

var throttleFunc = (function() {
  var interval = 1000;
  var lastTime = new Date().getTime() - interval;
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

function getElemOffset(elem) {
  for(i = 0; i < elem.length; i++){
    offsetArray[i] = elem[i].getBoundingClientRect();
    //console.log(offsetArray[i]);
  }
}

getElemOffset(getElem('.slideUp, .slideSide'));

if(navigator.userAgent.indexOf('WebKit') < 0) {
  elScrollable = document.documentElement;
}else {
  elScrollable = document.body;
}
var scrollTop = elScrollable.scrollTop;

window.addEventListener('scroll', function() {
  if(setFunc) {
    return false;
  }

  setFunc = setTimeout(function() {
    scrollTop = elScrollable.scrollTop;
    //console.log("scroll",scrollTop);
    /*for(i = 0; i < offsetArray.length; i++) {
      if((offsetArray[i].top - 570) <= scrollTop) {
          animation[i].classList.add('js');
        }
      }
    }*/
    setFunc = null;
  }, 250);
});
