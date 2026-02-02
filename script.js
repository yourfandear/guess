const arena = document.getElementById("arena");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const q = document.getElementById("q");
const msgEl = document.getElementById("msg");
const gif = document.getElementById("gif");

const final = document.getElementById("final");
const copy = document.getElementById("copy");
const again = document.getElementById("again");
const finalGif = document.getElementById("finalGif");

const enterScreen = document.getElementById("enterScreen");
const bgMusic = document.getElementById("bgMusic");

let attempts = 0;
let runningMode = false;
let yesLocked = false;

const msgs = [
  "NO button is shy 🙈",
  "Arre yaar 😭",
  "Stop teasing 😤",
  "Okay last chance 🥺👉👈",
  "You’re testing me 😵‍💫",
  "Just click YES 😂",
  "I’m not allowing NO 😈"
];

// GIF sequence (inside modal)
const CAT_NEAR_SCREEN = "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif";
const PEOPLE_DANCING  = "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif";
const CAT_PLAY_MS = 3000;

// Preload gifs
(function preloadAll(){
  const a = new Image(); a.src = CAT_NEAR_SCREEN;
  const b = new Image(); b.src = PEOPLE_DANCING;
})();

// Tap screen starts music (loop already in HTML)
enterScreen.addEventListener("click", () => {
  bgMusic.volume = 0.7;
  bgMusic.play().catch(() => {});
  enterScreen.classList.add("hidden");
});

// Default message line
msgEl.textContent = "Click yes 💗";

function resetNoVisible() {
  runningMode = false;
  no.classList.remove("run");
  no.style.left = "";
  no.style.top = "";
}

function moveNoInsideArena() {
  if (!runningMode) {
    runningMode = true;
    no.classList.add("run");
  }

  const pad = 10;
  const arenaRect = arena.getBoundingClientRect();

  const btnW = no.offsetWidth;
  const btnH = no.offsetHeight;

  const maxX = arenaRect.width - btnW - pad;
  const maxY = arenaRect.height - btnH - pad;

  const x = pad + Math.random() * Math.max(pad, maxX);
  const y = pad + Math.random() * Math.max(pad, maxY);

  no.style.left = `${x}px`;
  no.style.top = `${y}px`;
}

function popConfetti() {
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.65 } });
}

function growYes() {
  const current = Number(getComputedStyle(yes).fontSize.replace("px",""));
  yes.style.fontSize = `${Math.min(current + 2, 30)}px`;
  yes.style.transform = "scale(1.03)";
  setTimeout(() => (yes.style.transform = ""), 140);
}

// NO trolling (messages go to the TOP line now)
["mouseenter", "mousedown", "touchstart", "click"].forEach(evt => {
  no.addEventListener(evt, (e) => {
    e.preventDefault();
    attempts++;

    msgEl.textContent = msgs[Math.min(attempts - 1, msgs.length - 1)];
    growYes();
    moveNoInsideArena();
  }, { passive: false });
});

// YES → modal + cat→dance
yes.addEventListener("click", () => {
  if (yesLocked) return;
  yesLocked = true;

  msgEl.textContent = "YAYYYY 💖";
  q.textContent = "Will you be my Valentine? 💖";

  final.classList.remove("hidden");
  finalGif.src = CAT_NEAR_SCREEN;
  popConfetti();

  setTimeout(() => {
    finalGif.src = PEOPLE_DANCING;
    popConfetti();
    setTimeout(() => popConfetti(), 250);
  }, CAT_PLAY_MS);
});

copy.addEventListener("click", async () => {
  const msg = "She said YES 😭💖 Happy Valentine’s! 🥰";
  try {
    await navigator.clipboard.writeText(msg);
    copy.textContent = "Copied ✅";
    setTimeout(() => (copy.textContent = "Copy Cute Message 💬"), 1200);
  } catch {
    alert(msg);
  }
});

again.addEventListener("click", () => {
  attempts = 0;
  msgEl.textContent = "Cutie💗";
  q.textContent = "Will you be my Valentine? 💖";

  yes.style.fontSize = "18px";
  gif.src = "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif";
  finalGif.src = CAT_NEAR_SCREEN;

  final.classList.add("hidden");
  resetNoVisible();
  yesLocked = false;
});
