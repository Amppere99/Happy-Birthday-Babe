const pages = document.querySelectorAll(".page");
const nextBtn = document.getElementById("nextPage");
const prevBtn = document.getElementById("prevPage");

let currentPage = 0;

function showPage(index) {

    if(index < 0) index = 0;
    if(index >= pages.length) index = pages.length-1;

    pages.forEach(page=>{
        page.classList.remove("active");
    });

    pages[index].classList.add("active");

    currentPage = index;

    prevBtn.style.opacity = currentPage===0 ? ".35" : "1";
    nextBtn.style.opacity = currentPage===pages.length-1 ? ".35" : "1";

}

showPage(0);

nextBtn.onclick = ()=>{

    if(currentPage<pages.length-1){

        showPage(currentPage+1);

    }

}

prevBtn.onclick = ()=>{

    if(currentPage>0){

        showPage(currentPage-1);

    }

}



const birthDate = new Date("1998-07-13T00:00:00");

function updateAge(){

    const now = new Date();

    let diff = Math.floor((now-birthDate)/1000);

    const years = Math.floor(diff/31557600);
    diff -= years*31557600;

    const days = Math.floor(diff/86400);
    diff -= days*86400;

    const hours = Math.floor(diff/3600);
    diff -= hours*3600;

    const minutes = Math.floor(diff/60);

    const seconds = diff-minutes*60;

    const counter = document.getElementById("ageCounter");

    if(!counter) return;

    counter.innerHTML=`

    <div class="age-box">
        <strong>${years}</strong>
        <span>Years</span>
    </div>

    <div class="age-box">
        <strong>${days}</strong>
        <span>Days</span>
    </div>

    <div class="age-box">
        <strong>${hours}</strong>
        <span>Hours</span>
    </div>

    <div class="age-box">
        <strong>${minutes}</strong>
        <span>Minutes</span>
    </div>

    <div class="age-box">
        <strong>${seconds}</strong>
        <span>Seconds</span>
    </div>

    <div class="age-box">
        <strong>∞</strong>
        <span>Love</span>
    </div>

    `;

}

updateAge();

setInterval(updateAge,1000);



const envelope=document.getElementById("envelope");

if(envelope){

envelope.onclick=()=>{

envelope.classList.toggle("open");

}

}



const blow=document.getElementById("blowBtn");

if(blow){

blow.onclick=()=>{

document.getElementById("flame").style.opacity=0;

document.getElementById("smoke").classList.add("show");

setTimeout(()=>{

document.getElementById("birthdayMessage").classList.add("show");

},800);

magic();

}

}



function magic(){

for(let i=0;i<160;i++){

setTimeout(()=>{

let star=document.createElement("div");

star.className="float-magic";

star.innerHTML=Math.random()>.5?"✦":"🤍";

star.style.left=Math.random()*100+"vw";

star.style.fontSize=(18+Math.random()*24)+"px";

star.style.animationDuration=(5+Math.random()*5)+"s";

document.body.appendChild(star);

setTimeout(()=>{

star.remove();

},10000);

},i*35);

}

}



const canvas=document.getElementById("magicCanvas");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

let particles=[];

for(let i=0;i<90;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

r:Math.random()*2+1,

s:Math.random()*.4+.2

});

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="rgba(255,255,255,.7)";

particles.forEach(p=>{

ctx.beginPath();

ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

ctx.fill();

p.y-=p.s;

if(p.y<0){

p.y=canvas.height;

p.x=Math.random()*canvas.width;

}

});

requestAnimationFrame(animate);

}

animate();
