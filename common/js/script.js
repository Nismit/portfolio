var elScrollable;
if(navigator.userAgent.indexOf('WebKit') < 0) {
  elScrollable = document.documentElement;
}else {
  elScrollable = document.body;
}

var offsetArray = [];
var scrollTop = elScrollable.scrollTop;

// Skill Level Indicator
function getElem(elem) {
  var elements = document.querySelectorAll(elem);
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

function getElemOffset(elem) {
  for(i = 0; i < elem.length; i++){
    offsetArray[i] = elem[i].getBoundingClientRect();
    //offsetArray[i] = (Math.ceil(offsetArray[i].top) -200);
  }
}

// Menu
var menuTrigger = getElem('.nav--button');

var throttleFunc = (function() {
  var interval = 1000;
  var lastTime = new Date().getTime() - interval
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

window.onscroll = function() {
}