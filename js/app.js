// =====================
// Typing Effect
// =====================
const text = "Happy 28th Birthday ❤️";
const typing = document.getElementById("typing");

if (typing) {
  let i = 0;
  function type() {
    if (i < text.length) {
      typing.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 120);
    }
  }
  type();
}

// =====================
// Floating Hearts
// =====================
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (Math.random() * 3 + 4) + "s";
  heart.style.fontSize = (Math.random() * 20 + 20) + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

setInterval(createHeart, 400);

// =====================
// Birthday Counter
// =====================
const counter = document.getElementById("ageCounter");

function updateCounter() {
  if (!counter) return;

  // ปี, เดือน(0=ม.ค.), วัน
  const birthday = new Date(1997, 6, 13);

  const now = new Date();

  const diff = now - birthday;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const years = Math.floor(days / 365.25);

  const months = Math.floor((days % 365.25) / 30.44);

  counter.innerHTML =
    `🌸 You've been in this world for <br><b>${years}</b> years <b>${months}</b> months ❤️`;
}

updateCounter();

// =====================
// Gallery Animation
// =====================
const photos = document.querySelectorAll(".gallery img");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

photos.forEach(photo => observer.observe(photo));

// =====================
// Scroll Reveal
// =====================
const sections = document.querySelectorAll("section");

const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

sections.forEach(sec => reveal.observe(sec));

// =====================
// Sparkles
// =====================
function sparkle() {
  const star = document.createElement("div");
  star.innerHTML = "✨";
  star.className = "sparkle";

  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = Math.random() * window.innerHeight + "px";

  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 2000);
}

setInterval(sparkle, 800);
// =====================
// Gallery Slider
// =====================
const slides = document.querySelectorAll(".polaroid");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

if (nextBtn && prevBtn && slides.length) {

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  showSlide(current);
}
