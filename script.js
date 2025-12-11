const symbols = ["👑", "💎", "🕯️", "🗝️", "🌹", "🩸"];

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const spinBtn = document.getElementById("spin-btn");
const result = document.getElementById("result");

function randomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function setReels(a, b, c) {
    reel1.innerText = a;
    reel2.innerText = b;
    reel3.innerText = c;
}

spinBtn.addEventListener("click", () => {
    result.innerText = "";
    spinBtn.disabled = true;

    // Start animation
    reel1.classList.add("spin");
    reel2.classList.add("spin");
    reel3.classList.add("spin");

    // Randomize symbols during animation
    const interval = setInterval(() => {
        setReels(randomSymbol(), randomSymbol(), randomSymbol());
    }, 80);

    // Final stop
    setTimeout(() => {
        clearInterval(interval);

        const s1 = randomSymbol();
        const s2 = randomSymbol();
        const s3 = randomSymbol();
        setReels(s1, s2, s3);

        reel1.classList.remove("spin");
        reel2.classList.remove("spin");
        reel3.classList.remove("spin");

        if (s1 === s2 && s2 === s3) {
            result.innerText = "TRIBUTE ACCEPTED — THE VEIL OPENS";
        } else if (s1 === s2 || s2 === s3 || s1 === s3) {
            result.innerText = "A partial offering… insufficient.";
        } else {
            result.innerText = "Denied. The Dominion rejects you.";
        }

        spinBtn.disabled = false;
    }, 1200);
});
