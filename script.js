// ELEMENTS
const playBtn = document.getElementById("playBtn");
const historyBtn = document.getElementById("historyBtn");
const animationBox = document.getElementById("animation");
const historyDiv = document.getElementById("history");

// PLAY BUTTON CLICK
playBtn.addEventListener("click", () => {
  const text = document.getElementById("input").value.trim();
  if (!text) return alert("Please paste data first.");

  saveToHistory(text);
  playAnimation(text);
});

// VIEW HISTORY BUTTON CLICK
historyBtn.addEventListener("click", showHistory);

// ANIMATION FUNCTION
function playAnimation(text) {
  animationBox.innerHTML = "";
  const lines = text.split("\n");

  lines.forEach((line, index) => {
    setTimeout(() => {
      const parts = line.split(",");
      if (parts.length === 3) {
        const item = parts[0].trim();
        const oldVal = Number(parts[1]);
        const newVal = Number(parts[2]);

        let status = "➖";
        let cls = "";

        if (newVal > oldVal) {
          status = "🔼 Increase";
          cls = "up";
        } else if (newVal < oldVal) {
          status = "🔽 Decrease";
          cls = "down";
        }

        const div = document.createElement("div");
        div.className = "item-box animate-row";
        div.innerHTML = `
          <div class="item-data">
            <span><b>Item:</b> ${item}</span>
            <span><b>Old:</b> ${oldVal}</span>
            <span><b>New:</b> ${newVal}</span>
            <span class="${cls}"><b>Status:</b> ${status}</span>
          </div>
          <div class="menu">
            <span class="menu-btn" onclick="toggleMenu(this)">⋮</span>
            <div class="menu-content">
              <button onclick="deleteEntry('${item}')">Delete</button>
              <button onclick="deleteAllHistory()">Delete All History</button>
            </div>
          </div>
        `;
        animationBox.appendChild(div);
      }
    }, index * 800);
  });
}

// MENU TOGGLE
function toggleMenu(element) {
  const menu = element.nextElementSibling;
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// SAVE TO LOCALSTORAGE
function saveToHistory(text) {
  const today = new Date().toLocaleDateString();
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push({ date: today, data: text });
  localStorage.setItem("history", JSON.stringify(history));
}

// SHOW HISTORY
function showHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  historyDiv.innerHTML = "";

  if (history.length === 0) {
    historyDiv.innerHTML = "<p>No history found.</p>";
    return;
  }

  historyDiv.innerHTML = "<h3>📅 Daily History</h3>";

  history.slice().reverse().forEach((entry, index) => {
    historyDiv.innerHTML += `
      <div class="item-box">
        <div class="item-data">
          <span><b>Date:</b> ${entry.date}</span>
          <pre>${entry.data}</pre>
        </div>
        <div class="menu">
          <span class="menu-btn" onclick="toggleMenu(this)">⋮</span>
          <div class="menu-content">
            <button onclick="deleteHistoryEntry(${history.length - 1 - index})">Delete</button>
            <button onclick="deleteAllHistory()">Delete All History</button>
          </div>
        </div>
      </div>
    `;
  });
}

// DELETE SINGLE HISTORY ENTRY
function deleteHistoryEntry(index) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.splice(index, 1);
  localStorage.setItem("history", JSON.stringify(history));
  showHistory();
}

// DELETE ALL HISTORY
function deleteAllHistory() {
  if (confirm("Delete all history? This cannot be undone.")) {
    localStorage.removeItem("history");
    historyDiv.innerHTML = "<p>All history deleted.</p>";
    animationBox.innerHTML = "";
  }
}

// DELETE ENTRY FROM ANIMATION
function deleteEntry(itemName) {
  const boxes = animationBox.getElementsByClassName("item-box");
  for (let box of boxes) {
    if (box.querySelector(".item-data span").textContent.includes(itemName)) {
      box.remove();
      break;
    }
  }
}
