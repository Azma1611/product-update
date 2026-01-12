const places = [
  "PERUNDURAI REGULATED MARKET",
  "ERODE REGULATED MARKET",
  "ERODE SOCIETY"
];

const storeKey = {
  "PERUNDURAI REGULATED MARKET": "p_data",
  "ERODE REGULATED MARKET": "e_data",
  "ERODE SOCIETY": "s_data"
};

document.getElementById("btn").onclick = process;

function process() {
  const text = document.getElementById("pasteData").value;
  if (!text.trim()) return alert("Paste data");

  document.getElementById("output").innerHTML = "";

  places.forEach(place => {
    if (text.includes(place)) {
      const block = extractBlock(text, place);
      render(place, block);
    }
  });

  document.getElementById("pasteData").value = "";
}

function extractBlock(text, place) {
  const start = text.indexOf(place);
  let end = text.length;

  places.forEach(p => {
    if (p !== place) {
      const i = text.indexOf(p, start + 1);
      if (i !== -1 && i < end) end = i;
    }
  });

  return text.substring(start, end).trim();
}

function render(place, block) {
  const div = document.createElement("div");
  div.className = "place";
  div.innerHTML = `<h3>${place}</h3>`;

  const old = JSON.parse(localStorage.getItem(storeKey[place]) || "{}");
  const now = {};

  block.split("\n").forEach(line => {
    const clean = line.replace(/[*]/g, "").trim();

    const m = clean.match(/(Finger|Bulb).*?(\d+)\s*-\s*(\d+)/i);
    if (m) {
      const type = m[1];
      const max = Number(m[3]);
      const prev = old[type] || 0;

      let arrow = "—";
      let cls = "";
      if (max > prev) { arrow = "↑"; cls = "up"; }
      else if (max < prev) { arrow = "↓"; cls = "down"; }

      now[type] = max;
      div.innerHTML += `<p>${clean} <span class="${cls}">${arrow}</span></p>`;
    } else if (clean) {
      div.innerHTML += `<p>${clean}</p>`;
    }
  });

  localStorage.setItem(storeKey[place], JSON.stringify(now));
  document.getElementById("output").appendChild(div);
}
