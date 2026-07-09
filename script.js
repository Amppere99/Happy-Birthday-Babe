const birthDate = new Date("1998-07-13T00:00:00");

function updateAge() {
  const now = new Date();
  let diff = Math.floor((now - birthDate) / 1000);

  const years = Math.floor(diff / 31557600);
  diff -= years * 31557600;

  const days = Math.floor(diff / 86400);
  diff -= days * 86400;

  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;

  const minutes = Math.floor(diff / 60);
  const seconds = diff - minutes * 60;

  const counter = document.getElementById("ageCounter");

  if (!counter) return;

  counter.innerHTML = `
    <div class="age-box">
      <strong>${years}</strong>
      <span>years</span>
    </div>

    <div class="age-box">
      <strong>${days}</strong>
      <span>days</span>
    </div>

    <div class="age-box">
      <strong>${hours}</strong>
      <span>hours</span>
    </div>

    <div class="age-box">
      <strong>${minutes}</strong>
      <span>minutes</span>
    </div>

    <div class="age-box">
      <strong>${seconds}</strong>
      <span>seconds</span>
    </div>

    <div class="age-box">
      <strong>∞</strong>
      <span>love</span>
    </div>
  `;
}

updateAge();
setInterval(updateAge, 1000);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.18
  }
);

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

const canvas = document.getElementById("magicCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function makeBackgroundParticle() {
  particles.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: Math.random() * 2.4 + 1,
    speed: Math.random() * 0.7 + 0.25,
    drift: Math.random() * 0.45 - 0.225,
    alpha: Math.random() * 0.45 + 0.18
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (particles.length < 110) {
    makeBackgroundParticle();
  }

  particles.forEach(particle => {
    particle.y -= particle.speed;
    particle.x += particle.drift;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${particle.alpha})`;
    ctx.arc(
      particle.x,
      particle.y,
      particle.size,
      0,
      Math.PI * 2
    );
    ctx.fill();
  });

  particles = particles.filter(particle => particle.y > -30);

  requestAnimationFrame(drawParticles);
}

drawParticles();

const blowBtn = document.getElementById("blowBtn");

if (blowBtn) {
  blowBtn.addEventListener("click", () => {
    const flame = document.getElementById("flame");
    const smoke = document.getElementById("smoke");
    const message = document.getElementById("birthdayMessage");

    if (flame) {
      flame.style.opacity = "0";
      flame.style.transform = "translateX(-50%) scale(0.2)";
      flame.style.boxShadow = "none";
    }

    if (smoke) {
      smoke.classList.add("show");
    }

    blowBtn.style.display = "none";

    setTimeout(() => {
      if (message) {
        message.classList.add("show");
      }
    }, 650);

    releaseMagic();
  });
}

function releaseMagic() {
  for (let i = 0; i < 170; i++) {
    setTimeout(() => {
      const magic = document.createElement("div");

      magic.className = "float-magic";
      magic.textContent = Math.random() > 0.48 ? "✦" : "🤍";
      magic.style.left = Math.random() * 100 + "vw";
      magic.style.fontSize = 16 + Math.random() * 24 + "px";
      magic.style.animationDuration = 5 + Math.random() * 5 + "s";
      magic.style.opacity = 0.55 + Math.random() * 0.45;

      document.body.appendChild(magic);

      setTimeout(() => {
        magic.remove();
      }, 10000);
    }, i * 38);
  }
}
const pageSections = document.querySelectorAll("section");
let pageIndex = 0;

function goToPage(index) {
  if (index < 0) index = 0;
  if (index >= pageSections.length) index = pageSections.length - 1;

  pageIndex = index;

  pageSections[pageIndex].scrollIntoView({
    behavior: "smooth"
  });
}

document.getElementById("nextPage").addEventListener("click", () => {
  goToPage(pageIndex + 1);
});

document.getElementById("prevPage").addEventListener("click", () => {
  goToPage(pageIndex - 1);
});

const envelope = document.getElementById("envelope");

if (envelope) {
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
  });
}
