const API = "https://btc-edge-ai-1.onrender.com/stats";

async function loadStats() {
    try {

        const res = await fetch(API);
        const data = await res.json();

        updateCard(1, data.one);
        updateCard(3, data.three);
        updateCard(5, data.five);
        updateCard(10, data.ten);

        updatePrediction(1, data.one);
        updatePrediction(3, data.three);
        updatePrediction(5, data.five);
        updatePrediction(10, data.ten);

    } catch (e) {
        console.log(e);
    }
}

function updateCard(min, d) {

    document.getElementById("buy" + min).innerHTML =
        "$" + Math.round(d.buyVolume).toLocaleString();

    document.getElementById("sell" + min).innerHTML =
        "$" + Math.round(d.sellVolume).toLocaleString();

    const delta = document.getElementById("delta" + min);

    delta.innerHTML =
        "$" + Math.round(d.delta).toLocaleString();

    delta.style.color =
        d.delta >= 0 ? "#00ff66" : "#ff3b3b";

    document.getElementById("buyPercent" + min).innerHTML =
        d.buyPercent.toFixed(1) + "%";

    document.getElementById("sellPercent" + min).innerHTML =
        d.sellPercent.toFixed(1) + "%";
}

function updatePrediction(min, d) {

    const id = document.getElementById("prediction" + min);

    if (!id) return;

    if (d.buyPercent > 60)
        id.innerHTML = "🟢 BUY";

    else if (d.sellPercent > 60)
        id.innerHTML = "🔴 SELL";

    else
        id.innerHTML = "🟡 WAIT";
}

loadStats();

setInterval(loadStats, 1000);
