// Transition for the loading screen
let WelcomeScreen = document.getElementById("WelcomeScreen");
WelcomeScreen.style.animation = "opacity";
let FirstTime = false;
//If FirstTime is not in session storage it will run animation
if (!sessionStorage.getItem("FirstTime?")) {
  setTimeout(function () {
    WelcomeScreen.style.opacity = "0"; //Fade out
    setTimeout(() => {
      WelcomeScreen.style.display = "none";
      FirstTime = true;
      sessionStorage.setItem("FirstTime?", FirstTime);
    }, 1000);
  }, 3000);
// loading screen will not appear
} else {
  WelcomeScreen.style.display = "none";
}

//-----------------------------------------
let moreButton = document.getElementById('More-btn')
let moreModal = document.querySelector(".More-Modal")
moreButton.addEventListener("click", function(){
  if (moreModal.classList.contains('show')) {
    moreModal.classList.remove('show');
    moreModal.classList.add('hide');
    setTimeout(() => {
      moreModal.style.display = "none";
    }, 500); 
  } else {
    moreModal.style.display = "flex";
    moreModal.classList.remove('hide');
    moreModal.classList.add('show');
  }
});