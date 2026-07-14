// ===== Market Activity =====

function updateStats(minutes){

const now=Date.now();

const start=now-(minutes*60*1000);

const list=trades.filter(t=>t.time>=start);

let buyVolume=0;
let sellVolume=0;

let buyTrades=0;
let sellTrades=0;

list.forEach(t=>{

if(t.sell){

sellVolume+=t.usd;
sellTrades++;

}else{

buyVolume+=t.usd;
buyTrades++;

}

});

const total=buyVolume+sellVolume;

const buyPercent=total?((buyVolume/total)*100):0;
const sellPercent=total?((sellVolume/total)*100):0;

const delta=buyVolume-sellVolume;

// Update HTML

document.getElementById("buy"+minutes).innerHTML=
"$"+buyVolume.toLocaleString(undefined,{maximumFractionDigits:0});

document.getElementById("sell"+minutes).innerHTML=
"$"+sellVolume.toLocaleString(undefined,{maximumFractionDigits:0});

const deltaElement=document.getElementById("delta"+minutes);

deltaElement.innerHTML=
"$"+delta.toLocale
