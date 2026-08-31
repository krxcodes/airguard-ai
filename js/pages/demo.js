/* ========================================
   AirGuard AI — Live Demo Page
   Audio upload, recording, AI simulation
   ======================================== */

function renderDemo() {
    const section = document.getElementById('demo');
    section.classList.add('section-alt');
    section.innerHTML = `
    <div class="container">
        ${Components.sectionHeader('🎯 Live Demo', 'AI Leak Detection Simulator', 'Upload or record audio to see our AI analysis in action')}

        <!-- Controls -->
        <div class="demo-controls">
            <label class="btn btn-primary btn-lg" style="cursor:pointer">
                📁 Upload Audio
                <input type="file" id="audio-upload" accept=".wav,.mp3,.ogg" style="display:none">
            </label>
            <button class="btn btn-outline btn-lg" id="record-btn">🎙️ Record Audio</button>
            <button class="btn btn-success btn-lg" id="run-demo-btn">▶ Run Demo Analysis</button>
        </div>

        <!-- Visualizer -->
        <div class="demo-visualizer">
            <div class="demo-canvas-container">
                <div class="demo-canvas-wrapper">
                    <span class="demo-canvas-label">Frequency Spectrum</span>
                    <canvas id="spectrum-canvas"></canvas>
                </div>
                <div class="demo-canvas-wrapper">
                    <span class="demo-canvas-label">Waveform</span>
                    <canvas id="waveform-canvas"></canvas>
                </div>
            </div>

            <!-- Progress -->
            <div id="demo-progress" style="display:none" class="demo-progress">
                <div class="demo-progress-label">
                    <span>AI Analysis in Progress...</span>
                    <span id="progress-pct">0%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" id="progress-fill" style="width:0%"></div></div>
            </div>
        </div>

        <!-- Results -->
        <div id="demo-results" style="display:none">
            <h3 style="margin-bottom: var(--space-6); text-align: center;">Analysis Results</h3>
            <div class="demo-results-grid">
                <div class="demo-result-card">
                    <div class="demo-result-label">AI CONFIDENCE</div>
                    <div class="demo-result-value" id="res-confidence">--</div>
                </div>
                <div class="demo-result-card">
                    <div class="demo-result-label">LEAK PROBABILITY</div>
                    <div class="demo-result-value" id="res-probability">--</div>
                </div>
                <div class="demo-result-card">
                    <div class="demo-result-label">LEAK SEVERITY</div>
                    <div class="demo-result-value" id="res-severity">--</div>
                </div>
                <div class="demo-result-card">
                    <div class="demo-result-label">NOISE LEVEL</div>
                    <div class="demo-result-value" id="res-noise">--</div>
                </div>
                <div class="demo-result-card">
                    <div class="demo-result-label">ESTIMATED LEAK SIZE</div>
                    <div class="demo-result-value" id="res-leak-size">--</div>
                </div>
                <div class="demo-result-card">
                    <div class="demo-result-label">ENERGY LOSS</div>
                    <div class="demo-result-value" id="res-energy">--</div>
                </div>
                <div class="demo-result-card">
                    <div class="demo-result-label">ANNUAL COST LOSS</div>
                    <div class="demo-result-value" id="res-cost">--</div>
                </div>
            </div>

            <!-- Maintenance Recommendations -->
            <div class="demo-maintenance" id="demo-maintenance">
                <h4>🔧 Recommended Maintenance Actions</h4>
                <ul></ul>
            </div>
        </div>
    </div>`;

    // ---- Post-render: Canvas animations ----
    const vizState = { value: false, animating: true };

    setTimeout(() => {
        const specCanvas = document.getElementById('spectrum-canvas');
        const waveCanvas = document.getElementById('waveform-canvas');
        if (specCanvas) Utils.drawSpectrum(specCanvas, vizState);
        if (waveCanvas) Utils.drawWaveform(waveCanvas, vizState);
    }, 100);

    // ---- Analysis Simulation ----
    function runAnalysis() {
        const progress = document.getElementById('demo-progress');
        const results = document.getElementById('demo-results');
        const fill = document.getElementById('progress-fill');
        const pct = document.getElementById('progress-pct');

        progress.style.display = 'block';
        results.style.display = 'none';
        fill.style.width = '0%';
        pct.textContent = '0%';
        vizState.value = true;

        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            fill.style.width = p + '%';
            pct.textContent = p + '%';
            if (p >= 100) {
                clearInterval(interval);
                showResults();
            }
        }, 60);
    }

    function showResults() {
        const r = MOCK_DATA.generateDemoResults();
        const results = document.getElementById('demo-results');
        results.style.display = 'block';
        results.style.animation = 'fadeInUp 0.5s ease';

        document.getElementById('res-confidence').innerHTML = r.confidence + '<span class="demo-result-unit">%</span>';
        document.getElementById('res-confidence').className = 'demo-result-value ' + (r.confidence > 90 ? 'severity-high' : 'severity-medium');
        document.getElementById('res-probability').innerHTML = r.probability + '<span class="demo-result-unit">%</span>';
        document.getElementById('res-severity').innerHTML = r.severity;
        document.getElementById('res-severity').className = 'demo-result-value severity-' + r.severity.toLowerCase();
        document.getElementById('res-noise').innerHTML = r.noiseLevel + '<span class="demo-result-unit"> dB</span>';
        document.getElementById('res-leak-size').innerHTML = r.leakSize + '<span class="demo-result-unit"> CFM</span>';
        document.getElementById('res-energy').innerHTML = Utils.formatIndian(r.energyLoss) + '<span class="demo-result-unit"> kWh/yr</span>';
        document.getElementById('res-cost').innerHTML = '₹' + Utils.formatIndian(r.costLoss) + '<span class="demo-result-unit">/year</span>';

        const maint = document.getElementById('demo-maintenance');
        maint.querySelector('ul').innerHTML = r.maintenance.map(m => '<li>' + m + '</li>').join('');

        setTimeout(() => { vizState.value = false; }, 1500);
    }

    // ---- Event Listeners ----
    document.getElementById('audio-upload').addEventListener('change', () => runAnalysis());
    document.getElementById('run-demo-btn').addEventListener('click', () => runAnalysis());

    let recording = false;
    document.getElementById('record-btn').addEventListener('click', function() {
        if (!recording) {
            recording = true;
            this.innerHTML = '⏹️ Stop Recording';
            this.classList.add('btn-primary');
            this.classList.remove('btn-outline');
            vizState.value = true;
            setTimeout(() => {
                recording = false;
                this.innerHTML = '🎙️ Record Audio';
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline');
                runAnalysis();
            }, 3000);
        } else {
            recording = false;
            this.innerHTML = '🎙️ Record Audio';
            this.classList.remove('btn-primary');
            this.classList.add('btn-outline');
            runAnalysis();
        }
    });

    Utils.initScrollReveal();
}
