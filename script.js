const playBtn = document.getElementById("playBtn");
const historyBtn = document.getElementById("historyBtn");
const animationBox = document.getElementById("animation");
const historyDiv = document.getElementById("history");

// Parse pasted WhatsApp data
function parseData(text){
  let lines = text.split(/\n/).map(l=>l.trim()).filter(l=>l);
  let data = [], market="", date="";
  lines.forEach(line=>{
    if(line.match(/^\d{2}[._]\d{2}[._]?\d{4}$/)){date=line;} // date line
    else if(!line.includes(":")){market=line;} // market line
    else{
      let parts=line.split(":");
      let item=parts[0].trim();
      let prices=parts[1].split("-").map(p=>Number(p.replace(/\D/g,"")));
      if(prices.length===2){
        data.push({market,date,item,old:prices[0],new:prices[1]});
      }
    }
  });
  return data;
}

// Display animated items
function displayAnimation(data){
  animationBox.innerHTML = "";
  data.forEach((entry,index)=>{
    setTimeout(()=>{
      let status="➖", cls="";
      if(entry.new > entry.old){status="🔼 Increase"; cls="up";}
      else if(entry.new < entry.old){status="🔽 Decrease"; cls="down";}
      const div = document.createElement("div");
      div.className="item-box animate-row";
      div.innerHTML = `
        <div class="item-data">
          <span><b>Market:</b> ${entry.market}</span>
          <span><b>Date:</b> ${entry.date}</span>
          <span><b>Item:</b> ${entry.item}</span>
          <span><b>Old:</b> ${entry.old}</span>
          <span><b>New:</b> ${entry.new}</span>
          <span class="${cls}"><b>Status:</b> ${status}</span>
        </div>
        <div class="menu">
          <span class="menu-btn" onclick="toggleMenu(this)">⋮</span>
          <div class="menu-content">
            <button onclick="deleteEntry('${entry.market}','${entry.item}','${entry.date}')">Delete</button>
            <button onclick="deleteAllHistory()">Delete All History</button>
          </div>
        </div>
      `;
      animationBox.appendChild(div);
    }, index*700);
  });
}

// Menu toggle
function toggleMenu(elem){
  const menu = elem.nextElementSibling;
  menu.style.display = (menu.style.display==="block")?"none":"block";
}

// Delete item
function deleteEntry(market,item,date){
  const boxes = animationBox.getElementsByClassName("item-box");
  for(let box of boxes){
    let spans = box.querySelectorAll(".item-data span");
    if(spans[0].textContent.includes(market) &&
       spans[2].textContent.includes(item) &&
       spans[1].textContent.includes(date)){box.remove(); break;}
  }
}

// History
function saveHistory(data){
  let history = JSON.parse(localStorage.getItem("history"))||[];
  history.push(data);
  localStorage.setItem("history", JSON.stringify(history));
}

function showHistory(){
  let history = JSON.parse(localStorage.getItem("history"))||[];
  historyDiv.innerHTML = "";
  if(history.length===0){historyDiv.innerHTML="<p>No history found.</p>"; return;}
  historyDiv.innerHTML="<h3>📅 Daily History</h3>";
  history.slice().reverse().forEach((arr,idx)=>{
    arr.forEach(entry=>{
      const div=document.createElement("div");
      div.className="item-box";
      div.innerHTML = `
        <div class="item-data">
          <span><b>Market:</b> ${entry.market}</span>
          <span><b>Date:</b> ${entry.date}</span>
          <span><b>Item:</b> ${entry.item}</span>
          <span><b>Old:</b> ${entry.old}</span>
          <span><b>New:</b> ${entry.new}</span>
        </div>
        <div class="menu">
          <span class="menu-btn" onclick="toggleMenu(this)">⋮</span>
          <div class="menu-content">
            <button onclick="deleteHistoryEntry(${history.length-1-idx})">Delete</button>
            <button onclick="deleteAllHistory()">Delete All History</button>
          </div>
        </div>
      `;
      historyDiv.appendChild(div);
    });
  });
}

// Delete history entry
function deleteHistoryEntry(idx){
  let history = JSON.parse(localStorage.getItem("history"))||[];
  history.splice(idx,1);
  localStorage.setItem("history",JSON.stringify(history));
  showHistory();
}

// Delete all history
function deleteAllHistory(){
  if(confirm("Delete all history?")){
    localStorage.removeItem("history");
    historyDiv.innerHTML="<p>All history deleted.</p>";
    animationBox.innerHTML="";
  }
}

// Play button
playBtn.addEventListener("click",()=>{
  const text = document.getElementById("input").value.trim();
  if(!text){alert("Paste WhatsApp data!"); return;}
  let parsed = parseData(text);
  if(parsed.length>0){
    displayAnimation(parsed);
    saveHistory(parsed);
  } else { alert("No valid data found!"); }
});

// History button
historyBtn.addEventListener("click", showHistory);
