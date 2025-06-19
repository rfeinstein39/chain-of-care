const cards = [
  { id: 1, text: "Patient presents with chest pain", next: [2] },
  { id: 2, text: "Initial ED Evaluation", next: [3] },
  { id: 3, text: "ECG Interpretation", next: [4, 5] },
  { id: 4, text: "STEMI Path", next: [6] },
  { id: 5, text: "NSTEMI/UA Path", next: [7] },
  { id: 6, text: "Cath Lab Activation", next: [8] },
  { id: 7, text: "Risk Stratification", next: [8] },
  { id: 8, text: "Medical Therapy", next: [] }
];

let deck = [...cards];
let hand = [];
let table = [];
let score = 0;

const deckEl = document.getElementById("deck");
const handEl = document.getElementById("hand");
const tableEl = document.getElementById("table");
const scoreboard = document.getElementById("scoreboard");

function update() {
  handEl.innerHTML = "";
  tableEl.innerHTML = "";
  scoreboard.textContent = "Score: " + score;

  hand.forEach(card => {
    const el = document.createElement("div");
    el.className = "card";
    el.textContent = card.text;
    el.onclick = () => playCard(card.id);
    handEl.appendChild(el);
  });

  table.forEach(card => {
    const el = document.createElement("div");
    el.className = "card";
    el.textContent = card.text;
    tableEl.appendChild(el);
  });
}

deckEl.onclick = () => {
  if (deck.length > 0) {
    const card = deck.pop();
    hand.push(card);
    update();
  }
};

function playCard(cardId) {
  const card = hand.find(c => c.id === cardId);
  const canLink = table.length === 0 || table.some(tc => tc.next.includes(card.id));

  if (canLink) {
    table.push(card);
    hand = hand.filter(c => c.id !== cardId);
    score += 2;
  } else {
    score -= 2;
    alert("Incorrect link!");
  }

  update();

  if (deck.length === 0 && hand.length === 0) {
    alert("🎉 Game over! Final Score: " + score);
  }
}

update();