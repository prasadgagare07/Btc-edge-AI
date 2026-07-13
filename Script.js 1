// ===== BTC EDGE =====

// Live trade storage
let trades = [];

// HTML Elements
const price = document.getElementById("price");
const tradesDiv = document.getElementById("trades");

// Binance Futures Trade Stream
const ws = new WebSocket(
"wss://fstream.binance.com/ws/btcusdt@trade"
);

ws.onmessage = (event)=>{

const data = JSON.parse(event.data);

// Price
const p = Number(data.p);

// Quantity
const q = Number(data.q);

// USD Value
const usd = p*q;

// Seller is maker?
const sell = data.m;

price.innerHTML="$"+p.toLocaleString();

// Store trade

trades.push({

time:Date.now(),

price:p,

qty:q,

usd:usd,

sell:sell

});

// Remove trades older than 10 min

const now=Date.now();

trades=trades.filter(t=>now-t.time<600000);

// Add trade to tape

const row=document.createElement("div");

row.className="trade "+(sell?"sell":"buy");

row.innerHTML=
`
<span>${sell?"🔴 SELL":"🟢 BUY"}</span>
<span>$${usd.toLocaleString(undefined,{maximumFractionDigits:0})}</span>
`;

tradesDiv.prepend(row);

// Keep only last 100 rows

while(tradesDiv.children.length>100){

tradesDiv.removeChild(
tradesDiv.lastChild
);

}

}
