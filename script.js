let current = 0;
const cards = document.querySelectorAll(".card");

function showCard(index) {
  cards.forEach(card => card.classList.remove("active"));
  cards[index].classList.add("active");
}

function nextCard() {
  current++;
  if (current >= cards.length) current = cards.length - 1;
  showCard(current);
}

function openEnvelope() {
  document.querySelector(".envelope").classList.toggle("open");
}

function openSong() {
  window.open(
    "https://www.youtube.com/results?search_query=The+Two+of+Us+Grover+Washington+Jr",
    "_blank"
  );
}

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
    <div class="age-box"><strong>${years}</strong><span>YEARS</span></div>
    <div class="age-box"><strong>${days}</strong><span>DAYS</span></div>
    <div class="age-box"><strong>${hours}</strong><span>HOURS</span></div>
    <div class="age-box"><strong>${minutes}</strong><span>MINUTES</span></div>
    <div class="age-box"><strong>${seconds}</strong><span>SECONDS</span></div>
    <div class="age-box"><strong>∞</strong><span>LOVE</span></div>
  `;
}

updateAge();
setInterval(updateAge, 1000);

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

  for (let i = 0; i < 160; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 4 + 2,
      rotate: Math.random() * 360
    });
  }

  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => {
    p.y += p.speed;
    p.rotate += 5;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotate * Math.PI / 180);
    ctx.fillStyle = ["#ffffff", "#9ed0ff", "#0b3a75", "#ffd8ea"][
      Math.floor(Math.random() * 4)
    ];
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  });

  pieces = pieces.filter(p => p.y < canvas.height + 20);

  if (pieces.length > 0) {
    requestAnimationFrame(animateConfetti);
  }
}
