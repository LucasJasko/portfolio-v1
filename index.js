// Paramétrage des beams du background
// const beamMaker = () => {
//   const beam = document.createElement("span");
//   beam.classList.add("beam");
//   document.getElementById("beam-display").appendChild(beam);

//   beam.style.setProperty("--beamt", Math.random() * 100 + "%");
//   beam.style.setProperty("--beaml", Math.random() * 100 + "%");

//   setTimeout(() => {
//     beam.remove();
//   }, 6000);
// };
// setInterval(beamMaker, 3000);

// Lettrage coloré du titre
let letters = document.querySelector(".txt").textContent;
const letterArray = letters.split("");
document.querySelector(".txt").textContent = "";
letterArray.forEach((element, i) => {
  span = "<span>" + element + "</span>";
  document.querySelector(".txt").innerHTML += span;
});

// Configuration du point rouge de localisation et du fix de la timeline
const blacklineArea = document.querySelector(".blackline-area");
const timeline = document.getElementById("timeline-area");
let ScrollTrigger = true;
window.addEventListener("scroll", () => {
  scrollTop = window.scrollY / document.body.offsetHeight;
  scrollLvl = (window.scrollY + window.innerHeight) / document.body.offsetHeight;

  if (timeline.getBoundingClientRect().top <= 0) {
    blacklineArea.style.position = "fixed";
    blacklineArea.style.width = "255px";
    blacklineArea.style.top = "0";
    if (ScrollTrigger) {
      ScrollTrigger = false;
      const PositionDot = document.createElement("span");
      PositionDot.classList.add("position-dot");
      blacklineArea.appendChild(PositionDot);
    }
  }
  const PositionDot = document.querySelector(".position-dot");
  if (PositionDot) {
    PositionDot.style.top = (window.scrollY / timeline.clientHeight - 0.25) * 100 + "%";
  }
  if (timeline.getBoundingClientRect().top > 0) {
    blacklineArea.style.position = "static";
    blacklineArea.style.width = "100%";
    ScrollTrigger = true;
    const PositionDot = document.querySelector(".position-dot");
    if (PositionDot) {
      PositionDot.remove();
    }
  }
  if (timeline.getBoundingClientRect().bottom <= window.innerHeight) {
    blacklineArea.style.position = "absolute";
    blacklineArea.style.width = "255px";
    blacklineArea.style.top = "auto";
    blacklineArea.style.bottom = "0";
  }
});

// comportements de la navbar
const navBar = document.querySelector("nav");
const navItems = navBar.querySelectorAll("nav ul li a");
const navBgs = navBar.querySelectorAll(".bg-hover");
const burgerButton = document.querySelector(".burger-button");

lastPos = 0;

window.addEventListener("scroll", () => {
  if (window.innerWidth > 730) {
    if (lastPos < window.scrollY) {
      navBar.style.transform = "translateY(-100%)";
    } else {
      navBar.style.transform = "translateY(0px)";
    }
  }
  lastPos = window.scrollY;
});
burgerButton.addEventListener("click", () => {
  if (window.innerWidth <= 730) {
    if (navBar.style.transform == "translateX(-100%)") {
      navBar.style.transform = "translateX(0px)";
    } else {
      navBar.style.transform = "translateX(-100%)";
    }
  }
});
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (window.innerWidth <= 730 && navBar.style.transform == "translateX(0px)") {
      console.log("hello");
      navBar.style.transform = "translateX(-100%)";
    }
  });
});

// Navigation dans la zone strengths
const titles = document.querySelectorAll(".strengths-headband h4");
let activeTitle = titles[0];
activeTitle.classList.add("strengths-headband-active");

PrevText = document.getElementById("strength-1");
titles.forEach((title, i) => {
  title.addEventListener("click", () => {
    activeTitle.classList.remove("strengths-headband-active");

    activeTitle = titles[i];
    activeTitle.classList.add("strengths-headband-active");

    PrevText.style.display = "none";
    text = String("strength-" + (i + 1));
    textStrength = document.getElementById(text);
    textStrength.style.display = "block";
    PrevText = textStrength;
  });
});

// Reveal des coordonnées
const textArea = document.querySelectorAll(".text-area");
const cordP = document.querySelectorAll(".text-area p");

textArea.forEach((p, i) => {
  p.addEventListener("click", () => {
    textArea[i].style.color = "#f5f5f5";
    textArea[i].style.background = "rgb(17, 17, 17)";
    if (i == 0) {
      cordP[i].textContent = "06.07.90.04.55";
    }
    if (i == 1) {
      cordP[i].textContent = "lucasjaskowiak@yahoo.fr";
    }
  });
});

// Complétion du formulaire
const contactCont = document.querySelector("form");

const nameInp = document.getElementById("name");
const emailInp = document.getElementById("email");
const telInp = document.getElementById("telephone");
const radioInp = document.querySelectorAll(".form-part-2-container input");
const textInp = document.getElementById("description");
const submInp = document.getElementById("submit");
let username;
let email;
let telephone;
let choice;
let message;

nameInp.addEventListener("input", () => {
  username = nameInp.value;
  contactCont.style.border = "1px solid white";
});
emailInp.addEventListener("input", () => {
  email = emailInp.value;
  contactCont.style.border = "1px solid white";
});
telInp.addEventListener("input", () => {
  telephone = telInp.value;
  contactCont.style.border = "1px solid white";
});
radioInp.forEach((radio, x) => {
  radio.addEventListener("input", () => {
    if (x == 0) {
      contactCont.style.border = "1px solid white";
      choice = "school";
    } else if (x == 1) {
      contactCont.style.border = "1px solid white";
      choice = "recruiter";
    } else if (x == 2) {
      contactCont.style.border = "1px solid white";
      choice = "particular";
    }
  });
});
textInp.addEventListener("input", () => {
  contactCont.style.border = "1px solid white";
  message = textInp.value;
});
submInp.addEventListener("click", (e) => {
  e.preventDefault();
  if (!username || !email || !telephone || !choice || !message) {
    contactCont.classList.add("notvalid");
    setTimeout(() => {
      contactCont.classList.remove("notvalid");
    }, 2000);
  } else if (username && email && telephone && choice && message) {
    contactCont.classList.add("valid");
    const data = {
      username,
      email,
      telephone,
      choice,
      message,
    };
    console.log(data);

    nameInp.value = null;
    emailInp.value = null;
    telInp.value = null;
    textInp.value = null;
    username = null;
    email = null;
    telephone = null;
    choice = null;
    message = null;

    setTimeout(() => {
      contactCont.classList.remove("valid");
    }, 2000);
  }
});
