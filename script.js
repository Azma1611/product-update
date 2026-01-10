function playVideo() {
  const text = document.getElementById("input").value.trim();
  const lines = text.split("\n");
  const tbody = document.getElementById("result");

  tbody.innerHTML = ""; // clear old data

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
    }, index * 800); // delay = video effect
  });
}
