const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();

app.use(cors());

let trades = [];

function calculate(minutes) {
    const now = Date.now();
    const start = now - minutes * 60 * 1000;

    const list = trades.filter(t => t.time >= start);

    let buy = 0;
    let sell = 0;

    for (const t of list) {
        if (t.sell) {
            sell += t.usd;
        } else {
            buy += t.usd;
        }
    }

    const total = buy + sell;

    return {
        buyVolume: Math.round(buy),
        sellVolume: Math.round(sell),
        delta: Math.round(buy - sell),
        buyPercent: total ? ((buy / total) * 100).toFixed(2) : 0,
        sellPercent: total ? ((sell / total) * 100).toFixed(2) : 0
    };
}

function connect() {

    console.log("Connecting to Binance...");

    const ws = new WebSocket(
        "wss://fstream.binance.com/ws/btcusdt@trade"
    );

    ws.on("message", msg => {

        const data = JSON.parse(msg);

        const price = Number(data.p);
        const qty = Number(data.q);

        trades.push({
            time: Date.now(),
            usd: price * qty,
            sell: data.m
        });

        const now = Date.now();

        trades = trades.filter(
            t => now - t.time < 600000
        );

    });

    ws.on("close", () => {

        console.log("Reconnecting...");

        setTimeout(connect, 2000);

    });

    ws.on("error", () => {
        ws.close();
    });

}

connect();

app.get("/stats", (req, res) => {

    res.json({
        one: calculate(1),
        three: calculate
        five: calculate(5),
        ten: calculate(10)
    });

});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running...");
});
