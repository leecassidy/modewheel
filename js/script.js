var img = document.querySelector('img');
var mouseStart, mouseMove, rotationValue, restingValueStr, restingValueNum, touchStart, touchMove;

// fn called on mousedown event, rotates the image
function getClientX(e) {
  var imgCenter=[img.x+img.width/2, img.y+img.height/2];
  mouseMove = Math.atan2(e.pageX - imgCenter[0], - (e.pageY - imgCenter[1]) )*(180/Math.PI);
  if (restingValueNum == null) {
    rotationValue = mouseMove -mouseStart;
    img.style.transform = 'rotate('+rotationValue+'deg)';
  }
  else {
    rotationValue = parseInt(restingValueNum) + (mouseMove - mouseStart);
    img.style.transform = 'rotate('+rotationValue+'deg)';
  }
};

img.addEventListener('mousedown',downEvent);
img.addEventListener('mouseup',function(e){
  this.removeEventListener('mousemove',getClientX);
});
img.addEventListener('mouseleave',function(){
  this.removeEventListener('mousemove',getClientX);
});

function downEvent (e){
  e.preventDefault();
  this.addEventListener('mousemove',getClientX);
  var imgCenter=[img.x+img.width/2, img.y+img.height/2];
  mouseStart = Math.atan2(e.pageX - imgCenter[0], - (e.pageY - imgCenter[1]) )*(180/Math.PI);
  restingValueStr = img.style.transform.match(/-?\d+(\.\d{1,9})/g);
  if (restingValueStr == null) {
    return true;
  } else {
    restingValueNum = restingValueStr.join();
  }
}

//TOUCH
img.addEventListener('touchstart', touchDown);

function touchMover(e){
  var imgCenter=[img.x+img.width/2, img.y+img.height/2];
  touchMove = Math.atan2(e.targetTouches[0].pageX - imgCenter[0], - (e.targetTouches[0].pageY - imgCenter[1]) )*(180/Math.PI);


  if (restingValueNum == null) {
    rotationValue = touchMove - touchStart;
    img.style.transform = 'rotate('+rotationValue+'deg)';
  }
  else {
    rotationValue = parseInt(restingValueNum) + (touchMove - touchStart);
    img.style.transform = 'rotate('+rotationValue+'deg)';
  }

}

function touchDown (e){
  e.preventDefault();
  this.addEventListener('touchmove',touchMover);
  var imgCenter=[img.x+img.width/2, img.y+img.height/2];
  touchStart = Math.atan2(e.targetTouches[0].pageX - imgCenter[0], - (e.targetTouches[0].pageY - imgCenter[1]) )*(180/Math.PI);
  restingValueStr = img.style.transform.match(/-?\d+(\.\d{1,9})/g);
  if (restingValueStr == null) {
    return true;
  } else {
    restingValueNum = restingValueStr.join();
  }
}



//HEIGHT STUFF
function height() {
  var h = window.innerHeight;
  img.style.maxHeight = h-200+'px';
  document.getElementById('notes').style.maxHeight = h-200+'px';
}

//FORM STUFF
var modeSelect = document.getElementById('mode-select');
modeSelect.addEventListener('change', changeMode);

function changeMode(){
  var selection = modeSelect.value;
  switch (selection) {
    case 'major':
      img.src = 'img/wheel_modes_'+selection+'.png';
      img.style.transform = 'rotate(0deg)';
      restingValueNum = 0;
      break;
    case 'harmonic_minor':
      img.src = 'img/wheel_modes_'+selection+'.png';
      img.style.transform = 'rotate(0deg)';
      restingValueNum = 0;
      break;
    case 'melodic_minor':
      img.src = 'img/wheel_modes_'+selection+'.png';
      img.style.transform = 'rotate(0deg)';
      restingValueNum = 0;
      break;


  }
}
