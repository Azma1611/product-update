function playVideo() {
  const text = document.getElementById("input").value.trim();
  if (!text) return;

  saveToHistory(text);

  const lines = text.split("\n");
  const tbody = document.getElementById("result");
  tbody.innerHTML = "";

  lines.forEach((line, index) => {
    setTimeout(() => {
      const parts = line.split(",");
      if (parts.length === 3) {
        const item = parts[0];
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

        const row = document.createElement("tr");
        row.className = "row";
        row.innerHTML = `
          <td>${item}</td>
          <td>${oldVal}</td>
          <td>${newVal}</td>
          <td class="${cls}">${status}</td>
        `;
        tbody.appendChild(row);
      }
    }, index * 800);
  });
}

// SAVE DAILY DATA
function saveToHistory(text) {
  const today = new Date().toLocaleDateString();
  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.push({
    date: today,
    data: text
  });

  localStorage.setItem("history", JSON.stringify(history));
}

// SHOW HISTORY
function showHistory() {
  const historyDiv = document.getElementById("history");
  let history = JSON.parse(localStorage.getItem("history")) || [];

  if (history.length === 0) {
    historyDiv.innerHTML = "<p>No history found</p>";
  } else {
    historyDiv.innerHTML = "<h3>📅 Daily History</h3>";

    history.reverse().forEach(entry => {
      historyDiv.innerHTML += `
        <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
          <b>${entry.date}</b>
          <pre>${entry.data}</pre>
        </div>
      `;
    });
  }

  historyDiv.style.display = "block";

  .delete-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background: #e53935;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
}

.delete-entry-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
}

