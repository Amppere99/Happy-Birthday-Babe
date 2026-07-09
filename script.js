const pages = document.querySelectorAll(".page");
const nextBtn = document.getElementById("nextPage");
const prevBtn = document.getElementById("prevPage");

let currentPage = 0;

function showPage(index) {
  if (!pages.length) return;

  if (index < 0) index = 0;
  if (index >= pages.length) index = pages.length - 1;

  pages.forEach(page => page.classList.remove("active"));
  pages[index].classList.add("active");

  currentPage = index;

  if (prevBtn) prevBtn.style.opacity = currentPage === 0 ? ".35" : "1";
  if (nextBtn) nextBtn.style.opacity = currentPage === pages.length - 1 ? ".35" : "1";
}

if (nextBtn) {
  nextBtn.onclick = () => {
    showPage(currentPage + 1);
  };
}

if (prevBtn) {
  prevBtn.onclick = () => {
    showPage(currentPage - 1);
  };
}

showPage(0);

const birthDate = new Date("1998-07-13T00:00:00");

function updateAge() {
  const counter = document.getElementById("ageCounter");
  if (!counter) return;

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

  counter.innerHTML = `
    <div class="age-box"><strong>${years}</strong><span>Years</span></div>
    <div class="age-box"><strong>${days}</strong><span>Days</span></div>
    <div class="age-box"><strong>${hours}</strong><span>Hours</span></div>
    <div class="age-box"><strong>${minutes}</strong><span>Minutes</span></div>
    <div class="age-box"><strong>${seconds}</strong><span>Seconds</span></div>
    <div class="age-box"><strong>∞</strong><span>Love</span></div>
  `;
}

updateAge();
setInterval(updateAge, 1000);

const envelope = document.getElementById("envelope");

if (envelope) {
  envelope.onclick = () => {
    envelope.classList.toggle("open");
  };
}

const blowBtn = document.getElementById("blowBtn");

if (blowBtn) {
  blowBtn.onclick = () => {
    const flame = document.getElementById("flame");
    const smoke = document.getElementById("smoke");
    const message = document.getElementById("birthdayMessage");

    if (flame) flame.style.opacity = "0";
    if (smoke) smoke.classList.add("show");
    if (message) message.classList.add("show");

    blowBtn.style.display = "none";
    releaseMagic();
  };
}

function releaseMagic() {
  for (let i = 0; i < 160; i++) {
    setTimeout(() => {
      const star = document.createElement("div");
      star.className = "float-magic";
      star.innerHTML = Math.random() > 0.5 ? "✦" : "🤍";
      star.style.left = Math.random() * 100 + "vw";
      star.style.fontSize = 18 + Math.random() * 24 + "px";
      star.style.animationDuration = 5 + Math.random() * 5 + "s";
      document.body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 10000);
    }, i * 35);
  }
}

const canvas = document.getElementById("magicCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let particles = [];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      s: Math.random() * 0.4 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,.7)";

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.y -= p.s;

      if (p.y < 0) {
        p.y = canvas.height;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}
