// =============================
// Gallery
// =============================

const photos = document.querySelectorAll(".polaroid");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let current = 0;

function showPhoto(index){

    photos.forEach(photo=>{
        photo.classList.remove("active");
    });

    photos[index].classList.add("active");

}

if(nextBtn){

nextBtn.onclick = ()=>{

current++;

if(current>=photos.length){

current=0;

}

showPhoto(current);

}

}

if(prevBtn){

prevBtn.onclick = ()=>{

current--;

if(current<0){

current=photos.length-1;

}

showPhoto(current);

}

}

// =============================
// Age Counter
// =============================

// เปลี่ยนปีเกิดให้ตรง
const birthday = new Date("1998-07-13T00:00:00");

function updateAge(){

const now = new Date();

const diff = now - birthday;

const seconds = Math.floor(diff/1000);

const minutes = Math.floor(seconds/60);

const hours = Math.floor(minutes/60);

const days = Math.floor(hours/24);

const years = Math.floor(days/365.25);

const months = years*12 + (now.getMonth()-6);

document.getElementById("ageCounter").innerHTML=`

<h3>${years} Years 🎂</h3>

<p>${months} Months</p>

<p>${days.toLocaleString()} Days</p>

<p>${hours.toLocaleString()} Hours</p>

<p>${minutes.toLocaleString()} Minutes</p>

`;

}

updateAge();

setInterval(updateAge,1000);

// =============================
// Floating Hearts
// =============================

function createHeart(){

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML="🤍";

heart.style.left=Math.random()*100+"vw";

heart.style.animationDuration=(5+Math.random()*5)+"s";

heart.style.fontSize=(18+Math.random()*18)+"px";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},9000);

}

setInterval(createHeart,700);

// =============================
// Bubble
// =============================

function createBubble(){

const bubble=document.createElement("div");

bubble.className="bubble";

const size=10+Math.random()*30;

bubble.style.width=size+"px";

bubble.style.height=size+"px";

bubble.style.left=Math.random()*100+"vw";

bubble.style.animationDuration=(8+Math.random()*6)+"s";

document.body.appendChild(bubble);

setTimeout(()=>{

bubble.remove();

},15000);

}

setInterval(createBubble,1200);

// =============================
// Balloon
// =============================

function createBalloon(){

const balloon=document.createElement("div");

balloon.className="balloon";

if(Math.random()>0.5){

balloon.classList.add("blue");

}else{

balloon.classList.add("white");

}

balloon.style.left=Math.random()*100+"vw";

balloon.style.animationDuration=(10+Math.random()*8)+"s";

document.body.appendChild(balloon);

setTimeout(()=>{

balloon.remove();

},18000);

}

setInterval(createBalloon,3500);

// =============================
// Confetti
// =============================

const confettiBtn=document.getElementById("confetti");

if(confettiBtn){

confettiBtn.onclick=()=>{

for(let i=0;i<120;i++){

const piece=document.createElement("div");

piece.innerHTML=["🎉","✨","💙","🤍","🎈"][Math.floor(Math.random()*5)];

piece.style.position="fixed";

piece.style.left=Math.random()*100+"vw";

piece.style.top="-50px";

piece.style.fontSize=(15+Math.random()*20)+"px";

piece.style.transition="4s linear";

document.body.appendChild(piece);

setTimeout(()=>{

piece.style.top="110vh";

piece.style.transform=`rotate(${Math.random()*720}deg)`;

},50);

setTimeout(()=>{

piece.remove();

},4500);

}

alert("🎂 Happy Birthday My Love ❤️");

}

}

// =============================
// Sparkles Around Photo
// =============================

photos.forEach(photo=>{

for(let i=0;i<5;i++){

const s=document.createElement("div");

s.className="sparkle";

s.innerHTML="✨";

s.style.top=Math.random()*100+"%";

s.style.left=Math.random()*100+"%";

photo.appendChild(s);

}

});

showPhoto(current);
