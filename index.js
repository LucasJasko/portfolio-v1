// Paramétrage des beams du background
const beamMaker = () => {
  const beam = document.createElement("span");
  beam.classList.add("beam");
  document.getElementById("beam-display").appendChild(beam);

  beam.style.setProperty("--beamt", Math.random() * 100 + "%");
  beam.style.setProperty("--beaml", Math.random() * 100 + "%");

  setTimeout(() => {
    beam.remove();
  }, 6000);
};
setInterval(beamMaker, 3000);

// Configuration du point rouge de localisation et du fix de la timeline
const blacklineArea = document.querySelector(".blackline-area");
const timeline = document.getElementById("timeline-area");
let ScrollTrigger = true;
window.addEventListener("scroll", () => {
  scrollTop = window.scrollY / document.body.offsetHeight;
  scrollLvl =
    (window.scrollY + window.innerHeight) / document.body.offsetHeight;

  if (scrollTop >= 0.166 && scrollLvl < 0.666) {
    blacklineArea.style.position = "fixed";
    blacklineArea.style.width = "15%";
    blacklineArea.style.top = "0";
    blacklineArea.style.left = "45px";
    if (ScrollTrigger) {
      ScrollTrigger = false;
      const PositionDot = document.createElement("span");
      PositionDot.classList.add("position-dot");
      blacklineArea.appendChild(PositionDot);
    }
  }
  const PositionDot = document.querySelector(".position-dot");
  if (PositionDot) {
    PositionDot.style.top =
      (window.scrollY / timeline.clientHeight - 0.25) * 100 + "%";
  }
  if (scrollTop < 0.166) {
    blacklineArea.style.position = "static";
    blacklineArea.style.width = "100%";
    ScrollTrigger = true;
    const PositionDot = document.querySelector(".position-dot");
    if (PositionDot) {
      PositionDot.remove();
    }
  }
  if (scrollLvl > 0.666) {
    blacklineArea.style.position = "absolute";
    blacklineArea.style.width = "100%";
    blacklineArea.style.top = "auto";
    blacklineArea.style.left = "0";
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
      navBar.style.transform = "translateY(0)";
    }
  }
  lastPos = window.scrollY;
});
burgerButton.addEventListener("click", () => {
  if (window.innerWidth <= 730) {
    if (navBar.style.transform == "translateX(-100%)") {
      navBar.style.transform = "translateX(0)";
    } else {
      navBar.style.transform = "translateX(-100%)";
    }
  }
});

navItems.forEach((item, index) => {
  item.addEventListener("mouseover", () => {
    navBgs[index].style.transform =
      "translateY(-40%) translateX(0) rotateZ(45deg)";
  });
  item.addEventListener("mouseout", () => {
    navBgs[index].style.transform =
      "translateY(50%) translateX(-180%) rotateZ(45deg)";
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
    for (objects in data) data[objects] = null;
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
