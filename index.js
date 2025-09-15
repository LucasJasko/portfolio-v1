// NavBar
const navBar = document.querySelector(".navbar");
const navItems = navBar.querySelectorAll(".navbar-item");
const navBgs = navBar.querySelectorAll(".bg-hover");
const burgerButton = document.querySelector(".burger-button");
let isNavOpen = true;

// Timeline
const blackline = document.querySelector(".blackline");
const positionDot = document.querySelector(".position-dot");
const timelineArea = document.getElementById("timeline-area");
const timelineContainer = document.querySelector(".timeline-container");
const timelines = document.querySelectorAll(".timeline");
const previousArea = document.querySelector(".previous-area");
const nextArea = document.querySelector(".next-area");
const cardContainers = document.querySelectorAll(".card-container");
let initialPos = blackline.getBoundingClientRect().left + (blackline.clientWidth * 2) / 100 - positionDot.clientWidth;
let timelineIndex = 1;
let dotPosition;
let endPos;
let deltaDotTimelines;
let timelineToDisplay = 0;

cardContainers.forEach((cardContainer) => {
  const containerTitles = cardContainer.querySelectorAll(".card-title");
  const containerTexts = cardContainer.querySelectorAll(".card-text");

  containerTitles[0].classList.add("card-title-active");

  containerTitles.forEach((title, i) => {
    if (i != 0) {
      return;
    } else {
      title.classList.add("card-title-active");
    }
  });

  containerTexts.forEach((text, i) => {
    if (i != 0) {
      text.style.display = "none";
    } else {
      text.style.display = "block";
    }
  });

  containerTitles.forEach((title, titleIndex) => {
    title.addEventListener("click", () => {
      containerTitles.forEach((text, i) => {
        if (i != titleIndex) {
          text.classList.remove("card-title-active");
        } else {
          text.classList.add("card-title-active");
        }
      });
      containerTexts.forEach((text, textIndex) => {
        if (textIndex != titleIndex) {
          text.style.display = "none";
        } else {
          text.style.display = "block";
        }
      });
    });
  });
});

// Strengths
const titles = document.querySelectorAll(".strengths-headband h4");
let PrevText = document.getElementById("strength-1");
let activeTitle = titles[0];

// Projects
const tagList = document.querySelectorAll(".project-tag");
const projectList = document.querySelectorAll(".project-card");
let activeTagList = [];

// Contact
const textArea = document.querySelectorAll(".text-area");
const cordP = document.querySelectorAll(".text-area p");
const contactForm = document.querySelector("#contact-form");
const errorMessage = document.querySelector(".error-message");

// Top button
const btnScrollTop = document.getElementById("btnScrollTop");
let isButtonActive = false;
let isToDisplay = false;

// comportements de la navbar
burgerButton.addEventListener("click", () => {
  if (window.innerWidth <= 730) {
    if (isNavOpen) {
      navBar.style.transform = "translateX(-100%) translateY(0)";
      isNavOpen = false;
    } else {
      navBar.style.transform = "translateX(0) translateY(0)";
      isNavOpen = true;
    }
  }
});
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (window.innerWidth <= 730) {
      navBar.style.transform = "translateX(-100%) translateY(0)";
      isNavOpen = false;
    }
  });
});

