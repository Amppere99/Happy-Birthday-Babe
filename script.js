const pageFlip = new St.PageFlip(document.getElementById("book"), {
  width: 390,
  height: 520,
  size: "stretch",
  minWidth: 300,
  maxWidth: 780,
  minHeight: 420,
  maxHeight: 560,
  showCover: true,
  mobileScrollSupport: false,
  useMouseEvents: true,
  flippingTime: 900,
  drawShadow: true,
  maxShadowOpacity: 0.35
});

pageFlip.loadFromHTML(document.querySelectorAll(".page"));

document.getElementById("prevBtn").addEventListener("click", () => {
  pageFlip.flipPrev();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  pageFlip.flipNext();
});

const birthDate = new Date("1998-07-13T00:00:00");

function updateAgeCounter() {
  const now = new Date();
  let diff = Math.floor((now - birthDate) / 1000);

  const years = Math.floor(diff / (365.25 * 24 * 60 * 60));
  diff -= Math.floor(years * 365.25 * 24 * 60 * 60);

  const days = Math.floor(diff / (24 * 60 * 60));
  diff -= days * 24 * 60 * 60;

  const hours = Math.floor(diff / (60 * 60));
  diff -= hours * 60 * 60;

  const minutes = Math.floor(diff / 60);
  const seconds = diff - minutes * 60;

  document.getElementById("ageCounter").innerHTML = `
    <div class="age-box"><strong>${years}</strong><span>YEARS</span></div>
    <div class="age-box"><strong>${days}</strong><span>DAYS</span></div>
    <div class="age-box"><strong>${hours}</strong><span>HOURS</span></div>
    <div class="age-box"><strong>${minutes}</strong><span>MINUTES</span></div>
    <div class="age-box"><strong>${seconds}</strong><span>SECONDS</span></div>
    <div class="age-box"><strong>∞</strong><span>LOVED</span></div>
  `;
}

updateAgeCounter();
setInterval(updateAgeCounter, 1000);

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "💙" : "✨";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 4 + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

setInterval(createHeart, 700);

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confetti = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createConfetti() {
  confetti = [];

  for (let i = 0; i < 180; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 4 + 2,
      angle: Math.random() * 360,
      spin: Math.random() * 10
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((c) => {
    c.y += c.speed;
    c.angle += c.spin;

    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate((c.angle * Math.PI) / 180);
    ctx.fillStyle = ["#ffd86b", "#ffffff", "#7fb3ff", "#ff9ecb"][
      Math.floor(Math.random() * 4)
    ];
    ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
    ctx.restore();
  });

  confetti = confetti.filter((c) => c.y < canvas.height + 20);

  if (confetti.length > 0) {
    requestAnimationFrame(drawConfetti);
  }
}

document.getElementById("celebrateBtn").addEventListener("click", () => {
  createConfetti();
  drawConfetti();
});
