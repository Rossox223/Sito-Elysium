
const firebaseConfig = {
  apiKey: "AIzaSyDPOE81FnekUd4SXTPh2ql7R9WRTTXiCoM",
  authDomain: "elysium-craft.firebaseapp.com",
  databaseURL: "https://elysium-craft-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "elysium-craft",
  storageBucket: "elysium-craft.firebasestorage.app",
  messagingSenderId: "245291764328",
  appId: "1:245291764328:web:3b2c616b1bc927585209dd"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database();


const ADMIN_PASSWORD = "blazecucina123";
let isAdmin = false;


const defaultCategories = [
    {
        id: 'carne_pesce',
        title: '🥩 Carne & Pesce',
        items: {
            manzo: { name: 'Manzo Crudo', icon: '🥩', count: 178 },
            pollo: { name: 'Pollo Crudo', icon: '🍗', count: 73 },
            merluzzo: { name: 'Merluzzo Crudo', icon: '🐟', count: 141 },
            anatra: { name: 'Anatra Cruda', icon: '🦆', count: 43 },
            uovo: { name: 'Uova', icon: '🥚', count: 61 },
            totano_luminoso: { name: 'Totano Luminoso', icon: '🦑', count: 68 },
            mancina: { name: 'Carne di Pecora', icon: '🥩', count: 7 },
            maiale: { name: 'Maiale Crudo', icon: '🥩', count: 50 },
            pesce_palla: { name: 'Pesce Palla', icon: '🐡', count: 59 },
            coniglio: { name: 'Coniglio Crudo', icon: '🐇', count: 8 },
            salmone: { name: 'Salmone Crudo', icon: '🐟', count: 24 },
            totano: { name: 'Totano', icon: '🦑', count: 53 },
            pesce_tropicale: { name: 'Pesce Tropicale', icon: '🐠', count: 43 },
            carne_cervo: { name: 'Carne Cervo', icon: '🦌', count: 34 }
        }
    },
    {
        id: 'grani',
        title: '🌾 Grani & Tuberi',
        items: {
            grano: { name: 'Grano', icon: '🌾', count: 1077 },
            patata: { name: 'Patate', icon: '🥔', count: 4 }
        }
    },
    {
        id: 'combustibili_dolcificanti',
        title: '🔥 Combustibili & Spezie',
        items: {
            carbonella: { name: 'Carbonella', icon: '⬛', count: 84 },
            zucchero: { name: 'Zucchero', icon: '🧂', count: 101 }
        }
    },
    {
        id: 'robe_rosse',
        title: '🍎 Frutti & Cibi Rossi',
        items: {
            mela: { name: 'Mele', icon: '🍎', count: 88 },
            barbabietola: { name: 'Barbabietole', icon: '🫚', count: 2 },
            peperoncino: { name: 'Peperoncini', icon: '🌶️', count: 75 },
            miele: { name: 'Miele', icon: '🍯', count: 58 },
            fungo_rosso: { name: 'Funghi Rossi', icon: '🍄', count: 50 },
            fragola: { name: 'Fragole', icon: '🍓', count: 31 },
            bacche: { name: 'Bacche', icon: '🫐', count: 130 },
            pomodoro: { name: 'Pomodori', icon: '🍅', count: 103 }
        }
    },
    {
        id: 'verdure_altro',
        title: '🥦 Verdure & Altro',
        items: {
            broccoli: { name: 'Broccoli', icon: '🥦', count: 4 },
            fungo_marrone: { name: 'Funghi Marroni', icon: '🍄', count: 28 },
            carota: { name: 'Carote', icon: '🥕', count: 305 },
            cacao: { name: 'Cacao', icon: '🍫', count: 51 },
            mais: { name: 'Mais', icon: '🌽', count: 42 },
            melenzana: { name: 'Melenzane', icon: '🍆', count: 193 },
            alga: { name: 'Alghe', icon: '🌿', count: 67 },
            melone: { name: 'Melone', icon: '🍈', count: 48 },
            latte: { name: 'Latte', icon: '🥛', count: 12 },
            cipolla: { name: 'Cipolle', icon: '🧅', count: 13 },
            arachidi: { name: 'Arachidi', icon: '🥜', count: 67 },
            uva_rossa: { name: 'Uva Rossa', icon: '🍇', count: 1 },
            uva_bianca: { name: 'Uva Bianca', icon: '🍇', count: 2 },
            riso: { name: 'Riso', icon: '🍚', count: 1 }
        }
    }
];

const defaultShops = {
    shop1: [
        { name: 'Uova Affumicate', icon: '🍳', count: 10, price: 3, units: '2 unità', nutrition: '+2% Proteine', cost: '1b + carbonella', req: { uovo: 2 } },
        { name: 'Melenzane Affumicate', icon: '🍆', count: 10, price: 3, units: '2 unità', nutrition: '+2% Vegetali', cost: '1b + carbonella', req: { melenzana: 2 } },
        { name: 'Pomodori Affumicati', icon: '🍅', count: 10, price: 3, units: '2 unità', nutrition: '+2% Vegetali', cost: '1b + carbonella', req: { pomodoro: 2 } },
        { name: 'Patate Affumicate', icon: '🥔', count: 10, price: 3, units: '2 unità', nutrition: '+2% Grani', cost: '1b + carbonella', req: { patata: 2 } },
        { name: 'Succo Melone', icon: '🥤', count: 8, price: 2, units: '1 unità', nutrition: '+2% Zuccheri', cost: '0.75b', req: { melone: 1, zucchero: 1 } }
    ],
    shop2: [
        { name: 'Marmellata Carote', icon: '🏺', count: 5, price: 4, units: '1 unità', nutrition: '+4% Zuccheri', cost: '1.25b', req: { carota: 2, zucchero: 1 } },
        { name: 'Marmellata Bacche', icon: '🏺', count: 5, price: 4, units: '1 unità', nutrition: '+4% Zuccheri', cost: '1.25b', req: { bacche: 2, zucchero: 1 } },
        { name: 'Carne Grigliata', icon: '🥩', count: 8, price: 5, units: '2 unità', nutrition: '+4% Proteine', cost: '1b + carbonella', req: { manzo: 2 } },
        { name: 'Patate Grigliate', icon: '🥔', count: 8, price: 5, units: '2 unità', nutrition: '+4% Grani', cost: '1b + carbonella', req: { patata: 2 } },
        { name: 'Pomodori Grigliati', icon: '🍅', count: 8, price: 5, units: '2 unità', nutrition: '+4% Vegetali', cost: '1b + carbonella', req: { pomodoro: 2 } },
        { name: 'Melenzane Grigliate', icon: '🍆', count: 8, price: 5, units: '2 unità', nutrition: '+4% Vegetali', cost: '1b + carbonella', req: { melenzana: 2 } },
        { name: 'Panino Mela/Marmellata', icon: '🥪', count: 6, price: 7, units: '1 unità', nutrition: '+3.2% Grani, +3.2% Zuccheri', cost: '3.35b', req: { mela: 2, zucchero: 1, grano: 3 } },
        { name: 'Panino Verdura', icon: '🥪', count: 6, price: 7, units: '1 unità', nutrition: '+3.2% Grani, +3.2% Vegetali', cost: '3.2b', req: { pomodoro: 2, grano: 3 }, note: 'Puoi usare Pomodori o Melenzane' },
        { name: 'Panino Carne', icon: '🥪', count: 6, price: 7, units: '1 unità', nutrition: '+3.2% Grani, +3.2% Proteine', cost: '3.2b', req: { manzo: 2, grano: 3 } }
    ],
    shop3: [
        { name: 'Sushi', icon: '🍣', count: 4, price: 14, units: '1 unità', nutrition: '+4.8% Grani, +4.8% Proteine, +4.8% Vegetali', cost: '7b', req: { alga: 1, pesce_palla: 1, riso: 3 } },
        { name: 'Caramella', icon: '🍬', count: 12, price: 5, units: '2 unità', nutrition: '+6% Zuccheri', cost: '1.75b', req: { miele: 1, zucchero: 2, melone: 1 } },
        { name: 'Barattolo Caramelle', icon: '🫙', count: 2, price: 55, units: '1 unità (12 caramelle)', nutrition: '+6% Zuccheri (x12)', cost: '10.5b', req: { miele: 6, zucchero: 12, melone: 6 } },
        { name: 'Truffle', icon: '🍫', count: 3, price: 15, units: '1 unità', nutrition: '+8% Grani, +8% Zuccheri', cost: '4.5b', req: { miele: 1, arachidi: 2, cacao: 2, zucchero: 1 }, note: 'Richiede Marmellata Cioccolato' },
        { name: 'Stufato Carne', icon: '🍲', count: 5, price: 6, units: '1 unità', nutrition: '+6% Proteine', cost: '2b', req: { carota: 1, cipolla: 1, manzo: 2 } },
        { name: 'Stufato Verdura', icon: '🍲', count: 5, price: 6, units: '1 unità', nutrition: '+6% Vegetali', cost: '2b', req: { carota: 1, cipolla: 1, pomodoro: 2 }, note: 'Puoi usare Melenzane o Pomodori' },
        { name: 'Parmigiana', icon: '🥘', count: 3, price: 14, units: '1 unità', nutrition: '+6% Grani, +6% Proteine, +6% Vegetali', cost: '4.1b', req: { pomodoro: 1, carne_cervo: 1, grano: 3, latte: 1 } },
        { name: 'Biscotto Fragola', icon: '🍪', count: 8, price: 12, units: '1 unità', nutrition: '+6.4% Grani, +6.4% Zuccheri', cost: '4.35b', req: { fragola: 2, grano: 3, latte: 1, zucchero: 1 } }
    ]
};


let inventoryData = defaultCategories;
let shops = defaultShops;
let totalProfit = 0;
let historyLog = [];



db.ref('elysium_data').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        inventoryData = data.categories || defaultCategories;
        shops = data.shops || defaultShops;
        totalProfit = data.profit || 0;
        historyLog = data.history || [];
    } else {
        saveData();
    }
    render();
});

