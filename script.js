const downloadBtn = document.getElementById("downloadBtn");
const popup = document.getElementById("downloadPopup");
const countdown = document.getElementById("countdown");
const downloadCount = document.getElementById("downloadCount");

let current = 9800;
const target = 10000;

function animateCounter() {
    const timer = setInterval(() => {
        current++;

        if (current >= target) {
            clearInterval(timer);
            downloadCount.textContent = "10K+";
        } else {
            downloadCount.textContent = current.toLocaleString();
        }
    }, 2);
}

animateCounter();

downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const downloadUrl = downloadBtn.getAttribute("href");

    popup.style.display = "flex";
    downloadBtn.style.pointerEvents = "none";

    let time = 3;
    countdown.textContent = time;

    const timer = setInterval(() => {
        time--;
        countdown.textContent = time;

        if (time <= 0) {
            clearInterval(timer);

            popup.style.display = "none";
            downloadBtn.style.pointerEvents = "auto";

            window.location.href = downloadUrl;
        }
    }, 1000);
});

const screenList = document.querySelector(".screen-list");

if (screenList) {
    let direction = 1;

    setInterval(() => {
        if (direction === 1) {
            screenList.scrollBy({
                left: 280,
                behavior: "smooth"
            });

            if (screenList.scrollLeft >= screenList.scrollWidth - screenList.clientWidth - 10) {
                direction = -1;
            }
        } else {
            screenList.scrollBy({
                left: -280,
                behavior: "smooth"
            });

            if (screenList.scrollLeft <= 10) {
                direction = 1;
            }
        }
    }, 2500);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
});

document.querySelectorAll(".card, .feature-card, .why, .community, .ads, .screenshots").forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "0.8s";

    observer.observe(element);
});
