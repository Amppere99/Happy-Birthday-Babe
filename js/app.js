// รายชื่อคำพูดบนปุ่ม Next ตามหน้าสไลด์ (มี 15 หน้า)
const nextButtonTexts = [
    "Next cuteness ➡️",       // หน้า 1
    "Show me more! ✨",       // หน้า 2
    "What's next? 🤔",        // หน้า 3
    "Keep scrolling shorty 💖",// หน้า 4
    "Are you smiling yet? 😏", // หน้า 5
    "Another cute memory 📸",  // หน้า 6
    "Click for a surprise 🎉", // หน้า 7
    "You’re doing great, next!",// หน้า 8
    "Almost halfway there! ⏳",// หน้า 9
    "Double digits, let's go! 🚀",// หน้า 10
    "Can't stop loving this 🥺",// หน้า 11
    "Get ready for the next one 🍦",// หน้า 12
    "Wow, who is this cutie? 😍",// หน้า 13
    "One more before the final! 🤏",// หน้า 14
    "Back to the start! 🔄"    // หน้า 15 (วนกลับไปหน้าแรก)
];

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let nextBtn = document.querySelectorAll(".btn-playful")[1]; // ดึงปุ่ม Next มาควบคุม
    
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slides[slideIndex-1].style.display = "block";  
    
    // เปลี่ยนคำพูดบนปุ่ม Next ตามหน้าปัจจุบันที่แสดง
    if(nextBtn) {
        nextBtn.innerText = nextButtonTexts[slideIndex - 1];
    }
}

// ส่วนควบคุมเพลง (คงเดิม)
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const btn = document.getElementById("playBtn");
    
    if (music.paused) {
        music.play();
        btn.innerText = "⏸️";
    } else {
        music.pause();
        btn.innerText = "🎵";
    }
}
