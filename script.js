  // saldo per far si che rimanga in memoria quello precedente
let saldo = localStorage.getItem("dipreCoin");

if(saldo===null){
    saldo=1000;
}else{
    saldo=parseInt(saldo);
}



function update(){

document.getElementById("saldo").innerText=saldo;

/* salva automaticamente */
localStorage.setItem("dipreCoin",saldo);

}




/* BONUS 1234 */
function openBonus(){
bonusBox.style.display="block";
bonusCode.value="";
bonusMsg.innerText="";
}

function closeBonus(){
bonusBox.style.display="none";
bonusCode.value="";
bonusMsg.innerText="";
}

function checkBonus(){
let code=document.getElementById("bonusCode").value;

if(code==="1234"){
saldo+=100;
update();
bonusMsg.innerText="+100 Diprè Coin";
}else{
bonusMsg.innerText="Codice errato";
}
}

/* GAME */
function openGame(id){
document.getElementById(id).style.display="block";
if(id==="bj") newHand();
}

function closeGame(){
document.querySelectorAll(".game").forEach(g=>g.style.display="none");

betBJ.value="";
betR.value="";
num.value="";
color.value="";
betS.value="";
bjResult.innerText="";
rResult.innerText="";
sResult.innerText="";
}

/* Bblackjack carte */
let p=[],d=[];

const semi=["♠","♥","♦","♣"];
const valori=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

function card(){

let valore=valori[Math.floor(Math.random()*valori.length)];
let seme=semi[Math.floor(Math.random()*semi.length)];

return{
show:valore+seme,
value:valore
};

}

function valoreMano(mano){

let totale=0;
let assi=0;

mano.forEach(c=>{

if(c.value==="A"){
totale+=11;
assi++;
}
else if(
c.value==="J"||
c.value==="Q"||
c.value==="K"
){
totale+=10;
}
else{
totale+=parseInt(c.value);
}

});

while(totale>21 && assi>0){
totale-=10;
assi--;
}

return totale;

}

function draw(){

player.innerHTML=
p.map(c=>
`<div class="carta">${c.show}</div>`
).join("");

dealer.innerHTML=
d.map(c=>
`<div class="carta">${c.show}</div>`
).join("");

}

function newHand(){

let bet=parseInt(betBJ.value);

if(isNaN(bet)||bet<=0){
bjResult.innerText="Inserisci puntata valida";
return;
}

p=[card(),card()];
d=[card(),card()];

draw();

bjResult.innerText=
"Tuo totale: "+
valoreMano(p);

}

function hit(){

p.push(card());

draw();

let totale=valoreMano(p);

if(totale>21){

saldo-=parseInt(betBJ.value);

update();

bjResult.innerText=
"Sballato! Hai perso";

}

else{

bjResult.innerText=
"Tuo totale: "+totale;

}

}

function stand(){

while(valoreMano(d)<17){
d.push(card());
}

draw();

let ps=valoreMano(p);
let ds=valoreMano(d);

let bet=parseInt(betBJ.value);

if(ds>21 || ps>ds){

saldo+=bet;

bjResult.innerText=
"Hai vinto | Tu:"+ps+
" Banco:"+ds;

}
else if(ps<ds){

saldo-=bet;

bjResult.innerText=
"Hai perso | Tu:"+ps+
" Banco:"+ds;

}
else{

bjResult.innerText=
"Pareggio";

}

update();

setTimeout(()=>{
newHand();
},1500);

}

/* Roulette valori */
function spin(){
let bet=parseInt(betR.value);
let n=parseInt(num.value);
let c=color.value.toLowerCase();

let r=Math.random()*10|0;
let col=["rosso","nero"][Math.random()*2|0];

if(n===r)saldo+=bet*5;
else if(c===col)saldo+=bet*2;
else saldo-=bet;

rResult.innerText=r+" "+col;
update();
}

/* Slot valori */
function spinSlot(){

let bet=parseInt(betS.value);
if(isNaN(bet))return;

let sym=["🍒","🍋","🔔","⭐"];

let t=setInterval(()=>{
s1.innerText=sym[Math.random()*4|0];
s2.innerText=sym[Math.random()*4|0];
s3.innerText=sym[Math.random()*4|0];
},80);

setTimeout(()=>{
clearInterval(t);

if(s1.innerText===s2.innerText&&s2.innerText===s3.innerText){
saldo+=bet*5;
sResult.innerText="WIN";
}else{
saldo-=bet;
sResult.innerText="LOSE";
}

update();
},1200);

}

update();
