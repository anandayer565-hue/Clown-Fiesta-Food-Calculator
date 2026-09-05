
const foods=[
{name:"Bearfoot Special",buff:"STR +8",price:50703,stat:"str",qty:0},
{name:"Special Royal Jelly Herbal Tea",buff:"INT +7",price:52515,stat:"int",qty:0},
{name:"Dragon Breath Cocktail",buff:"INT +10",price:175875,stat:"int",qty:0},
{name:"Special Toast",buff:"DEX +8",price:83091,stat:"dex",qty:0},
{name:"Hwergelmir's Tonic",buff:"DEX +10",price:181461,stat:"dex",qty:0},
{name:"Steamed Alligator With Vegetable",buff:"AGI +7",price:55845,stat:"agi",qty:0},
{name:"Special Meat Stew",buff:"AGI +7",price:61512,stat:"agi",qty:0},
{name:"Sumptuous Feast",buff:"VIT +7",price:52518,stat:"vit",qty:0},
{name:"Strawberry Flavored Rice Ball",buff:"LUK +8",price:40608,stat:"luk",qty:0}
];

function render(){
const div=document.getElementById("foods");
div.innerHTML="";
foods.forEach((f,i)=>{
div.innerHTML+=`
<div class="food-card ${f.stat}">
<div class="row">
<div><b>${f.name}</b><br>${f.buff} - ${f.price.toLocaleString()}</div>
<div class="qty">
<button onclick="changeQty(${i},-1)">-</button>
<span>${f.qty}</span>
<button onclick="changeQty(${i},1)">+</button>
</div>
</div>
</div>`;
});
updateSummary();
}

function changeQty(i,v){
foods[i].qty=Math.max(0,foods[i].qty+v);
render();
}

function updateSummary(){
let total=0;
let txt="";
foods.forEach(f=>{
if(f.qty>0){
txt+=`${f.name} x ${f.qty}<br>`;
total+=f.qty*f.price;
}
});
document.getElementById("orderSummary").innerHTML=txt||"No items selected yet";
document.getElementById("grandTotal").innerText=total.toLocaleString();
}

function copyOrder(){
let player=document.getElementById("playerName").value||"Unknown";
let total=0;
let text=`🎪 Clown Fiesta Food Order\n\nPlayer: ${player}\n\n`;
foods.forEach(f=>{
if(f.qty>0){
text+=`${f.name} x ${f.qty}\n`;
total+=f.qty*f.price;
}
});
text+=`\n💰 Total: ${total.toLocaleString()} Zeny`;
navigator.clipboard.writeText(text);
alert("Order copied!");
}

function resetAll(){
foods.forEach(f=>f.qty=0);
render();
}

render();
