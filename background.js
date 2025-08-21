let isScrolled = false;

window.addEventListener("scroll", () => {
  if (!isScrolled) {
    isScrolled = true;

    const bubbleContainer = document.querySelector("#beam-display");

    function randomDot() {
      const bubble = document.createElement("span");

      bubbleContainer.appendChild(bubble).classList.add("bubble");
      let rng = Math.round(Math.random() * 700);
      let size = rng + 100 + "px";

      bubble.style.height = size;
      bubble.style.width = size;

      let r = Math.round(Math.random() * 150);
      let g = Math.round(Math.random() * 100);
      let b = Math.round(Math.random() * 255);
      bubble.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

      bubble.style.filter = `blur(${rng / 800 + 70}px)`;
      bubble.style.left = Math.random() * 100 + "%";

      setTimeout(() => bubbleContainer.removeChild(bubble), 30000);
    }

    function updateBorderColor() {
      const bubbles = document.querySelectorAll(".bubbles .bubble");
      const colors = Array.from(bubbles).map(
        (bubble) => getComputedStyle(bubble).backgroundColor + " " + ((bubble.getBoundingClientRect().y / window.innerHeight) * 100).toFixed(2) + "%"
      );

      const gradient = `linear-gradient(90deg, ${colors.join(`, `)}) 60`;
      bubbleContainer.style.borderImage = gradient;
    }
    setInterval(() => {
      updateBorderColor();
    }, 1);
    randomDot();
    setTimeout(() => {
      randomDot();
    }, 2000);
    setInterval(() => {
      randomDot();
    }, 5000);
    // for (let i = 0; i < 5; i++) {
    //   setTimeout(() => {
    //     randomDot();
    //     updateBorderColor();
    //   }, i * 1000);
    // }
  }
});
