const sections = document.querySelectorAll(".section");

let currentScroll = 0;
let targetScroll = 0;

/* SMOOTH SCROLL ANIMATION */

window.addEventListener("scroll", () => {
  targetScroll = window.scrollY;
});

function animate() {

  currentScroll +=
    (targetScroll - currentScroll) * 0.08;

  sections.forEach(section => {

    const rect =
      section.getBoundingClientRect();

    const center =
      window.innerHeight / 2;

    const distance =
      rect.top + rect.height / 2 - center;

    const opacity = Math.max(
      0,
      1 - Math.abs(distance) /
      (window.innerHeight * 0.7)
    );

    const move = distance * 0.04;

    /* SECTION */

    section.style.opacity = opacity;

    section.style.transform =
      `translateY(${move}px)`;

    /* CAPTIONS */

    const caption =
      section.querySelector(".caption");

    if (caption) {

      caption.style.opacity = opacity;

      const direction =
        caption.classList.contains("right")
        ? 60
        : -60;

      caption.style.transform =
        `translateX(${(1 - opacity) * direction}px)`;

    }

  });

  requestAnimationFrame(animate);
}

animate();

/* ENVELOPE */

function openLetter() {

  const envelope =
    document.querySelector(".envelope");

  const text =
    document.querySelector(".hidden-text");

  const heart =
    document.querySelector(".reveal-heart");

  const choices =
    document.querySelector(".choices");

  envelope.classList.add("open");

  choices.style.display = "none";

  setTimeout(() => {
    heart.classList.add("show");
  }, 500);

  setTimeout(() => {
    text.classList.add("show");
  }, 1100);

}

/* NO BUTTON */

const noBtn =
  document.getElementById("noBtn");

if (noBtn) {

  noBtn.addEventListener(
    "mouseover",
    moveNo
  );

  noBtn.addEventListener(
    "touchstart",
    moveNo
  );

}

function moveNo() {

  const x =
    Math.random() * 60 - 30;

  const y =
    Math.random() * 40 - 20;

  noBtn.style.transform =
    `translate(${x}px, ${y}px)`;

}

/* FINAL FLOATING CARDS */

function startCards() {

  const container =
    document.getElementById("cardBg");

  if (!container) return;

  if (container.dataset.loaded) return;

  container.dataset.loaded = "true";

  const photos = [
    "images/photo1.JPG",
    "images/photo2.JPG",
    "images/photo3.JPG",
    "images/photo4.JPG",
    "images/photo5.JPG",
    "images/photo6.JPG"
  ];

  for (let i = 0; i < 10; i++) {

    const img =
      document.createElement("img");

    img.src =
      photos[
        Math.floor(
          Math.random() * photos.length
        )
      ];

    img.classList.add("card");

    img.style.left =
      Math.random() * 90 + "%";

    img.style.top =
      Math.random() * 80 + "%";

    const rot =
      Math.random() * 40 - 20;

    img.style.setProperty(
      "--rot",
      rot + "deg"
    );

    container.appendChild(img);

    setTimeout(() => {

      img.style.animation =
        "dropCard 0.8s ease forwards";

      setTimeout(() => {
        img.classList.add("float");
      }, 800);

    }, i * 120);

  }

}

/* DETECT FINAL SCREEN */

window.addEventListener("scroll", () => {

  const final =
    document.querySelector(".final");

  if (!final) return;

  const rect =
    final.getBoundingClientRect();

  if (
    rect.top <
    window.innerHeight * 0.7
  ) {
    startCards();
  }

});

/* HIDE SCROLL INDICATOR */

const indicator =
  document.querySelector(
    ".scroll-indicator"
  );

window.addEventListener("scroll", () => {

  if (indicator) {
    indicator.style.opacity = "0";
  }

});