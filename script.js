const firstSong = document.getElementById("firstSong");
const finalSong = document.getElementById("finalSong");
const startOverlay = document.getElementById("startOverlay");
const startExperience = document.getElementById("startExperience");
const pages = document.querySelectorAll(".page");
const nextBtn = document.getElementById("nextPage");
const prevBtn = document.getElementById("prevPage");
const envelope = document.getElementById("envelope");
const blowBtn = document.getElementById("blowBtn");

let currentPage = 0;

async function playAudio(audio, volume = 0.75) {
  if (!audio) return;

  try {
    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;
    await audio.play();
  } catch (error) {
    console.log("Audio could not start:", error);
  }
}

function playFirstSong() {
  if (finalSong) {
    finalSong.pause();
    finalSong.currentTime = 0;
  }

  playAudio(firstSong, 0.75);
}

function playFinalSong() {
  if (firstSong) {
    firstSong.pause();
  }

  playAudio(finalSong, 0.82);
}

function pauseEveryVideo() {
  document.querySelectorAll("video").forEach((video) => {
    video.pause();
  });
}

function playVideosOnActivePage(page) {
  page.querySelectorAll("video").forEach((video) => {
    video.muted = true;
    video.currentTime = 0;
    video.play().catch(() => {});
  });
}

function showPage(index) {
  if (!pages.length) return;

  const safeIndex = Math.max(0, Math.min(index, pages.length - 1));

  pauseEveryVideo();
  pages.forEach((page) => page.classList.remove("active"));

  const activePage = pages[safeIndex];
  activePage.classList.add("active");
  playVideosOnActivePage(activePage);

  currentPage = safeIndex;

  if (prevBtn) {
    prevBtn.disabled = currentPage === 0;
    prevBtn.style.opacity = currentPage === 0 ? "0.35" : "1";
  }

  if (nextBtn) {
    nextBtn.disabled = currentPage === pages.length - 1;
    nextBtn.style.opacity = currentPage === pages.length - 1 ? "0.35" : "1";
  }
}

startExperience?.addEventListener("click", () => {
  startOverlay?.classList.add("hide");
  playFirstSong();
  showPage(0);
});

nextBtn?.addEventListener("click", () => {
  showPage(currentPage + 1);
});

prevBtn?.addEventListener("click", () => {
  showPage(currentPage - 1);
});

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

envelope?.addEventListener("click", () => {
  envelope.classList.toggle("open");
});

blowBtn?.addEventListener("click", () => {
  const flame = document.getElementById("flame");
  const smoke = document.getElementById("smoke");
  const message = document.getElementById("birthdayMessage");

  playFinalSong();

  if (flame) {
    flame.style.opacity = "0";
    flame.style.transform = "translateX(-50%) scale(0.2)";
    flame.style.boxShadow = "none";
  }

  smoke?.classList.add("show");
  message?.classList.add("show");
  blowBtn.style.display = "none";
  releaseMagic();
});

function releaseMagic() {
  for (let i = 0; i < 150; i += 1) {
    setTimeout(() => {
      const magic = document.createElement("div");
      magic.className = "float-magic";
      magic.textContent = Math.random() > 0.48 ? "✦" : "🤍";
      magic.style.left = `${Math.random() * 100}vw`;
      magic.style.fontSize = `${16 + Math.random() * 22}px`;
      magic.style.animationDuration = `${5 + Math.random() * 5}s`;
      document.body.appendChild(magic);

      setTimeout(() => magic.remove(), 10000);
    }, i * 38);
  }
}

const canvas = document.getElementById("magicCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  const particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  for (let i = 0; i < 85; i += 1) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 0.4 + 0.2
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,.68)";

    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();

      particle.y -= particle.speed;

      if (particle.y < 0) {
        particle.y = canvas.height;
        particle.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}
