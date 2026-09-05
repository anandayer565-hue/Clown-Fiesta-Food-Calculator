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

function render() {
    const foodGrid = document.getElementById('foodGrid');

    if (!foodGrid) return;

    foodGrid.innerHTML = '';

    foods.forEach((food, index) => {
        foodGrid.innerHTML += `
            <div class="card ${food.stat}">
                <div class="food-name">${food.name}</div>
                <div class="food-buff">${food.buff}</div>
                <div class="food-price">${food.price.toLocaleString()} Zeny</div>

                <div class="qty">
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <span class="qty-value">${food.qty}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    updateSummary();
}

function changeQty(index, amount) {
    foods[index].qty = Math.max(0, foods[index].qty + amount);
    render();
}

function updateSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const grandTotal = document.getElementById('grandTotal');
    const playerNameField = document.getElementById('playerName');

    let total = 0;
    let summaryHtml = '';

    const playerName =
        playerNameField && playerNameField.value.trim()
            ? playerNameField.value.trim()
            : 'Unknown';

    summaryHtml += `
        <div style="margin-bottom:15px;">
            <strong>Player:</strong> ${playerName}
        </div>
    `;

    let hasItems = false;

    foods.forEach(food => {
        if (food.qty > 0) {
            hasItems = true;

            const cost = food.qty * food.price;
            total += cost;

            summaryHtml += `
                <div style="margin-bottom:6px;">
                    ${food.name} x ${food.qty}
                </div>
            `;
        }
    });

    if (!hasItems) {
        summaryHtml += 'No items selected';
    }

    orderSummary.innerHTML = summaryHtml;
    grandTotal.innerText = total.toLocaleString();
}

function copyOrder() {
    const playerNameField = document.getElementById('playerName');

    const playerName =
        playerNameField && playerNameField.value.trim()
            ? playerNameField.value.trim()
            : 'Unknown';

    let total = 0;

    let text =
`🎪 Clown Fiesta Food Order

Player: ${playerName}

`;

    foods.forEach(food => {
        if (food.qty > 0) {
            text += `${food.name} x ${food.qty}\n`;
            total += food.qty * food.price;
        }
    });

    text += `\n💰 Total: ${total.toLocaleString()} Zeny`;

    navigator.clipboard.writeText(text)
        .then(() => {
            alert('Order copied to clipboard!');
        })
        .catch(() => {
            alert('Failed to copy order.');
        });
}

function resetAll() {
    foods.forEach(food => {
        food.qty = 0;
    });

    const playerNameField = document.getElementById('playerName');
    if (playerNameField) {
        playerNameField.value = '';
    }

    render();
}

document.addEventListener('DOMContentLoaded', () => {
    const playerNameField = document.getElementById('playerName');

    if (playerNameField) {
        playerNameField.addEventListener('input', updateSummary);
    }

    render();
});