function saveData() {
    db.ref('elysium_data').set({
        categories: inventoryData,
        shops: shops,
        profit: totalProfit,
        history: historyLog
    });
}

function toggleAdmin() {
    if (!isAdmin) {
        const pass = prompt("Inserisci la password Admin:");
        if (pass !== null) {
            if (pass.trim().toLowerCase() === ADMIN_PASSWORD.toLowerCase()) {
                isAdmin = true;
                document.body.classList.add('is-admin');
                document.getElementById('admin-status').innerText = "👑 Modalità: Admin";
                document.getElementById('login-btn').innerText = "🚪 Logout";
                alert("Login effettuato come Admin!");
            } else {
                alert("Password errata!");
            }
        }
    } else {
        isAdmin = false;
        document.body.classList.remove('is-admin');
        document.getElementById('admin-status').innerText = "👤 Modalità: Ospite (Sola Lettura)";
        document.getElementById('login-btn').innerText = "🔑 Login Admin";
    }
    render();
}

function findIngredient(key) {
    for (let cat of inventoryData) {
        if (cat.items && cat.items[key]) return cat.items[key];
    }
    return null;
}

function renderShopGrid(containerId, items, shopKey) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';

        if (items && items[i]) {
            const item = items[i];
            slot.innerHTML = `
                <span class="slot-icon">${item.icon}</span>
                <span class="slot-count">${item.count}</span>
            `;
            
            slot.onclick = () => {
                if (!isAdmin) {
                    alert("Devi accedere come Admin per registrare vendite!");
                    return;
                }
                sellProduct(shopKey, i);
            };

            slot.oncontextmenu = (e) => {
                e.preventDefault();
                if (!isAdmin) return;
                editProductDetails(shopKey, i);
            };

            slot.onmousemove = (e) => showTooltip(e, item);
            slot.onmouseleave = hideTooltip;
        }
        grid.appendChild(slot);
    }
}

