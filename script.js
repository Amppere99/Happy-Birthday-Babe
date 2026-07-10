const firstSong = document.getElementById("firstSong");
const finalSong = document.getElementById("finalSong");

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

const startOverlay = document.getElementById("startOverlay");
const startExperience = document.getElementById("startExperience");

startExperience?.addEventListener("click", () => {
  playFirstSong();
  startOverlay?.classList.add("hide");
});

const pages = document.querySelectorAll(".page");
const nextBtn = document.getElementById("nextPage");
const prevBtn = document.getElementById("prevPage");

let currentPage = 0;

function stopAllVideos() {
  const blowBtn = document.getElementById("blowBtn");

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
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const magic = document.createElement("div");

      magic.className = "float-magic";
      magic.textContent = Math.random() > 0.48 ? "✦" : "🤍";
      magic.style.left = Math.random() * 100 + "vw";
      magic.style.fontSize = 16 + Math.random() * 22 + "px";
      magic.style.animationDuration = 5 + Math.random() * 5 + "s";

      document.body.appendChild(magic);

      setTimeout(() => {
        magic.remove();
      }, 10000);
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

  for (let i = 0; i < 85; i++) {
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
      ctx.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );
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
