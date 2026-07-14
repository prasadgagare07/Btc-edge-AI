function formatMoney(value) {
    return "$" + value.toLocaleString(undefined, {
        maximumFractionDigits: 0
    });
}

function updateStats(minutes) {

    const now = Date.now();
    const start = now - (minutes * 60 * 1000);

    const list = trades.filter(t => t.time >= start);

    let buyVolume = 0;
    let sellVolume = 0;

    list.forEach(t => {
        if (t.sell) {
            sellVolume += t.usd;
        } else {
            buyVolume += t.usd;
        }
    });

    const total = buyVolume + sellVolume;
    const delta = buyVolume - sellVolume;

    const buyPercent = total ? (buyVolume / total) * 100 : 0;
    const sellPercent = total ? (sellVolume / total) * 100 : 0;

    document.getElementById("buy" + minutes).textContent =
        formatMoney(buyVolume);

    document.getElementById("sell" + minutes).textContent =
        formatMoney(sellVolume);

    const deltaElement =
        document.getElementById("delta" + minutes);

    deltaElement.textContent = formatMoney(delta);

    if (delta > 0) {
        deltaElement.style.color = "#00ff66";
    } else if (delta < 0) {
        deltaElement.style.color = "#ff3b3b";
    } else {
        deltaElement.style.color = "#ffffff";
    }

    document.getElementById("buyPercent" + minutes).textContent =
        buyPercent.toFixed(1) + "%";

    document.getElementById("sellPercent" + minutes).textContent =
        sellPercent.toFixed(1) + "%";
}

setInterval(() => {

    updateStats(1);
    updateStats(3);
    updateStats(5);
    updateStats(10);

}, 1000);
