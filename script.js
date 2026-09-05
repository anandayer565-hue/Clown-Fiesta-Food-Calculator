const foods = [

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

const foodGrid=document.getElementById("foodGrid");

let html="";

foods.forEach((food,index)=>{

html+=`
<div class="card ${food.stat}">

<div class="food-name">
${food.name}
</div>

<div class="food-buff">
${food.buff}
</div>

<div class="food-price">
${food.price.toLocaleString()} Zeny
</div>

<div class="qty">

<button onclick="changeQty(${index},-1)">-</button>

<div class="qty-value">
${food.qty}
</div>

<button onclick="changeQty(${index},1)">+</button>

</div>

</div>
`;

});

foodGrid.innerHTML=html;

updateSummary();

}

function changeQty(index,amount){

foods[index].qty=Math.max(
0,
foods[index].qty+amount
);

render();

}

function updateSummary(){

const summary=document.getElementById("orderSummary");

const totalBox=document.getElementById("grandTotal");

const player=
document.getElementById("playerName").value.trim()
||"Unknown";

let total=0;

let html=`<b>Player:</b> ${player}<br><br>`;

let hasItems=false;

foods.forEach(food=>{

if(food.qty>0){

hasItems=true;

const cost=food.qty*food.price;

total+=cost;

html+=`
${food.name}
x ${food.qty}
=
${cost.toLocaleString()}
<br>
`;

}

});

if(!hasItems){

html=`<b>Player:</b> ${player}<br><br>No items selected`;

}

summary.innerHTML=html;

totalBox.innerText=
total.toLocaleString();

}

function copyOrder(){

const player=
document.getElementById("playerName").value.trim()
||"Unknown";

let total=0;

let text=
`🎪 CLOWN FIESTA FOOD ORDER

Player: ${player}

`;

foods.forEach(food=>{

if(food.qty>0){

const cost=
food.qty*food.price;

total+=cost;

text+=
`${food.name} x ${food.qty} = ${cost.toLocaleString()} Zeny
`;

}

});

text+=`
TOTAL: ${total.toLocaleString()} Zeny
`;

navigator.clipboard.writeText(text);

alert("Order copied!");

}

function resetAll(){

foods.forEach(food=>food.qty=0);

document.getElementById("playerName").value="";

render();

}

document
.getElementById("playerName")
?.addEventListener(
"input",
updateSummary
);

render();
