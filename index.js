const beamMaker = () => {
  const beam = document.createElement("span");
  beam.classList.add("beam");
  document.querySelector(".beam-display").appendChild(beam);

  beam.style.setProperty("--beamt", Math.random() * 100 + "%");
  beam.style.setProperty("--beaml", Math.random() * 100 + "%");

  setTimeout(() => {
    beam.remove();
  }, 6000);
};

setInterval(beamMaker, 3000);

let ScrollTrigger = true;

const BlacklineArea = document.querySelector(".blackline-area");

window.addEventListener("scroll", () => {
  scrollLvl =
    (window.scrollY + window.innerHeight) / document.body.offsetHeight;
  scrollTop = window.scrollY / document.body.offsetHeight;
  console.log(window.scrollY);

  if (scrollTop > 0.25) {
    BlacklineArea.style.position = "fixed";
    BlacklineArea.style.width = "25%";
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
  if (PositionDot) {
    PositionDot.style.top = (scrollTop - 0.1) * 100 + "%";
  }
  if (scrollTop < 0.25) {
    BlacklineArea.style.position = "static";
    BlacklineArea.style.width = "100%";
    ScrollTrigger = true;
    const PositionDot = document.querySelector(".position-dot");
    if (PositionDot) {
      PositionDot.remove();
    }
  }
});
