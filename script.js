// ===============================
// VELVET DOMINION PERSONALITY ENGINE v1.0
// ===============================

// Symbol pool
const symbols = ["💎", "🔑", "🔮", "🦋"];

// Mood states — dynamic
let mood = "amused";  
// possible moods: amused, bored, hungry, irritated, pleased

// Weighted reaction tables
const reactions = {
    win: [
        "Mmm… a triple. Finally, some competence.",
        "You actually pleased me. Rare.",
        "A victory… Don’t get cocky, pet.",
        "Fine. I’ll allow myself a moment of satisfaction."
    ],
    lose: [
        "A partial offering. Pathetic.",
        "No. Try again. And do better.",
        "Is that really the best you can give me?",
        "Spin again. You’re not done until *I* say you’re done."
    ],
    near: [
        "Two matches… you're close. I like watching you chase.",
        "Almost. I enjoy the struggle.",
        "You reach, you fail, you reach again. Good.",
        "Taste the edge of victory, but not the victory itself."
    ],
    moodShift: {
        amused: [
            "You're entertaining me… for now.",
            "I could watch you lose all day.",
        ],
        bored: [
            "Yawn. Impress me or be dismissed.",
            "This isn’t enough. Not even close."
        ],
        hungry: [
            "I want more. Give me a real offering.",
            "Feed me victory, pet."
        ],
        irritated: [
            "You're testing my patience.",
            "Try again. Correct your failure."
        ],
        pleased: [
            "Good. Keep performing.",
            "You've earned… a fraction of my attention."
        ]
    }
};

// Random choice helper
function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// Mood logic (simple Markov-ish behavior)
function updateMood(win) {
    const rand = Math.random();
    if (win) {
        if (rand < 0.4) mood = "pleased";
        else mood = "amused";
    } else {
        if (rand < 0.3) mood = "irritated";
        else if (rand < 0.6) mood = "hungry";
        else mood = "bored";
    }
}

// Evaluate result + reaction generator
function evaluate(reels) {
    const [a, b, c] = reels;
    const resultDiv = document.getElementById("result");

    let reaction = "";

    if (a === b && b === c) {
        updateMood(true);
        reaction = pick(reactions.win);
    } else if (a === b || b === c || a === c) {
        updateMood(false);
        reaction = pick(reactions.near);
    } else {
        updateMood(false);
        reaction = pick(reactions.lose);
    }

    // Append mood commentary
    reaction += "<br><span style='opacity:0.7; font-size:0.9em'>" + pick(reactions.moodShift[mood]) + "</span>";

    resultDiv.innerHTML = reaction;
}

// Spin logic
document.getElementById("spin-btn").addEventListener("click", () => {
    const reels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];

    // Render symbols
    document.getElementById("reel1").textContent = reels[0];
    document.getElementById("reel2").textContent = reels[1];
    document.getElementById("reel3").textContent = reels[2];

    // AI evaluation
    evaluate(reels);
});