function renderInventory() {
    const container = document.getElementById('inventory-categories');
    container.innerHTML = '';

    inventoryData.forEach((cat, catIdx) => {
        const catHeader = document.createElement('div');
        catHeader.className = 'category-title';
        catHeader.innerText = cat.title;
        container.appendChild(catHeader);

        const grid = document.createElement('div');
        grid.className = 'grid';
        grid.style.gridTemplateColumns = 'repeat(6, 60px)';

        if (cat.items) {
            Object.keys(cat.items).forEach(key => {
                const item = cat.items[key];
                const slot = document.createElement('div');
                slot.className = 'slot';

                if (item.count <= 3) {
                    slot.classList.add('danger');
                } else if (item.count <= 10) {
                    slot.classList.add('warning');
                }

                slot.innerHTML = `
                    <span class="slot-icon">${item.icon}</span>
                    <span class="slot-count">${item.count}</span>
                `;
                
                slot.onclick = () => {
                    if (!isAdmin) {
                        alert("Devi accedere come Admin per modificare le scorte!");
                        return;
                    }
                    addIngredientStock(catIdx, key);
                };

                slot.onmousemove = (e) => showSimpleTooltip(e, item.name, `Scorta: ${item.count}`);
                slot.onmouseleave = hideTooltip;

                grid.appendChild(slot);
            });
        }

        container.appendChild(grid);
    });
}

