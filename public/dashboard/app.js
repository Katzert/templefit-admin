/**
 * TEMPLEFIT Pro Max Dashboard Logic
 * Premium Tactical Edition
 */

const FALLBACK_DATA = [
    { Mes: 'Mayo', 'Total Ingresos': '12500', 'Total Gastos': '9200', 'Flujo Acumulado': '3300' },
    { Mes: 'Junio', 'Total Ingresos': '14000', 'Total Gastos': '9200', 'Flujo Acumulado': '8100' },
    { Mes: 'Julio', 'Total Ingresos': '18500', 'Total Gastos': '9500', 'Flujo Acumulado': '17100' },
    { Mes: 'Agosto', 'Total Ingresos': '24000', 'Total Gastos': '9800', 'Flujo Acumulado': '31300' },
    { Mes: 'Septiembre', 'Total Ingresos': '32000', 'Total Gastos': '10200', 'Flujo Acumulado': '53100' },
    { Mes: 'Octubre', 'Total Ingresos': '45000', 'Total Gastos': '10500', 'Flujo Acumulado': '87600' },
    { Mes: 'Noviembre', 'Total Ingresos': '58000', 'Total Gastos': '11000', 'Flujo Acumulado': '134600' },
    { Mes: 'Diciembre', 'Total Ingresos': '84000', 'Total Gastos': '11500', 'Flujo Acumulado': '207100' }
];

const BRAND = {
    navy: '#002147',
    gold: '#C5A059',
    red: '#D32F2F',
    text: 'rgba(255, 255, 255, 0.8)',
    grid: 'rgba(255, 255, 255, 0.05)'
};

const INCOME_CATEGORIES = [
    { id: 'reto', name: 'Reto 21 Días', field: 'Inscripcion Reto 21 Dias', color: '#C5A059' },
    { id: 'bebidas', name: 'Bebidas', field: 'Venta de Bebidas', color: '#D32F2F' },
    { id: 'snacks', name: 'Snacks', field: 'Venta de Snacks', color: '#E5C079' },
    { id: 'medicos', name: 'Médicos', field: 'Comisiones Medicas', color: '#888' },
    { id: 'suplementos', name: 'Suplementos', field: 'Venta de Suplementos', color: '#AAA' },
    { id: 'souvenirs', name: 'Souvenirs', field: 'Ingresos de Souvenirs', color: '#FFF' }
];

let financialData = [];
let originalFinancialData = []; // Store baseline for scaling
let charts = {};

// --- CALCULATION LOGIC ---

function calculateScaling(months) {
    if (!financialData.length) return;
    const totalInc = financialData.reduce((acc, d) => acc + parseVal(d['Total Ingresos']), 0);
    const totalExp = financialData.reduce((acc, d) => acc + parseVal(d['Total Gastos']), 0);
    const avgProfit = (totalInc - totalExp) / financialData.length;
    
    const scaledProfitEl = document.getElementById('projectedIncome');
    if (scaledProfitEl) scaledProfitEl.innerText = `${Math.round(avgProfit * months).toLocaleString()} Bs.`;
    
    const scaledAthletesEl = document.getElementById('scaledAthletes');
    if (scaledAthletesEl) scaledAthletesEl.innerText = Math.round(65 * Math.sqrt(months)).toLocaleString();

    document.querySelectorAll('[id^="phase-"]').forEach(c => {
        c.classList.remove('active', 'border-l-temple-gold');
        c.classList.add('border-l-white/10');
    });
    let phaseId = 1;
    if (months >= 2) phaseId = 2;
    if (months >= 3) phaseId = 3;
    if (months >= 5) phaseId = 4;
    if (months >= 6) phaseId = 5;
    if (months >= 9) phaseId = 6;
    if (months >= 11) phaseId = 7;
    const phaseEl = document.getElementById(`phase-${phaseId}`);
    if (phaseEl) {
        phaseEl.classList.remove('border-l-white/10');
        phaseEl.classList.add('active', 'border-l-temple-gold');
    }
}

