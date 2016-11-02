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

styleSkillLevel(getElem('.level__progress--percent'));

function getElemOffset(elem) {
  for(i = 0; i < elem.length; i++){
    offsetArray[i] = elem[i].getBoundingClientRect();
    //offsetArray[i] = (Math.ceil(offsetArray[i].top) -200);
  }
}

getElemOffset(getElem('.is-animation'));
var animation = getElem('.is-animation');
var heroParallax = getElem('.hero__parallax');
var leveParallax = getElem('.level__parallax');
var diffPos = 0;

//for(i=0;i < offsetArray.length; i++){
  //console.log(offsetArray[i]);
//}

window.onscroll = function() {
scrollTop = elScrollable.scrollTop;
  for(i = 0; i < offsetArray.length; i++) {
    if((offsetArray[i].top - 570) <= scrollTop) {
      //console.log("hit",offsetArray[i]);
      if(animation[i].classList !== "fadeInUp") {
        animation[i].classList.add("fadeInUp");
      }
    }
  }
/*var currentPos = scrollTop;
if(currentPos > diffPos) {
  //console.log("+++", currentPos);
  heroParallax[0].style.transform = 'translate(0,'+ (currentPos - diffPos) +'px)';
}else{
  console.log("---", currentPos);
  heroParallax[0].style.transform = 'translate(0,'+ (currentPos + diffPos) +'px)';
}
diffPos = currentPos;*/
}