const tooltip = document.getElementById('mc-tooltip');

function showTooltip(e, item) {
    let reqHtml = '';
    if (item.req) {
        reqHtml = '<div class="tooltip-ingredients">Ingredienti necessari:</div>';
        for (const [ingKey, qty] of Object.entries(item.req)) {
            const ing = findIngredient(ingKey);
            const ingName = ing ? ing.name : ingKey;
            const ingStock = ing ? ing.count : 0;
            reqHtml += `<div style="font-size: 16px;">• ${ingName}: x${qty} <span style="color:#aaa;">(${ingStock} in inv)</span></div>`;
        }
    }

    let noteHtml = item.note ? `<div style="color: #ffaa00; font-size: 15px; margin-top: 4px;">ℹ️ ${item.note}</div>` : '';

    tooltip.innerHTML = `
        <div class="tooltip-title">${item.name}</div>
        <div class="tooltip-row">Prezzo Vendita: <span class="tooltip-highlight">${item.price}b</span></div>
        <div class="tooltip-row">Nutrizione: <span style="color:#55ff55;">${item.nutrition}</span></div>
        <div class="tooltip-row">Resa: ${item.units}</div>
        <div class="tooltip-row">Costo Stimato: ${item.cost}</div>
        ${reqHtml}
        ${noteHtml}
    `;
    tooltip.style.display = 'block';
    tooltip.style.left = (e.clientX + 15) + 'px';
    tooltip.style.top = (e.clientY + 15) + 'px';
}

function showSimpleTooltip(e, title, desc) {
    tooltip.innerHTML = `<div class="tooltip-title">${title}</div><div>${desc}</div>`;
    tooltip.style.display = 'block';
    tooltip.style.left = (e.clientX + 15) + 'px';
    tooltip.style.top = (e.clientY + 15) + 'px';
}

function hideTooltip() {
    tooltip.style.display = 'none';
}

function sellProduct(shopKey, index) {
    const p = shops[shopKey][index];
    if (p.count > 0) {
        p.count--;
        totalProfit += p.price;
        
        const now = new Date();
        const dateStr = now.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        historyLog.unshift({
            id: Date.now(),
            text: `[${dateStr} ${timeStr}] Venduto ${p.name} (+${p.price}b)`,
            price: p.price
        });
        saveData();
    } else {
        alert("Prodotto esaurito nel Negozietto!");
    }
}