function calculateInitialTotal() {
    if (!financialData.length) return;
    const lastMonth = financialData[financialData.length - 1];
    const totalInc = financialData.reduce((acc, d) => acc + parseVal(d['Total Ingresos']), 0);
    const totalExp = financialData.reduce((acc, d) => acc + parseVal(d['Total Gastos']), 0);
    const efficiency = (totalInc > 0) ? ((totalInc - totalExp) / totalInc) * 100 : 0;

    // Update Hero Stats
    const heroAthletes = document.getElementById('heroAthletes');
    const heroIncome = document.getElementById('heroIncome');
    const heroEff = document.getElementById('heroEfficiency');
    
    if (heroAthletes) heroAthletes.innerText = "65"; // As specified by user
    if (heroIncome) heroIncome.innerText = `${Math.round(parseVal(lastMonth['Total Ingresos'])).toLocaleString()} Bs.`;
    if (heroEff) heroEff.innerText = `+${Math.round(efficiency)}%`;

    // Update Dashboard Displays
    const mainDisplay = document.getElementById('totalIncomeDisplay');
    if (mainDisplay) mainDisplay.innerText = `${Math.round(totalInc).toLocaleString()} Bs.`;
    
    const marginInd = document.getElementById('marginIndicator');
    if (marginInd) marginInd.innerText = `${Math.round(efficiency)}%`;

    const efficiencyEl = document.getElementById('efficiencyValue');
    if (efficiencyEl) efficiencyEl.innerText = `${efficiency.toFixed(1)}%`;
}

const parseVal = (v) => {
    if (typeof v === 'number') return v;
    let s = (v || '0').toString().trim();
    // Remove currency and spaces
    s = s.replace(/[Bs\s]/g, '');
    // If it has both , and . (e.g. 1,500.00 or 1.500,00)
    if (s.includes(',') && s.includes('.')) {
        if (s.indexOf('.') < s.indexOf(',')) { // European style 1.500,00
            s = s.replace(/\./g, '').replace(',', '.');
        } else { // US style 1,500.00
            s = s.replace(/,/g, '');
        }
    } else if (s.includes(',')) { // Just comma
        // If comma is used as decimal separator (e.g. 1500,50)
        if (s.split(',')[1].length <= 2) s = s.replace(',', '.');
        else s = s.replace(',', ''); // Or thousands
    } else if (s.includes('.')) { // Just dot
        // If dot is used as thousands (e.g. 10.500)
        if (s.split('.')[1].length === 3 && s.split('.')[0].length <= 3) s = s.replace(/\./g, '');
    }
    return parseFloat(s) || 0;
};

// --- CHART CONFIGURATION ---

function setupCharts() {
    if (!financialData.length) return;
    
    const months = financialData.map(d => d.Mes);
    const incomes = financialData.map(d => parseVal(d['Total Ingresos']));
    const expenses = financialData.map(d => parseVal(d['Total Gastos']));
    const accumulated = financialData.map(d => parseVal(d['Flujo Acumulado']));

    Chart.defaults.color = BRAND.text;
    Chart.defaults.font.family = "'Outfit', sans-serif";
    
    // 1. Income vs Expenses
    const ctx1 = document.getElementById('incomeExpenseChart').getContext('2d');
    if (charts.incomeExpense) charts.incomeExpense.destroy();
    charts.incomeExpense = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                { label: 'Entradas de Expansión', data: incomes, backgroundColor: BRAND.gold, borderRadius: 4, barPercentage: 0.8, categoryPercentage: 0.8 },
                { label: 'Inversión Operativa', data: expenses, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, barPercentage: 0.8, categoryPercentage: 0.8 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: BRAND.grid }, ticks: { font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { font: { size: 10 } } }
            },
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10, weight: 'bold' } } } }
        }
    });

    // 2. Cash Flow Line
    const ctx2 = document.getElementById('cashFlowChart').getContext('2d');
    const grad = ctx2.createLinearGradient(0, 0, 0, 300);
    grad.addColorStop(0, 'rgba(211, 47, 47, 0.4)');
    grad.addColorStop(1, 'rgba(211, 47, 47, 0)');

    if (charts.cashFlow) charts.cashFlow.destroy();
    charts.cashFlow = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Fondo Total Acumulado',
                data: accumulated,
                borderColor: BRAND.red,
                borderWidth: 4,
                backgroundColor: grad,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: BRAND.red
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    display: true, 
                    grid: { color: BRAND.grid }, 
                    ticks: { 
                        font: { size: 9 },
                        callback: (v) => v >= 1000 ? (v/1000).toFixed(1) + 'k' : v
                    } 
                },
                x: { grid: { display: false }, ticks: { font: { size: 10 } } }
            },
            plugins: { legend: { display: false } }
        }
    });
}

