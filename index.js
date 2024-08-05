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

const BlacklineArea = document.querySelector(".blackline-area");
let ScrollTrigger = true;

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
  const Timeline = document.querySelector(".timeline-area");
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