function editProductDetails(shopKey, index) {
    const p = shops[shopKey][index];

    const action = prompt(
        `🛠️ MODIFICA PRODOTTO: ${p.name}\n\n` +
        `Cosa vuoi modificare?\n` +
        `1. Quantità disponibile (attualmente: ${p.count})\n` +
        `2. Prezzo di vendita (attualmente: ${p.price}b)\n` +
        `3. Ingredienti richiesti (attualmente: ${JSON.stringify(p.req)})\n` +
        `4. Nome o Icona (attualmente: ${p.icon} ${p.name})\n\n` +
        `Inserisci il numero della scelta (1-4):`
    );

    if (action === '1') {
        const newCount = prompt(`Nuova quantità per ${p.name}:`, p.count);
        if (newCount !== null && !isNaN(parseInt(newCount))) {
            shops[shopKey][index].count = Math.max(0, parseInt(newCount, 10));
            saveData();
            render(); // Aggiorna subito l'interfaccia!
        }
    } else if (action === '2') {
        const newPrice = prompt(`Nuovo prezzo (in bronzini) per ${p.name}:`, p.price);
        if (newPrice !== null && !isNaN(parseInt(newPrice))) {
            shops[shopKey][index].price = Math.max(0, parseInt(newPrice, 10));
            saveData();
            render();
        }
    } else if (action === '3') {
        const currentReqStr = JSON.stringify(p.req);
        const newReqStr = prompt(
            `Modifica la mappa degli ingredienti richiesti in formato JSON.\n` +
            `Esempio: {"mela":2,"zucchero":1}\n`, 
            currentReqStr
        );
        if (newReqStr !== null) {
            try {
                const parsedReq = JSON.parse(newReqStr);
                shops[shopKey][index].req = parsedReq;
                saveData();
                render();
                alert("Ingredienti aggiornati con successo!");
            } catch (err) {
                alert("Formato JSON non valido! Assicurati di usare le virgolette doppie per le chiavi.");
            }
        }
    } else if (action === '4') {
        const newName = prompt(`Nuovo Nome:`, p.name);
        const newIcon = prompt(`Nuova Icona Emoji:`, p.icon);
        if (newName) shops[shopKey][index].name = newName;
        if (newIcon) shops[shopKey][index].icon = newIcon;
        saveData();
        render();
    }
}

function addIngredientStock(catIdx, key) {
    const item = inventoryData[catIdx].items[key];
    const amount = prompt(`Modifica scorta per ${item.name}:`, item.count);
    if (amount !== null && !isNaN(parseInt(amount))) {
        item.count = Math.max(0, parseInt(amount));
        saveData();
    }
}

function deleteHistoryItem(id) {
    if (!isAdmin) return;
    const index = historyLog.findIndex(item => item.id === id);
    if (index !== -1) {
        const removed = historyLog.splice(index, 1)[0];
        totalProfit = Math.max(0, totalProfit - removed.price);
        saveData();
    }
}

function addCustomSale() {
    if (!isAdmin) return;
    const amount = prompt("Inserisci il guadagno in bronzini (b):", "10");
    if (amount && !isNaN(parseInt(amount))) {
        const val = parseInt(amount);
        totalProfit += val;
        
        const now = new Date();
        const dateStr = now.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        historyLog.unshift({
            id: Date.now(),
            text: `[${dateStr} ${timeStr}] Vendita Extra (+${val}b)`,
            price: val
        });
        saveData();
    }
}

function resetData() {
    if (!isAdmin) return;
    if (confirm("Vuoi azzerare tutte le scorte e ripristinare i valori iniziali su Firebase?")) {
        inventoryData = defaultCategories;
        shops = defaultShops;
        totalProfit = 0;
        historyLog = [];
        saveData();
    }
}

function render() {
    renderShopGrid('shop-1-grid', shops.shop1, 'shop1');
    renderShopGrid('shop-2-grid', shops.shop2, 'shop2');
    renderShopGrid('shop-3-grid', shops.shop3, 'shop3');
    renderInventory();
    
    document.getElementById('total-profit').innerText = totalProfit;
    const logContainer = document.getElementById('history-log');
    
    if (!historyLog || historyLog.length === 0) {
        logContainer.innerHTML = '<em>Nessuna vendita registrata.</em>';
    } else {
        logContainer.innerHTML = historyLog.map(item => `
            <div class="history-item">
                <span>${item.text}</span>
                ${isAdmin ? `<span class="delete-btn" onclick="deleteHistoryItem(${item.id})" title="Rimuovi questa riga">✖</span>` : ''}
            </div>
        `).join('');
    }
}