const symbols = ["👑", "💎", "🕯️", "🗝️", "🌹", "💧"];

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const spinBtn = document.getElementById("spin-btn");
const result = document.getElementById("result");

spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    result.innerText = "";

    const s1 = symbols[Math.floor(Math.random() * symbols.length)];
    const s2 = symbols[Math.floor(Math.random() * symbols.length)];
    const s3 = symbols[Math.floor(Math.random() * symbols.length)];

    reel1.innerText = s1;
    reel2.innerText = s2;
    reel3.innerText = s3;

    setTimeout(() => {
        if (s1 === s2 && s2 === s3) {
            result.innerText = "TRIBUTE ACCEPTED. YOU MAY ENTER.";
        } else if (s1 === s2 || s2 === s3 || s1 === s3) {
            result.innerText = "A partial offering… but not enough.";
        } else {
            result.innerText = "Denied. Try again.";
        }

        spinBtn.disabled = false;
    }, 400);
});
