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

// ----------ResumeView-------------
let screenWidth = window.innerWidth
let ResumeBTN = document.getElementById("ResumeBTN")
if (screenWidth < 768){
  ResumeBTN.style.display="block"
}