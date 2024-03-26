const beamMaker = () => {
    const beam = document.createElement("span");
    beam.classList.add("beam");
    document.querySelector(".beamdisplay").appendChild(beam);

    beam.style.setProperty("--beamt", Math.random() * 100 + "%");
    beam.style.setProperty("--beaml", Math.random() * 100 + "%");

    setTimeout(() => {
        beam.remove();
    }, 6000);
};

setInterval(beamMaker, 3000);

const mouse = document.querySelector(".mouse");

window.addEventListener("mousemove", (e) => {
    let windowWidht = window.innerWidth;
    let windowHeight = window.innerHeight;

    if (e.x > 5 && e.x < windowWidht && e.y > 5 && e.y < windowHeight - 5) {
        mouse.style.visibility = "visible";
        mouse.style.top = e.y + "px";
        mouse.style.left = e.x + "px";
    } else {
        mouse.style.visibility = "hidden";
    }
});

window.addEventListener("scroll", () => {
    mouse.style.position = "fixed";
});