function setupProfitSimulator() {
    const canvas = document.getElementById('profitDistributionChart');
    const display = document.getElementById('profitPoolValue');
    const legend = document.getElementById('distributionLegend');
    if (!canvas) return;

    if (charts.profitPie) charts.profitPie.destroy();
    charts.profitPie = new Chart(canvas.getContext('2d'), {
        type: 'doughnut',
        data: { labels: [], datasets: [{ data: [], backgroundColor: INCOME_CATEGORIES.map(c => c.color), borderWidth: 0, hoverOffset: 10 }] },
        options: { 
            responsive: true, 
            maintainAspectRatio: false, 
            cutout: '70%',
            plugins: { legend: { display: false } }
        }
    });

    const updateBreakdown = () => {
        const totalInc = financialData.reduce((acc, d) => acc + parseVal(d['Total Ingresos']), 0);
        const avgMonthly = totalInc / financialData.length;

        const categoryData = INCOME_CATEGORIES.map(cat => {
            const sum = financialData.reduce((acc, d) => acc + parseVal(d[cat.field]), 0);
            return { ...cat, amount: sum / financialData.length };
        });

        display.innerText = `${Math.round(avgMonthly).toLocaleString()} Bs.`;
        charts.profitPie.data.labels = categoryData.map(c => c.name);
        charts.profitPie.data.datasets[0].data = categoryData.map(c => c.amount);
        charts.profitPie.update();

        legend.innerHTML = '';
        categoryData.forEach(cat => {
            const percentage = ((cat.amount / totalInc) * 100).toFixed(1);
            const div = document.createElement('div');
            div.className = 'flex items-center justify-between border-b border-white/5 pb-2';
            div.innerHTML = `
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 rounded-sm" style="background:${cat.color}"></div>
                    <span class="text-[10px] font-bold uppercase text-white/80">${cat.name}</span>
                </div>
                <div class="text-right">
                    <span class="text-[11px] font-black text-white block">${Math.round(cat.amount).toLocaleString()} Bs.</span>
                    <span class="text-[9px] text-temple-gold font-bold">${percentage}%</span>
                </div>
            `;
            legend.appendChild(div);
        });
    };

    window.refreshProfitPool = updateBreakdown;
    updateBreakdown();
}

function setupCorrectionForm() {
    const form = document.getElementById('correctionForm');
    if (!form) return;
    form.innerHTML = '';
    financialData.forEach((row, i) => {
        const val = Math.round(parseVal(row['Total Ingresos']));
        const div = document.createElement('div');
        div.className = 'bg-white/5 p-4 border-l-2 border-temple-gold/30 hover:border-temple-gold transition-all';
        div.innerHTML = `
            <label class="text-[10px] uppercase font-bold text-temple-gold mb-1 block opacity-60">${row.Mes} 2026</label>
            <div class="flex items-center border-b border-white/10 pb-1">
                <span class="text-white/40 text-xs mr-2 font-bold">Bs.</span>
                <input type="number" id="input-month-${i}" value="${val}" class="bg-transparent text-white font-bold text-xl w-full focus:outline-none"
                       oninput="updateData(${i}, this.value)">
            </div>
        `;
        form.appendChild(div);
    });
}

