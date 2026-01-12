// Place names
const places = [
    "PERUNDURAI REGULATED MARKET",
    "Erode Regulated Market",
    "ERODE SOCIETY"
];

// Keys for LocalStorage
const storageKeys = {
    "PERUNDURAI REGULATED MARKET": "perundurai_data",
    "Erode Regulated Market": "erode_market_data",
    "ERODE SOCIETY": "erode_society_data"
};

// Process pasted data
function processData() {
    const rawData = document.getElementById("pasteData").value;
    if(!rawData.trim()) { alert("Paste some data!"); return; }

    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
    places.forEach(place => {
        let regex = new RegExp(place + "[\\s\\S]*?(?=" + places.filter(p=>p!==place).join("|") + "|$)", "i");
        let match = rawData.match(regex);
        if(match) {
            let blockText = match[0].trim();
            displayPlaceData(place, blockText);
        }
    });
    document.getElementById("pasteData").value = "";
}

// Display data for one place
function displayPlaceData(place, text) {
    const outputDiv = document.getElementById("output");
    let section = document.createElement("div");
    section.className = "place-section";
    let h2 = document.createElement("h2");
    h2.innerText = place;
    section.appendChild(h2);

    let lines = text.split(/\r?\n/);
    let oldData = JSON.parse(localStorage.getItem(storageKeys[place]) || "{}");
    let newData = {};

    lines.forEach(line=>{
        let cleanLine = line.replace(/[*]/g,"").trim();
        let priceMatch = cleanLine.match(/(Finger|Bulb)\s*[:.]?\s*(\d+)\s*-\s*(\d+)/i);
        if(priceMatch){
            let type = priceMatch[1];
            let minPrice = parseInt(priceMatch[2]);
            let maxPrice = parseInt(priceMatch[3]);
            let oldMax = oldData[type] || 0;
            let arrow = "";
            if(maxPrice > oldMax) arrow = " ↑"; 
            else if(maxPrice < oldMax) arrow = " ↓"; 
            else arrow = " —";
            newData[type] = maxPrice;

            let p = document.createElement("p");
            p.className = "price-line";
            p.innerHTML = `${type} : ${minPrice} – ${maxPrice} <span class="${arrow.includes("↑")?"arrow-up":arrow.includes("↓")?"arrow-down":""}">${arrow}</span>`;
            section.appendChild(p);
        } else {
            if(cleanLine) {
                let p = document.createElement("p");
                p.className = "price-line";
                p.innerText = cleanLine;
                section.appendChild(p);
            }
        }
    });

    localStorage.setItem(storageKeys[place], JSON.stringify(newData));
    outputDiv.appendChild(section);
}