// Bouton de retour en haut de page
window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btnScrollTop.style.display = "flex";
  } else {
    btnScrollTop.style.display = "none";
  }
};
btnScrollTop.onclick = function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Drag du point de position timeline
document.addEventListener("dragover", (event) => {
  event.preventDefault();
});
window.addEventListener("resize", () => {
  initialPos = blackline.getBoundingClientRect().left + (blackline.clientWidth * 3) / 100 - positionDot.clientWidth;
});
positionDot.addEventListener("drag", (e) => {
  e.preventDefault();
  positionDot.style.transition = "none";
  endPos = blackline.clientWidth - (blackline.clientWidth * 3) / 100;

  if (e.screenX != 0) {
    dotPosition = e.clientX - initialPos;

    positionDot.style.left = `${dotPosition}px`;

    if (dotPosition + initialPos - positionDot.clientWidth < initialPos) {
      dotPosition = 0;
      positionDot.style.left = `${(blackline.clientWidth * 3) / 100}px`;
    }

    if (dotPosition + positionDot.clientWidth > blackline.clientWidth) {
      dotPosition = endPos;
      positionDot.style.left = `${endPos}px`;
    }

    deltaDotTimelines = (dotPosition / blackline.clientWidth) * timelineContainer.clientWidth * timelines.length;
  }
});
positionDot.addEventListener("dragend", () => {
  positionDot.style.transition = "0.2s ease";

  while (deltaDotTimelines > 0) {
    deltaDotTimelines = deltaDotTimelines - timelineContainer.clientWidth;
    timelineToDisplay++;
  }

  timelineContainer.scrollTo(offsetWidth(timelineToDisplay), 0);
  timelineIndex = timelineToDisplay;
  if (timelineIndex == 0) {
    timelineIndex = 1;
  }

  refreshTimelinesNavButtons(timelineIndex);
  positionDot.style.left = `${
    ((blackline.clientWidth - 2 * ((blackline.clientWidth * 3) / 100)) / timelines.length) * timelineToDisplay + (blackline.clientWidth * 3) / 100
  }px`;

  timelineToDisplay = 0;
});

// Gestion des zones suivant et retour de la timeline
refreshTimelinesNavButtons(timelineIndex);

previousArea.addEventListener("mouseenter", () => {
  previousArea.style.opacity = "1";
});
previousArea.addEventListener("mouseleave", () => {
  previousArea.style.opacity = "0";
});
previousArea.addEventListener("click", () => {
  if (timelineIndex > 0) {
    timelineIndex--;
    timelineContainer.scrollTo(offsetWidth(timelineIndex), 0);
    refreshTimelinesNavButtons(timelineIndex);
    positionDot.style.left = `${
      ((blackline.clientWidth - 2 * ((blackline.clientWidth * 3) / 100)) / timelines.length) * (timelineIndex - 1) + (blackline.clientWidth * 3) / 100
    }px`;
  }
});
nextArea.addEventListener("mouseenter", () => {
  nextArea.style.opacity = "1";
});
nextArea.addEventListener("mouseleave", () => {
  nextArea.style.opacity = "0";
});
nextArea.addEventListener("click", () => {
  if (timelineIndex < timelines.length) {
    timelineIndex++;
    timelineContainer.scrollTo(offsetWidth(timelineIndex), 0);
    refreshTimelinesNavButtons(timelineIndex);
    positionDot.style.left = `${
      ((blackline.clientWidth - 2 * ((blackline.clientWidth * 3) / 100)) / timelines.length) * (timelineIndex - 1) + (blackline.clientWidth * 3) / 100
    }px`;
  }
});

function refreshTimelinesNavButtons(timelineIndex) {
  previousArea.style.left = `${offsetWidth(timelineIndex)}px`;
  nextArea.style.right = `-${offsetWidth(timelineIndex)}px`;

  if (timelineIndex == 1) {
    previousArea.style.display = "none";
  } else {
    previousArea.style.display = "flex";
  }

  if (timelineIndex >= timelines.length) {
    nextArea.style.display = "none";
  } else {
    nextArea.style.display = "flex";
  }
}
function offsetWidth(timelineIndex) {
  return timelineContainer.clientWidth * (timelineIndex - 1);
}

// TODO parfois bug de synchro entre timelineIndex et timeLineToDisplay qui empêche le positionnement de la timeline et effectue un déplacement aux flèches standard
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      if (timelineIndex < timelines.length) {
        timelineIndex++;
        timelineContainer.scrollTo(offsetWidth(timelineIndex), 0);
        refreshTimelinesNavButtons(timelineIndex);
        positionDot.style.left = `${
          ((blackline.clientWidth - 2 * ((blackline.clientWidth * 3) / 100)) / timelines.length) * (timelineIndex - 1) + (blackline.clientWidth * 3) / 100
        }px`;
      } else {
        e.preventDefault();
      }
      break;
    case "ArrowLeft":
      if (timelineIndex > 1) {
        timelineIndex--;
        timelineContainer.scrollTo(offsetWidth(timelineIndex), 0);
        refreshTimelinesNavButtons(timelineIndex);
        positionDot.style.left = `${
          ((blackline.clientWidth - 2 * ((blackline.clientWidth * 3) / 100)) / timelines.length) * (timelineIndex - 1) + (blackline.clientWidth * 3) / 100
        }px`;
      } else {
        e.preventDefault();
      }
      break;
  }
});

