function startSurprise() {
    document.getElementById('welcome-page').style.opacity = '0';
    document.getElementById('welcome-page').style.visibility = 'hidden';
    document.getElementById('main-content').style.opacity = '1';
    updatePageZIndex();
}

// ระบบจัดการพลิกหน้ากระดาษ
const papers = Array.from(document.querySelectorAll('.paper'));
let currentPageIndex = 0;

function updatePageZIndex() {
    papers.forEach((paper, index) => {
        if (index >= currentPageIndex) {
            paper.style.zIndex = papers.length - index;
        } else {
            paper.style.zIndex = index;
        }
    });
}

function nextPage() {
    if (currentPageIndex < papers.length - 1) {
        papers[currentPageIndex].classList.add('flipped');
        currentPageIndex++;
        updatePageZIndex();
    } else {
        // วนกลับมาหน้าแรกเมื่อเปิดจนจบเล่ม
        papers.forEach(paper => paper.classList.remove('flipped'));
        currentPageIndex = 0;
        updatePageZIndex();
    }
}

function prevPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        papers[currentPageIndex].classList.remove('flipped');
        updatePageZIndex();
    }
}
