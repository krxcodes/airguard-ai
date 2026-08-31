/* ========================================
   AirGuard AI — Dashboard Page
   KPIs, charts, heatmap, leak history
   ======================================== */

function renderDashboard() {
    const section = document.getElementById('dashboard');
    section.innerHTML = `
    <div class="container">
        ${Components.sectionHeader('📊 Dashboard', 'Real-Time Monitoring Dashboard', 'Track leaks, energy savings, and compressor health at a glance')}

        <!-- KPI Cards -->
        <div class="dashboard-grid" style="margin-bottom: var(--space-8)">
            ${MOCK_DATA.dashboardKPIs.map((kpi, i) => Components.kpiCard(kpi, i)).join('')}
        </div>

        <!-- Charts Row -->
        <div class="dashboard-grid" style="margin-bottom: var(--space-8)">
            <div class="card dashboard-wide reveal">
                <h4 style="margin-bottom: var(--space-4)">💰 Monthly Savings Trend</h4>
                <canvas id="savings-chart" style="width:100%;height:300px"></canvas>
            </div>
            <div class="card reveal delay-1">
                <h4 style="margin-bottom: var(--space-4)">📈 Leak Severity</h4>
                <canvas id="severity-chart" style="width:100%;height:300px"></canvas>
            </div>
            <div class="card reveal delay-2">
                <h4 style="margin-bottom: var(--space-4)">⚙️ Compressor Health</h4>
                <canvas id="health-gauge" style="width:100%;height:200px"></canvas>
                <p class="text-center text-sm text-muted mt-4">Overall system health score</p>
            </div>
        </div>

        <!-- Energy Trend -->
        <div class="card dashboard-full reveal" style="margin-bottom: var(--space-8)">
            <h4 style="margin-bottom: var(--space-4)">⚡ Energy: Consumed vs Saved</h4>
            <canvas id="energy-chart" style="width:100%;height:300px"></canvas>
        </div>

        <!-- Heatmap -->
        <div class="card dashboard-full reveal" style="margin-bottom: var(--space-8)">
            <h4 style="margin-bottom: var(--space-4)">🗺️ Facility Leak Heatmap</h4>
            <div class="heatmap-container">
                <svg viewBox="0 0 1000 500" style="width:100%;height:auto;min-height:300px">
                    <!-- Background -->
                    <rect width="1000" height="500" fill="#0F172A"/>

                    <!-- Rooms -->
                    <rect x="30" y="30" width="200" height="150" rx="8" fill="#1E293B" stroke="#334155" stroke-width="2"/>
                    <text x="130" y="115" text-anchor="middle" fill="#94A3B8" font-size="13" font-family="Inter">Compressor Room A</text>

                    <rect x="270" y="30" width="220" height="150" rx="8" fill="#1E293B" stroke="#334155" stroke-width="2"/>
                    <text x="380" y="115" text-anchor="middle" fill="#94A3B8" font-size="13" font-family="Inter">Pipeline Section</text>

                    <rect x="530" y="30" width="180" height="150" rx="8" fill="#1E293B" stroke="#334155" stroke-width="2"/>
                    <text x="620" y="115" text-anchor="middle" fill="#94A3B8" font-size="13" font-family="Inter">Valve Area</text>

                    <rect x="750" y="30" width="220" height="150" rx="8" fill="#1E293B" stroke="#334155" stroke-width="2"/>
                    <text x="860" y="115" text-anchor="middle" fill="#94A3B8" font-size="13" font-family="Inter">Dryer Unit</text>

                    <rect x="30" y="300" width="250" height="150" rx="8" fill="#1E293B" stroke="#334155" stroke-width="2"/>
                    <text x="155" y="385" text-anchor="middle" fill="#94A3B8" font-size="13" font-family="Inter">Compressor Room B</text>

                    <rect x="750" y="300" width="220" height="150" rx="8" fill="#1E293B" stroke="#334155" stroke-width="2"/>
                    <text x="860" y="385" text-anchor="middle" fill="#94A3B8" font-size="13" font-family="Inter">Filter Bank</text>

                    <!-- Connecting Pipes -->
                    <line x1="230" y1="105" x2="270" y2="105" stroke="#475569" stroke-width="4"/>
                    <line x1="490" y1="105" x2="530" y2="105" stroke="#475569" stroke-width="4"/>
                    <line x1="710" y1="105" x2="750" y2="105" stroke="#475569" stroke-width="4"/>
                    <line x1="130" y1="180" x2="130" y2="300" stroke="#475569" stroke-width="4"/>
                    <line x1="860" y1="180" x2="860" y2="300" stroke="#475569" stroke-width="4"/>
                    <line x1="280" y1="375" x2="750" y2="375" stroke="#475569" stroke-width="4" stroke-dasharray="8,4"/>

                    <!-- Leak Points -->
                    ${MOCK_DATA.heatmapLeaks.map(leak => {
                        const x = leak.x * 10;
                        const y = leak.y * 5;
                        const color = leak.severity === 'high' ? '#EF4444' : leak.severity === 'medium' ? '#F59E0B' : '#10B981';
                        return `
                        <circle cx="${x}" cy="${y}" r="8" fill="${color}" opacity="0.8">
                            <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite"/>
                            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="${x}" cy="${y}" r="4" fill="${color}"/>
                        <text x="${x}" y="${y - 18}" text-anchor="middle" fill="${color}" font-size="11" font-family="Inter" font-weight="600">${leak.label}</text>`;
                    }).join('')}
                </svg>
            </div>
            <!-- Legend -->
            <div style="display:flex;gap:var(--space-6);justify-content:center;margin-top:var(--space-4)">
                <div style="display:flex;align-items:center;gap:var(--space-2)">
                    <span style="width:12px;height:12px;border-radius:50%;background:#EF4444;display:inline-block"></span>
                    <span class="text-sm text-muted">High Severity</span>
                </div>
                <div style="display:flex;align-items:center;gap:var(--space-2)">
                    <span style="width:12px;height:12px;border-radius:50%;background:#F59E0B;display:inline-block"></span>
                    <span class="text-sm text-muted">Medium Severity</span>
                </div>
                <div style="display:flex;align-items:center;gap:var(--space-2)">
                    <span style="width:12px;height:12px;border-radius:50%;background:#10B981;display:inline-block"></span>
                    <span class="text-sm text-muted">Low Severity</span>
                </div>
            </div>
        </div>

        <!-- Leak History Table -->
        <div class="card dashboard-full reveal">
            <h4 style="margin-bottom: var(--space-4)">📋 Leak History</h4>
            <div class="leak-table-container">
                <table class="leak-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Severity</th>
                            <th>Air Loss</th>
                            <th>Est. Cost</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${MOCK_DATA.leakHistory.map(leak => {
                            const sevClass = leak.severity === 'High' ? 'red' : leak.severity === 'Medium' ? 'yellow' : 'green';
                            const statClass = leak.status === 'Open' ? 'red' : leak.status === 'Fixing' ? 'yellow' : 'green';
                            return `<tr>
                                <td><strong>${leak.id}</strong></td>
                                <td>${leak.date}</td>
                                <td>${leak.location}</td>
                                <td><span class="badge badge-${sevClass}">${leak.severity}</span></td>
                                <td>${leak.airLoss}</td>
                                <td>${leak.cost}</td>
                                <td><span class="badge badge-${statClass}">${leak.status}</span></td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>`;

    // ---- Draw Charts after DOM mount ----
    setTimeout(() => {
        // Bar Chart — Monthly Savings
        const savingsCanvas = document.getElementById('savings-chart');
        if (savingsCanvas) {
            Utils.drawBarChart(savingsCanvas,
                MOCK_DATA.monthlySavings.map(d => ({ label: d.month, value: d.savings })),
                { prefix: '₹', barColor1: '#3B82F6', barColor2: '#1D4ED8' }
            );
        }

        // Donut Chart — Severity
        const severityCanvas = document.getElementById('severity-chart');
        if (severityCanvas) {
            Utils.drawDonutChart(severityCanvas, MOCK_DATA.leakSeverity);
        }

        // Gauge — Compressor Health
        const gaugeCanvas = document.getElementById('health-gauge');
        if (gaugeCanvas) {
            Utils.drawGauge(gaugeCanvas, MOCK_DATA.compressorHealth, { label: 'Health Score' });
        }

        // Line Chart — Energy Trend
        const energyCanvas = document.getElementById('energy-chart');
        if (energyCanvas) {
            Utils.drawLineChart(energyCanvas,
                [
                    { data: MOCK_DATA.energyTrend.map(d => d.consumed), color: '#3B82F6', fill: false },
                    { data: MOCK_DATA.energyTrend.map(d => d.saved), color: '#10B981', fill: true, fillColor: 'rgba(16,185,129,0.1)' }
                ],
                MOCK_DATA.energyTrend.map(d => d.month)
            );
        }
    }, 200);

    Utils.initScrollReveal();
}