// Sélection des tags projets
tagList.forEach((tag) => {
  tag.addEventListener("click", () => {
    if (!activeTagList.includes(tag.id)) {
      activeTagList.push(tag.id);
      tag.classList.add("project-tag-active");
    } else {
      let index = activeTagList.findIndex((tagID) => tagID === tag.id);
      activeTagList.splice(index, 1);
      tag.classList.remove("project-tag-active");
    }

    projectList.forEach((project) => {
      if (activeTagList.length == 0) {
        return (project.style.opacity = "1");
      }

      const hasActiveTag = activeTagList.some((activeTag) => {
        return project.classList.contains(activeTag);
      });

      if (hasActiveTag) {
        return (project.style.opacity = "1");
      } else {
        return (project.style.opacity = "0.5");
      }
    });
  });
});

// Navigation dans la zone strengths
activeTitle.classList.add("strengths-headband-active");

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
textArea.forEach((p, i) => {
  p.addEventListener("click", () => {
    textArea[i].style.color = "var(--background-color)";
    textArea[i].style.background = "var(--link-color)";
    if (i == 0) {
      cordP[i].textContent = "06.07.90.04.55";
    }
    if (i == 1) {
      cordP[i].textContent = "lucasjaskowiak@yahoo.fr";
    }
  });
});

// Complétion du formulaire
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const telephone = document.querySelector("#telephone").value.trim();
  const choice = document.querySelector('input[name="type"]:checked')?.value.trim();
  const message = document.querySelector("#description").value.trim();

  if (!username || !email || !telephone || !choice || !message) {
    document.querySelector("#name").style.border = "3px solid transparent";
    document.querySelector("#email").style.border = "3px solid transparent";
    document.querySelector("#telephone").style.border = "3px solid transparent";
    document.querySelector(".form-part-2-container").style.border = "3px solid transparent";
    document.querySelector("#description").style.border = "3px solid transparent";
    contactForm.style.border = "3px solid red";
    return (errorMessage.textContent = "Veuillez remplir tous les champs");
  }

  if (!username.match(/[a-zA-Z]/)) {
    document.querySelector("#name").style.border = "3px solid red";
    return (errorMessage.textContent = "Votre nom n'est pas valide");
  }

  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    document.querySelector("#email").style.border = "3px solid red";
    return (errorMessage.textContent = "Votre email n'est pas valide");
  }

  if (!telephone.match(/^\d[\d.\s-]{1,14}$/)) {
    document.querySelector("#telephone").style.border = "3px solid red";
    return (errorMessage.textContent = "Votre numéro de téléphone n'est pas valide");
  }

  if (choice === undefined) {
    document.querySelector(".form-part-2-container").style.border = "3px solid red";
    return (errorMessage.textContent = "Veuillez sélectionner un choix");
  }

  if (message.length === 0) {
    document.querySelector("#description").style.border = "3px solid red";
    return (errorMessage.textContent = "Veuillez ajouter votre message");
  }

  var formData = new FormData(contactForm);

  fetch("https://formspree.io/f/xrbadzaz", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        document.querySelector("#name").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#telephone").value = "";
        document.querySelector("#description").value = "";
        return (errorMessage.textContent = "Message envoyé. Merci pour votre intérêt !");
      }
      throw new Error("Erreur réseau ou réponse non valide.");
    })
    .then(() => {
      // document.querySelector(".form-part-2-container").checkVisibility = "3px solid transparent";
    })
    .catch((error) => {
      console.error("Erreur:", error);
      return (errorMessage.textContent = "Une erreur est survenue... veuillez réessayer ulérieurement.");
    });
});
