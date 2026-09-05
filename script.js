
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
const g=document.getElementById('foodGrid');
g.innerHTML='';
foods.forEach((f,i)=>{
g.innerHTML+=`<div class="card ${f.stat}">
<b>${f.name}</b><br>${f.buff}<br>${f.price.toLocaleString()} Zeny
<div class="qty">
<button onclick="chg(${i},-1)">-</button>
<b>${f.qty}</b>
<button onclick="chg(${i},1)">+</button>
</div></div>`;
});
update();
}
function chg(i,v){foods[i].qty=Math.max(0,foods[i].qty+v);render();}
function update(){
let t=0,s='';
foods.forEach(f=>{if(f.qty){s+=`${f.name} x ${f.qty}<br>`;t+=f.qty*f.price;}});
document.getElementById('orderSummary').innerHTML=s||'No items selected';
document.getElementById('grandTotal').innerText=t.toLocaleString();
}
function copyOrder(){
let p=document.getElementById('playerName').value||'Unknown';
let t=0;
let txt=`🎪 Clown Fiesta Food Order\n\nPlayer: ${p}\n\n`;
foods.forEach(f=>{if(f.qty){txt+=`${f.name} x ${f.qty}\n`;t+=f.qty*f.price;}});
txt+=`\n💰 Total: ${t.toLocaleString()} Zeny`;
navigator.clipboard.writeText(txt);
alert('Copied!');
}
function resetAll(){foods.forEach(f=>f.qty=0);render();}
render();
