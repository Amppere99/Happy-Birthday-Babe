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

  document.getElementById("ageCounter").innerHTML = `
    <div class="age-box"><strong>${years}</strong><span>years</span></div>
    <div class="age-box"><strong>${days}</strong><span>days</span></div>
    <div class="age-box"><strong>${hours}</strong><span>hours</span></div>
    <div class="age-box"><strong>${minutes}</strong><span>minutes</span></div>
    <div class="age-box"><strong>${seconds}</strong><span>seconds</span></div>
    <div class="age-box"><strong>∞</strong><span>love</span></div>
  `;
}

updateAge();
setInterval(updateAge, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.25
});

document.querySelectorAll(".polaroid").forEach(card => {
  observer.observe(card);
});

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

resize();
addEventListener("resize", resize);

function celebrate() {
  pieces = [];

  for (let i = 0; i < 220; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height,
      size: 5 + Math.random() * 9,
      speed: 2 + Math.random() * 5,
      drift: -2 + Math.random() * 4,
      rotate: Math.random() * 360
    });
  }

  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => {
    p.y += p.speed;
    p.x += p.drift;
    p.rotate += 6;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotate * Math.PI / 180);

    ctx.fillStyle = ["#ffffff", "#bfe7ff", "#4db3ff", "#0b3c7a", "#dff4ff"][
      Math.floor(Math.random() * 5)
    ];

    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  });

  pieces = pieces.filter(p => p.y < canvas.height + 40);

  if (pieces.length > 0) {
    requestAnimationFrame(animate);
  }
}
