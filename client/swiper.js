// var el = document.getElementsByClassName("wrapper")[0];
// var div = document.getElementsByClassName("two");
// var div1 = document.getElementsByClassName("two")[0];
// var div2 = document.getElementsByClassName("two")[div.length - 1];
////////////////SWIPER MOBILE////////////
/////////////////////////////////////////
// function swipeConstructorM(el, div) {
//   this.el = document.getElementsByClassName(el)[0];
//   this.div = document.getElementsByClassName(div);
//   this.start = 0;
//   this.moveEnd = 5;
//   this.moveStart = 1;
//   this.mover = 0;
//   this.swipeIndex = 0;
//   this.swipeIndexEnd = this.div.length;
// }

// let newSwipe = new swipeConstructorM("wrapper", "two");
// let {moveStart, start, moveEnd, mover, swipeIndex, swipeIndexEnd} = newSwipe;

// function mobileSwiper(e) {
//   moveStart += 1;

//   if (moveStart === moveEnd) {
//     movedXend = Math.floor(e.touches[0].clientX);
//     mover = (movedXstart - movedXend) * 10;

//     if (mover === 0) {
//       return;
//     }
//     if (0 > mover) {
//       swipeIndex -= 1;
//       if (swipeIndex === -1) {
//         swipeIndex = 0;
//         return;
//       }
//     }

//     if (0 < mover) {
//       swipeIndex += 1;
//       if (swipeIndex === swipeIndexEnd) {
//         swipeIndex = swipeIndexEnd - 1;
//         return;
//       }
//     }
//     mover =
//       0 < mover ? (mover = -div[0].offsetWidth) : (mover = div[0].offsetWidth);
//     el.style.transform = `translate(${(start += mover)}px)`;
//   }
// }
// function swipeStart(e) {
//   movedXstart = Math.floor(e.touches[0].clientX);
//   window.addEventListener("touchmove", mobileSwiper);
// }
// function swipeFinish() {
//   mover = 0;
//   moveStart = 1;
//   movedXstart = 0;
//   movedXend = 0;
//   window.removeEventListener("touchstart", mobileSwiper);
//   window.removeEventListener("touchmove", swipeStart);
// }
// window.addEventListener("touchstart", swipeStart, {passive: true});
// window.addEventListener("touchend", swipeFinish);
//window.removeEventListener("touchend", swipeFinish);
/////////////////////////////////////
///////////////DESKTOP NEW///////////
/////////////////////////////////////
// function swipeConstructorD(el, div) {
//   this.el = document.getElementsByClassName(el)[0];
//   this.div = document.getElementsByClassName(div);
//   this.start = 0;
//   this.moveEnd = 5;
//   this.moveStart = 1;
//   this.mover = 0;
//   this.swipeIndex = 0;
//   this.swipeIndexEnd = this.div.length;
// }

// let newSwipe = new swipeConstructorD("wrapper", "two");
// let {moveStart, start, moveEnd, mover, swipeIndex, swipeIndexEnd} = newSwipe;
// function desktopSwiper(e) {
//   moveStart += 1;

//   if (moveStart === moveEnd) {
//     mover = e.movementX * 100;

//     if (mover === 0) {
//       return;
//     }
//     if (0 > mover) {
//       swipeIndex -= 1;
//       if (swipeIndex === -1) {
//         swipeIndex = 0;
//         return;
//       }
//     }

//     if (0 < mover) {
//       swipeIndex += 1;
//       if (swipeIndex === swipeIndexEnd) {
//         swipeIndex = swipeIndexEnd - 1;
//         return;
//       }
//     }
//     mover =
//       0 < mover ? (mover = -div[0].offsetWidth) : (mover = div[0].offsetWidth);
//     el.style.transform = `translate(${(start += mover)}px)`;
//   }
// }

// function swipeStartD(e) {
//   if (
//     e.target.getAttribute("class") === "two" ||
//     e.target.getAttribute("class") === "wrapper"
//   ) {
//     window.addEventListener("mousemove", desktopSwiper);
//   }
// }
// function swipeFinishD() {
//   mover = 0;
//   moveEnd = 5;
//   moveStart = 1;
//   console.log("finish");
//   window.removeEventListener("mousemove", desktopSwiper);
// }
// window.addEventListener("mousedown", swipeStartD); //1
// window.addEventListener("mouseup", swipeFinishD);