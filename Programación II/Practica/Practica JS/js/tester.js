/* ==========================================================================
   TESTER & CONSOLE RUNNER: JAVASCRIPT PROGRESSIVE PRACTICE
   Provides dynamic exercise loading, terminal capture, and assertion testing.
   ========================================================================== */

(function () {
    // State
    let currentExerciseIndex = 0;
    let completedExercises = new Set();
    const workshopId = document.body.dataset.workshopId || 'default';
    
    // Original console object to keep actual logging active if needed
    const _originalConsoleLog = console.log;
    const _originalConsoleError = console.error;

    // Custom console logger
    let capturedLogs = [];
    
    function initConsoleCapture() {
        console.log = function (...args) {
            _originalConsoleLog.apply(console, args);
            const message = args.map(arg => {
                if (typeof arg === 'object') {
                    try { return JSON.stringify(arg); } catch (e) { return '[Object]'; }
                }
                return String(arg);
            }).join(' ');
            capturedLogs.push({ type: 'log', text: message });
            appendTerminalLine('log', message);
        };

        console.error = function (...args) {
            _originalConsoleError.apply(console, args);
            const message = args.map(arg => String(arg)).join(' ');
            capturedLogs.push({ type: 'error', text: message });
            appendTerminalLine('error', message);
        };
    }

    function appendTerminalLine(type, text) {
        const terminalEl = document.getElementById('terminal-content');
        if (!terminalEl) return;
        
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.innerText = `> ${text}`;
        terminalEl.appendChild(line);
        terminalEl.scrollTop = terminalEl.scrollHeight;
    }

    function clearTerminal() {
        capturedLogs = [];
        const terminalEl = document.getElementById('terminal-content');
        if (terminalEl) {
            terminalEl.innerHTML = '';
        }
    }

    // Load progress from localStorage
    function loadProgress() {
        const saved = localStorage.getItem(`js_practica_${workshopId}`);
        if (saved) {
            try {
                const arr = JSON.parse(saved);
                completedExercises = new Set(arr);
            } catch (e) {
                completedExercises = new Set();
            }
        }
        updateSelectorButtons();
        updateProgressBar();
    }

    // Save progress to localStorage
    function saveProgress() {
        localStorage.setItem(`js_practica_${workshopId}`, JSON.stringify([...completedExercises]));
        updateProgressBar();
    }

    // Update progress bar
    function updateProgressBar() {
        const fill = document.getElementById('progress-bar-fill');
        const summary = document.getElementById('progress-summary');
        if (!fill) return;
        
        const total = window.exercisesData.length;
        const count = completedExercises.size;
        const pct = total > 0 ? (count / total) * 100 : 0;
        
        fill.style.width = `${pct}%`;
        if (summary) {
            summary.innerHTML = `Progreso: <strong>${count}/${total}</strong> Completados`;
        }
        
        // Custom event for integration with index portal
        document.dispatchEvent(new CustomEvent('progressUpdated', { detail: { workshopId, count, total } }));
    }

    // Bind exercise buttons
    function updateSelectorButtons() {
        const container = document.getElementById('exercise-buttons');
        if (!container) return;
        
        container.innerHTML = '';
        window.exercisesData.forEach((ex, idx) => {
            const btn = document.createElement('button');
            btn.className = `ex-btn`;
            if (idx === currentExerciseIndex) btn.classList.add('active');
            if (completedExercises.has(ex.id)) btn.classList.add('completed');
            btn.innerText = String(ex.id).padStart(2, '0');
            btn.onclick = () => selectExercise(idx);
            container.appendChild(btn);
        });
    }

    // Load active exercise details
    function selectExercise(index) {
        currentExerciseIndex = index;
        const ex = window.exercisesData[index];
        if (!ex) return;
        
        // Update active class on buttons
        const buttons = document.querySelectorAll('.ex-btn');
        buttons.forEach((btn, idx) => {
            if (idx === index) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        // Fill detail DOM elements
        document.getElementById('ex-title').innerText = `${ex.id}. ${ex.title}`;
        document.getElementById('ex-desc').innerHTML = ex.desc;
        
        // Restriction Alert
        const restBox = document.getElementById('ex-restriction');
        if (ex.restriction) {
            restBox.style.display = 'block';
            restBox.innerHTML = `⚠️ <strong>Restricción didáctica:</strong> ${ex.restriction}`;
        } else {
            restBox.style.display = 'none';
        }

        // Concepts
        document.getElementById('ex-concepts-list').innerHTML = `Conceptos: <strong>${ex.concepts}</strong>`;

        // Difficulty badge
        const diffBadge = document.getElementById('ex-difficulty');
        diffBadge.className = 'diff-badge';
        if (ex.difficulty === 'easy') {
            diffBadge.classList.add('diff-easy');
            diffBadge.innerText = 'Fácil';
        } else if (ex.difficulty === 'medium') {
            diffBadge.classList.add('diff-medium');
            diffBadge.innerText = 'Intermedio';
        } else if (ex.difficulty === 'hard') {
            diffBadge.classList.add('diff-hard');
            diffBadge.innerText = 'Desafiante';
        } else {
            diffBadge.classList.add('diff-legendary');
            diffBadge.innerText = 'Leyenda';
        }

        // Hint contents
        const hintBtn = document.getElementById('hint-btn');
        const hintContent = document.getElementById('hint-content');
        hintContent.style.display = 'none';
        hintContent.innerText = ex.hint;
        hintBtn.innerHTML = '💡 Ver Pista';

        // Code Editor support snippet (read only display of how function is named)
        const codeSupport = document.getElementById('code-support-snippet');
        if (codeSupport && ex.signature) {
            codeSupport.style.display = 'block';
            codeSupport.innerHTML = `<span class="code-title">Firma de Función a completar en tu editor:</span><code>${ex.signature}</code>`;
        } else if (codeSupport) {
            codeSupport.style.display = 'none';
        }

        // Clear previous runs
        clearTerminal();
        document.getElementById('test-results-list').innerHTML = `
            <div style="color: var(--text-muted); font-size: 0.85rem; font-style: italic;">
                Escribe tu solución en tu editor de código e interactúa haciendo clic en "Ejecutar y Validar" para correr las pruebas.
            </div>
        `;
        
        // Highlight active DOM exercise sandbox (if workshop is DOM)
        if (typeof window.setupDomSandbox === 'function') {
            window.setupDomSandbox(ex.id);
        }
    }

    // Toggle Hint
    function toggleHint() {
        const hintContent = document.getElementById('hint-content');
        const hintBtn = document.getElementById('hint-btn');
        if (hintContent.style.display === 'none') {
            hintContent.style.display = 'block';
            hintBtn.innerHTML = '💡 Ocultar Pista';
        } else {
            hintContent.style.display = 'none';
            hintBtn.innerHTML = '💡 Ver Pista';
        }
    }

    // Assertion Test Engine
    function runActiveTests() {
        clearTerminal();
        appendTerminalLine('info', `Iniciando pruebas para Ejercicio ${window.exercisesData[currentExerciseIndex].id}: ${window.exercisesData[currentExerciseIndex].title}...`);
        
        const ex = window.exercisesData[currentExerciseIndex];
        const resultsList = document.getElementById('test-results-list');
        resultsList.innerHTML = '';
        
        // Find corresponding student function in global scope
        const functionName = ex.functionName;
        const studentFn = window[functionName];
        
        if (!studentFn && workshopId !== 'dom_eventos') {
            appendTerminalLine('error', `ERROR: No se encontró la función '${functionName}' en el script del archivo.`);
            resultsList.innerHTML = `
                <div class="test-item failed">
                    <span class="test-status-icon">❌</span>
                    <span class="test-name">
                        Función no declarada
                        <span class="test-error-details">Asegúrate de haber guardado el archivo con la declaración de la función '<strong>function ${functionName}(...)</strong>' en el bloque de script.</span>
                    </span>
                </div>
            `;
            return;
        }

        let passedAll = true;
        let ranTests = 0;
        let passedTests = 0;

        ex.tests.forEach((test, testIdx) => {
            ranTests++;
            let testPassed = false;
            let errorMsg = '';
            
            try {
                // Call test runner assertion
                testPassed = test.assert(studentFn);
            } catch (err) {
                testPassed = false;
                errorMsg = err.message;
            }

            const item = document.createElement('div');
            item.className = `test-item ${testPassed ? 'passed' : 'failed'}`;
            
            if (testPassed) {
                passedTests++;
                item.innerHTML = `
                    <span class="test-status-icon">✅</span>
                    <span class="test-name">${test.name}</span>
                `;
            } else {
                passedAll = false;
                item.innerHTML = `
                    <span class="test-status-icon">❌</span>
                    <span class="test-name">
                        ${test.name}
                        <span class="test-error-details">${errorMsg || 'Retornó un valor incorrecto o no cumplió la condición.'}</span>
                    </span>
                `;
            }
            resultsList.appendChild(item);
        });

        // Overall outcome
        if (passedAll) {
            completedExercises.add(ex.id);
            appendTerminalLine('success', `¡FELICIDADES! Todos los casos de prueba pasaron con éxito.`);
            saveProgress();
            
            // Mark button as completed
            const buttons = document.querySelectorAll('.ex-btn');
            if (buttons[currentExerciseIndex]) {
                buttons[currentExerciseIndex].classList.add('completed');
            }
        } else {
            appendTerminalLine('error', `ALERTA: Algunos casos de prueba fallaron. Revisa los detalles e intenta de nuevo.`);
        }
    }

    // Auto-setup when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        initConsoleCapture();
        loadProgress();
        
        // Bind UI triggers
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
            hintBtn.onclick = toggleHint;
        }
        
        const runBtn = document.getElementById('run-btn');
        if (runBtn) {
            runBtn.onclick = runActiveTests;
        }

        // Load first exercise
        selectExercise(0);
    });

    // Make state accessible if necessary
    window.JSPlayground = {
        selectExercise,
        runActiveTests,
        getCompletedCount: () => completedExercises.size,
        getTotalCount: () => window.exercisesData.length,
        isCompleted: (id) => completedExercises.has(id)
    };
})();
