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

const timeline = document.querySelector(".timeline-area")
timeline.addEventListener("mouseover", () => {
    mouse.style.background = "black";
})

const welcomeArea = document.querySelector(".welcome-area")
welcomeArea.addEventListener("mouseover", () => {
    mouse.style.background = "yellow";
})


let ScrollTrigger = true;

window.addEventListener("scroll", () => {
    const BlacklineArea = document.querySelector(".blackline-area")
    scrollLvl = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    scrollTop = window.scrollY / document.body.offsetHeight;
    if (scrollTop > 0.25) {
        BlacklineArea.style.position = "fixed";
        BlacklineArea.style.width = "25%";
        BlacklineArea.style.top = "0";
        BlacklineArea.style.left = "0";
        if (ScrollTrigger) {
            ScrollTrigger = false;
            const PositionDot = document.createElement("span");
            PositionDot.classList.add("position-dot");
            BlacklineArea.appendChild(PositionDot);}
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

window.addEventListener()
