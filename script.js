const foods = [
    { name: "Bearfoot Special", buff: "STR +8", price: 50703 },
    { name: "Special Royal Jelly Herbal Tea", buff: "INT +7", price: 52515 },
    { name: "Dragon Breath Cocktail", buff: "INT +10", price: 175875 },
    { name: "Special Toast", buff: "DEX +8", price: 83091 },
    { name: "Hwergelmir's Tonic", buff: "DEX +10", price: 181461 },
    { name: "Steamed Alligator With Vegetable", buff: "AGI +7", price: 55845 },
    { name: "Special Meat Stew", buff: "AGI +7", price: 61512 },
    { name: "Sumptuous Feast", buff: "VIT +7", price: 52518 },
    { name: "Strawberry Flavored Rice Ball", buff: "LUK +8", price: 40608 }
];

const tableBody = document.getElementById("foodTable");
const grandTotal = document.getElementById("grandTotal");
const copyMessage = document.getElementById("copyMessage");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");

const formatZeny = (value) => `${value.toLocaleString("en-IN")} Zeny`;

function renderFoods() {
    tableBody.innerHTML = foods.map((food, index) => `
        <tr>
            <td>${food.name}</td>
            <td>${food.buff}</td>
            <td>${food.price.toLocaleString("en-IN")}</td>
            <td>
                <input
                    class="quantity"
                    type="number"
                    min="0"
                    step="1"
                    value="0"
                    data-index="${index}"
                    aria-label="Quantity for ${food.name}"
                >
            </td>
            <td id="cost-${index}">0</td>
        </tr>
    `).join("");

    document.querySelectorAll(".quantity").forEach(input => {
        input.addEventListener("input", calculate);
    });
}

function getQuantities() {
    return [...document.querySelectorAll(".quantity")].map(input => {
        const value = Number.parseInt(input.value, 10);
        return Number.isFinite(value) && value > 0 ? value : 0;
    });
}

function calculate() {
    const quantities = getQuantities();
    let total = 0;

    foods.forEach((food, index) => {
        const cost = food.price * quantities[index];
        document.getElementById(`cost-${index}`).textContent =
            cost.toLocaleString("en-IN");
        total += cost;
    });

    grandTotal.textContent = formatZeny(total);
    return { quantities, total };
}

function buildOrderText() {
    const { quantities, total } = calculate();
    const lines = ["🍖 Clown Fiesta Food Order", ""];

    foods.forEach((food, index) => {
        if (quantities[index] > 0) {
            const cost = food.price * quantities[index];
            lines.push(
                `${food.name} × ${quantities[index]} = ${cost.toLocaleString("en-IN")}`
            );
        }
    });

    const hasItems = quantities.some(qty => qty > 0);

    if (!hasItems) {
        lines.push("No food selected.");
    }

    lines.push("");
    lines.push(`💰 Total: ${total.toLocaleString("en-IN")} Zeny`);

    return lines.join("\n");
}

copyBtn.addEventListener("click", async () => {
    const text = buildOrderText();

    try {
        await navigator.clipboard.writeText(text);
        copyMessage.textContent = "Order copied to clipboard.";
    } catch {
        copyMessage.textContent = "Copy was blocked by the browser. You can select the summary manually.";
    }

    setTimeout(() => {
        copyMessage.textContent = "";
    }, 2500);
});

resetBtn.addEventListener("click", () => {
    document.querySelectorAll(".quantity").forEach(input => {
        input.value = 0;
    });
    calculate();
    copyMessage.textContent = "";
});

renderFoods();
calculate();
