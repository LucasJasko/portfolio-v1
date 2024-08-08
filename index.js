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
const BlacklineArea = document.querySelector(".blackline-area");
const Timeline = document.getElementById("timeline-area");
const NavBar = document.getElementById("navbar-area");
const NavButton = document.querySelector(".navbar-button");
let ScrollTrigger = true;

setInterval(beamMaker, 3000);

window.addEventListener("scroll", () => {
  scrollTop = window.scrollY / document.body.offsetHeight;
  scrollLvl =
    (window.scrollY + window.innerHeight) / document.body.offsetHeight;

  if (scrollTop >= 0.166 && scrollLvl < 0.666) {
    BlacklineArea.style.position = "fixed";
    BlacklineArea.style.width = "15%";
    BlacklineArea.style.top = "0";
    BlacklineArea.style.left = "0";
    if (ScrollTrigger) {
      ScrollTrigger = false;
      const PositionDot = document.createElement("span");
      PositionDot.classList.add("position-dot");
      BlacklineArea.appendChild(PositionDot);
    }
  }
  const PositionDot = document.querySelector(".position-dot");
  console.log(Timeline.clientHeight);
  if (PositionDot) {
    PositionDot.style.top =
      (window.scrollY / Timeline.clientHeight - 0.25) * 100 + "%";
  }
  if (scrollTop < 0.166) {
    BlacklineArea.style.position = "static";
    BlacklineArea.style.width = "100%";
    ScrollTrigger = true;
    const PositionDot = document.querySelector(".position-dot");
    if (PositionDot) {
      PositionDot.remove();
    }
  }
  if (scrollLvl > 0.666) {
    BlacklineArea.style.position = "absolute";
    BlacklineArea.style.width = "100%";
    BlacklineArea.style.top = "auto";
    BlacklineArea.style.bottom = "0";
  }
});

NavButton.addEventListener("click", () => {
  if (NavBar.style.transform === "translateY(-100%)") {
    NavBar.style.transform = "translateY(0)";
  } else {
    NavBar.style.transform = "translateY(-100%)";
  }
});