let currentAthleteFactor = 1;

function updateAthleteSimulation(newCount) {
    const baseCount = 65;
    currentAthleteFactor = newCount / baseCount;
    
    // Sync all athlete labels
    const athleteVal = document.getElementById('athleteValue');
    if (athleteVal) athleteVal.innerText = newCount;
    
    const scaledAthletes = document.getElementById('scaledAthletes');
    if (scaledAthletes) scaledAthletes.innerText = newCount;

    const heroAthletes = document.getElementById('heroAthletes');
    if (heroAthletes) heroAthletes.innerText = newCount;

    refreshCalculations();
}

function updateData(index, newValue) {
    // If the user inputs a value while scaled, we treat it as the new baseline for that scale
    const rawValue = parseVal(newValue);
    originalFinancialData[index]['Total Ingresos'] = rawValue / currentAthleteFactor;
    
    refreshCalculations();
}

function refreshCalculations() {
    let accumulator = 0;
    // Scale everything based on current factor
    financialData = originalFinancialData.map(row => {
        const newRow = { ...row };
        INCOME_CATEGORIES.forEach(cat => {
            const originalVal = parseVal(row[cat.field]);
            newRow[cat.field] = originalVal * currentAthleteFactor;
        });
        
        const total = INCOME_CATEGORIES.reduce((acc, cat) => acc + (newRow[cat.field] || 0), 0);
        newRow['Total Ingresos'] = total;

        // Recalculate Cash Flow (Accumulated)
        const monthlyProfit = total - parseVal(row['Total Gastos'] || '9200');
        accumulator += monthlyProfit;
        newRow['Flujo Acumulado'] = accumulator;

        return newRow;
    });

    // Update charts and metrics
    setupCharts();
    calculateInitialTotal();
    
    // Update input values without re-rendering the form to maintain focus
    financialData.forEach((row, i) => {
        const input = document.getElementById(`input-month-${i}`);
        if (input && document.activeElement !== input) {
            input.value = Math.round(row['Total Ingresos']);
        }
    });

    if (window.refreshProfitPool) window.refreshProfitPool();

    const mainDisplay = document.getElementById('totalIncomeDisplay');
    if (mainDisplay) {
        mainDisplay.style.opacity = '0.5';
        setTimeout(() => mainDisplay.style.opacity = '1', 150);
    }
}

// --- INITIALIZATION ---

async function init() {
    try {
        const res = await fetch('templefit_finanzas_v2.csv');
        if (!res.ok) throw new Error();
        const text = await res.text();
        Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                financialData = results.data.map(row => {
                    const clean = {};
                    Object.keys(row).forEach(k => clean[k.trim()] = row[k]);
                    return clean;
                });
                originalFinancialData = JSON.parse(JSON.stringify(financialData));
                start();
            }
        });
    } catch (e) {
        financialData = JSON.parse(JSON.stringify(FALLBACK_DATA));
        originalFinancialData = JSON.parse(JSON.stringify(FALLBACK_DATA)); // FIX: must also set baseline
        start();
    }
}

function start() {
    setupCharts();
    setupCorrectionForm();
    calculateInitialTotal();
    setupProfitSimulator();
    calculateScaling(1);
    
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

window.updatePhase = (id, img) => {
    const phaseImage = document.getElementById('phase-image');
    if (phaseImage) {
        phaseImage.style.opacity = '0.3';
        setTimeout(() => {
            phaseImage.src = img;
            phaseImage.style.opacity = '1';
        }, 400);
    }
    const map = { 1: 1, 2: 2, 3: 3, 4: 5, 5: 6, 6: 9, 7: 11 };
    calculateScaling(map[id]);
};

document.addEventListener('DOMContentLoaded', init);
