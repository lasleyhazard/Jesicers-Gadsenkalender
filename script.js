document.addEventListener('DOMContentLoaded', function() {

const calendar = document.getElementById('calendar');
const openCountDisplay = document.getElementById('openCount');
const doorOpenSound = new Audio('magic-whoosh.wav');
doorOpenSound.volume = 0.6;

// Geschenke-Liste (nach Tausch: Tür 4 = WM BRE, Tür 20 = Bälle)
const gifts = [
  "Yogi Tee",        // 1
  "Kleine Kerze",    // 2
  "Süßigkeit",       // 3
  "WM BRE /",        // 4   <-- war vorher Bälle
  "Shampoo",         // 5
  "an.Schläge /",    // 6
  "Süßigkeit",       // 7
  "Plätzchen /",     // 8
  "WM OL /",         // 9
  "Süßigkeit",       // 10
  "EEETCafe /",      // 11
  "Proteinriegel",   // 12
  "Süßigkeit",       // 13
  "Bluumen",         // 14
  "an.Schläge /",    // 15
  "Süßigkeit",       // 16
  "Film Wahl /",     // 17
  "Selbstgemaltes ", // 18
  "Süßigkeit",       // 19
  "Bälle",           // 20  <-- war vorher WM BRE
  "Gewürze",         // 21
  "Proteinriegel",   // 22
  "Massage /",       // 23
  "an.Schläge /"     // 24
];

// Texte ebenfalls getauscht (4 und 20)
const giftMessages = [
  "Viel Wärme mit deinem Yogi Tee zum gemütlichen Winterstart!",                                // 1
  "Eine kleine Kerze für Guschellicht.",                                                        // 2
  "Gadse muss eety sein!",                                                                      // 3
  "Auch in Bremen warten Leckereien darauf, von Gadsen verschlungen zu werden! Gutschein für einen Besuch des Weihnachtsmarktes in Bremen inklusive EET", // 4 (früher 20)
  "Neuer Gadsenduft",                                                                           // 5
  "Männerhass fördern mit dieser Wiener Zeitschrift",                                           // 6
  "Feinster Weihnachts-Eet!",                                                                   // 7
  "Lass uns kleine Bören backen! Gutschein für eine urliebe Backsession mit einem Rakk deiner Wahl", // 8
  "Ich hörte, auf dem Lambertimarkt gäbe es Eety-Things. Such dir das Beste aus und genieße auf Kosten eines Rakks deiner Wahl!", // 9
  "Eetkalender",                                                                                // 10
  "Gutschein für einen Besuch im Eetcafé! Lass uns zusammen eine urgemütliche Zeit bei einem Heißgetränk haben!", // 11
  "Gadsen brauchen Kraft und Energie",                                                          // 12
  "Und Gadsen brauchen süßen EET",                                                              // 13
  "Eine duftende Überraschung",                                                                 // 14
  "Männer kann man nie genug hassen...",                                                        // 15
  "Süßes, falls die Vorräte schon leer sind",                                                   // 16
  "Du bestimmst, welcher Film läuft! Gutschein für einen verguschelten Filmeabend mit einem Rakk deiner Wahl!", // 17
  "Es war einmal ein Rakk, der einen STift in die Pfote nahm...",                               // 18
  "Belly muss full sein",                                                                       // 19
  "Balls, Balls, Balls",                                                                        // 20 (früher 4)
  "Würziger Würzspaß",                                                                          // 21
  "Ich habe eine starke Gadse",                                                                 // 22
  "Gadsen müssen gestreichelt werden! Und unter Vorlage dieses Gutscheins müssen sie sogar von einem Rakk deiner Wahl massiert werden!", // 23
  "Auch der Weihnachtsmann kann sein Geschlecht am heutigen tage nicht vor dem Hass schützen"   // 24
];

let openDoors = Array(24).fill(false);

const giftModal = document.getElementById('giftModal');
const giftTextElement = document.getElementById('giftText');
const closeModalBtn = document.getElementById('closeModalBtn');

// Fade-In
function openGiftModal() {
  clearTimeout(giftModal._fadeOutTimeout);
  giftModal.classList.remove('hidden');
  giftModal.style.opacity = '0';
  void giftModal.offsetWidth;
  setTimeout(() => {
    giftModal.style.opacity = '1';
  }, 10);
}

// Fade-Out
function closeGiftModal() {
  giftModal.style.opacity = '0';
  giftModal._fadeOutTimeout = setTimeout(() => {
    giftModal.classList.add('hidden');
  }, 1300);
}

closeModalBtn.addEventListener('click', closeGiftModal);
giftModal.addEventListener('click', (event) => {
  if (event.target === giftModal) closeGiftModal();
});

// Türchen erzeugen
for (let i = 0; i < 24; i++) {
  const door = document.createElement('div');
  door.className = 'door interactive';
  door.textContent = i + 1;

  const cat = document.createElement('span');
  cat.className = 'cat';
  const catEmojis = ["😺", "😸", "😻", "😼"];
  cat.textContent = catEmojis[i % catEmojis.length];
  door.appendChild(cat);

  door.addEventListener('click', () => {
    doorOpenSound.currentTime = 0;
    doorOpenSound.play();
    giftTextElement.textContent = giftMessages[i] || "Überraschung!";
    openGiftModal();
    openDoors[i] = true;
    updateOpenCount();
    door.classList.add('open');
  });

  calendar.appendChild(door);
}

function updateOpenCount() {
  const count = openDoors.filter(Boolean).length;
  openCountDisplay.textContent = count;
}
updateOpenCount();

});
