/**
 * MI PROYECTO - BASE DE DATOS II & EMPRENDIMIENTOS
 * Interactive Portal Logic (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initStepNavigation();
  initChecklistProgress();
  initColorPaletteGenerator();
  initDbExplorer();
  initAgentMemoryGenerator();
  initCopyButtons();
  initUiModal();
});

// Step sequence definition
const STEPS = [
  { id: 'tab-contexto', num: 1, title: '1. Visión & Contexto', nextId: 'tab-diseno', nextTitle: '2. Sistema de Diseño (IA)' },
  { id: 'tab-diseno', num: 2, title: '2. Sistema de Diseño (IA)', prevId: 'tab-contexto', prevTitle: '1. Visión & Contexto', nextId: 'tab-bd', nextTitle: '3. Modelo E-R en DRAWIO' },
  { id: 'tab-bd', num: 3, title: '3. Modelo E-R en DRAWIO', prevId: 'tab-diseno', prevTitle: '2. Sistema de Diseño', nextId: 'tab-guias', nextTitle: '4. Guía GitHub & Laravel' },
  { id: 'tab-guias', num: 4, title: '4. Guía GitHub & Laravel', prevId: 'tab-bd', prevTitle: '3. Modelo E-R en DRAWIO', nextId: 'tab-agent', nextTitle: '5. Entorno Agéntico (AGENT.md)' },
  { id: 'tab-agent', num: 5, title: '5. Entorno Agéntico (AGENT.md)', prevId: 'tab-guias', prevTitle: '4. Guía GitHub & Laravel', nextId: 'tab-docs', nextTitle: '6. Interfaz, Backend & Guía UI' },
  { id: 'tab-docs', num: 6, title: '6. Interfaz, Backend & Guía UI', prevId: 'tab-agent', prevTitle: '5. Entorno Agéntico', nextId: null, nextTitle: null }
];

/* ==========================================================================
   1. Tab Navigation System
   ========================================================================== */
function switchTab(targetId, shouldScroll = false) {
  const tabButtons = document.querySelectorAll('.tab-btn:not(.db-tab-btn)');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(b => {
    if (b.getAttribute('data-tab') === targetId) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  tabContents.forEach(c => {
    if (c.id === targetId) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });

  updateStepIndicators(targetId);

  if (shouldScroll) {
    const mainSection = document.querySelector('main');
    if (mainSection) {
      const topOffset = mainSection.getBoundingClientRect().top + window.pageYOffset - 30;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  }
}

function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn:not(.db-tab-btn)');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      if (targetId) switchTab(targetId, false);
    });
  });
}

/* ==========================================================================
   1.1 Step-by-Step Navigation System
   ========================================================================== */
function initStepNavigation() {
  document.querySelectorAll('.btn-step-next').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextTab = btn.getAttribute('data-next-tab');
      if (nextTab) {
        switchTab(nextTab, true);
      }
    });
  });

  document.querySelectorAll('.btn-step-prev').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prevTab = btn.getAttribute('data-prev-tab');
      if (prevTab) {
        switchTab(prevTab, true);
      }
    });
  });

  document.querySelectorAll('.btn-step-finish').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const checklistSection = document.querySelector('.checklist');
      if (checklistSection) {
        checklistSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  updateStepIndicators('tab-contexto');
}

function updateStepIndicators(activeTabId) {
  const currentStep = STEPS.find(s => s.id === activeTabId) || STEPS[0];
  const stepPercent = Math.round((currentStep.num / STEPS.length) * 100);

  // Update step badges and mini progress bars in all step navigation footers
  document.querySelectorAll('.step-nav-footer').forEach(footer => {
    const badgeCurrent = footer.querySelector('.step-badge-current');
    if (badgeCurrent) {
      badgeCurrent.innerHTML = `<i class="fa-solid fa-shoe-prints"></i> Paso ${currentStep.num} de ${STEPS.length}`;
    }

    const badgeProgress = footer.querySelector('.step-badge-progress');
    if (badgeProgress) {
      badgeProgress.innerHTML = `<i class="fa-solid fa-chart-line"></i> Progreso de Pasos: ${stepPercent}%`;
    }

    const miniFill = footer.querySelector('.step-mini-fill');
    if (miniFill) {
      miniFill.style.width = `${stepPercent}%`;
    }
  });
}

/* ==========================================================================
   2. Checklist Tracking System (localStorage)
   ========================================================================== */
function initChecklistProgress() {
  const checkboxes = document.querySelectorAll('.check-item input[type="checkbox"]');
  const STORAGE_KEY = 'uner_sec_mi_proyecto_progress';

  // Load saved state
  const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

  checkboxes.forEach((cb, index) => {
    const itemKey = `item_${index}`;
    if (savedState[itemKey]) {
      cb.checked = true;
      cb.closest('.check-item')?.classList.add('completed');
    }

    cb.addEventListener('change', () => {
      const isChecked = cb.checked;
      const parent = cb.closest('.check-item');
      if (isChecked) {
        parent?.classList.add('completed');
      } else {
        parent?.classList.remove('completed');
      }

      // Save state
      savedState[itemKey] = isChecked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
    });
  });
}

/* ==========================================================================
   3. Brand Color Palette Studio & Live Shade Generator
   ========================================================================== */
function initColorPaletteGenerator() {
  const hexInput = document.getElementById('primary-color-hex');
  const colorPicker = document.getElementById('primary-color-picker');
  const swatchContainer = document.getElementById('swatch-scale-container');
  const cssCodeOutput = document.getElementById('generated-css-code');

  if (!hexInput || !colorPicker || !swatchContainer) return;

  // Sync inputs
  hexInput.addEventListener('input', (e) => {
    let val = e.target.value;
    if (val.charAt(0) !== '#') val = '#' + val;
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      colorPicker.value = val;
      generateScale(val);
    }
  });

  colorPicker.addEventListener('input', (e) => {
    hexInput.value = e.target.value;
    generateScale(e.target.value);
  });

  // Initial scale generation
  generateScale(colorPicker.value);

  function generateScale(baseHex) {
    const hsl = hexToHSL(baseHex);
    const shades = [
      { step: 50, lightness: 95 },
      { step: 100, lightness: 90 },
      { step: 200, lightness: 80 },
      { step: 300, lightness: 70 },
      { step: 400, lightness: 60 },
      { step: 500, lightness: hsl.l }, // Base color
      { step: 600, lightness: Math.max(hsl.l - 10, 15) },
      { step: 700, lightness: Math.max(hsl.l - 20, 10) },
      { step: 800, lightness: Math.max(hsl.l - 30, 8) },
      { step: 900, lightness: Math.max(hsl.l - 40, 5) }
    ];

    swatchContainer.innerHTML = '';
    let cssVarBlock = `:root {\n`;

    shades.forEach(item => {
      const hex = hslToHex(hsl.h, hsl.s, item.lightness);
      document.documentElement.style.setProperty(`--primary-${item.step}`, hex);

      cssVarBlock += `  --primary-${item.step}: ${hex};\n`;

      const swatch = document.createElement('div');
      swatch.className = 'swatch-box';
      swatch.style.backgroundColor = hex;
      swatch.innerHTML = `<span>${item.step}</span><span>${hex}</span>`;
      swatchContainer.appendChild(swatch);
    });

    cssVarBlock += `}`;
    if (cssCodeOutput) {
      cssCodeOutput.textContent = cssVarBlock;
    }

    // Refresh memory template if available
    updateAgentMemoryContent();
  }
}

/* ==========================================================================
   4. Helper Math Functions (HEX / HSL Conversion)
   ========================================================================== */
function hexToHSL(H) {
  let r = 0, g = 0, b = 0;
  if (H.length === 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length === 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  r /= 255; g /= 255; b /= 255;
  let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
  let h = 0, s = 0, l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;

  return "#" + r + g + b;
}

/* ==========================================================================
   5. Database Circuit Sub-Explorer Logic
   ========================================================================== */
function initDbExplorer() {
  const dbTabBtns = document.querySelectorAll('.db-tab-btn');
  const dbTabContents = document.querySelectorAll('.db-tab-content');

  dbTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-dbtab');
      dbTabBtns.forEach(b => b.classList.remove('active'));
      dbTabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });
}

/* ==========================================================================
   6. Dynamic AGENT.md Memory Generator & Exporter (SQLite Configured)
   ========================================================================== */
function initAgentMemoryGenerator() {
  const startupNameInput = document.getElementById('agent-startup-name');
  const startupSloganInput = document.getElementById('agent-startup-slogan');

  if (startupNameInput) startupNameInput.addEventListener('input', updateAgentMemoryContent);
  if (startupSloganInput) startupSloganInput.addEventListener('input', updateAgentMemoryContent);
}

function updateAgentMemoryContent() {
  const name = document.getElementById('agent-startup-name')?.value || 'Mi Emprendimiento';
  const slogan = document.getElementById('agent-startup-slogan')?.value || 'Innovación y calidad a tu alcance';
  const hex = document.getElementById('primary-color-hex')?.value || '#6366f1';
  const codeBox = document.getElementById('agent-memory-template-code');

  if (!codeBox) return;

  const markdownContent = `# MEMORIA DEL PROYECTO: ${name.toUpperCase()}

## 📌 Visión del Emprendimiento
- **Nombre**: ${name}
- **Slogan**: "${slogan}"
- **Color Primario (Hex)**: ${hex}

## 🚀 Arquitectura Tecnológica
- **Framework Core**: Laravel (PHP)
- **Frontend Logic**: JavaScript Vanilla
- **Estilos**: Pure CSS / Vanilla CSS (sin frameworks pesados como Tailwind)
- **Base de Datos**: SQLite (almacenada en \`database/database.sqlite\`, sin MySQL en XAMPP)

## 🎨 Sistema de Diseño
- Usar variables CSS en \`public/css/app.css\` para los colores base.
- Mantener bordes redondeados (\`--radius-md: 14px\`), sombras suaves y glassmorphism en tarjetas.
- Los botones principales deben usar el color primario \`${hex}\`.

## ⚙️ Procesos Claves e Hitos
1. **Circuito de Ventas y Pedidos**: Confirmación de pedido, asignación de estado y descuento automático de stock.
2. **Adquisición y Materia Prima**: Registro de proveedores y recepción de insumos.
3. **Gestión de Stock**: Puntos de reorden e historial de movimientos.

## 🤖 Directivas para el Entorno Agéntico (Antigravity)
- Usar \`DB_CONNECTION=sqlite\` en el archivo \`.env\`.
- Preservar comentarios explicativos en PHP y JavaScript.
- No alterar firmas de métodos ni esquemas SQL sin actualizar sus migraciones.
- Documentar cada módulo en la carpeta \`docs/\`.
`;

  codeBox.textContent = markdownContent;
}

/* ==========================================================================
   7. Copy to Clipboard Functionality
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      let textToCopy = '';

      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) textToCopy = targetEl.textContent || targetEl.innerText;
      } else {
        textToCopy = btn.getAttribute('data-copy-text') || '';
      }

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy.trim()).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = `<span>✓ ¡Copiado!</span>`;
          btn.style.background = '#10b981';
          btn.style.borderColor = '#10b981';
          btn.style.color = '#ffffff';

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.color = '';
          }, 2000);
        }).catch(err => {
          console.error('Error al copiar: ', err);
        });
      }
    });
  });
}

/* ==========================================================================
   8. Interactive UI Components Modal Logic
   ========================================================================== */
function initUiModal() {
  const modalOverlay = document.getElementById('ui-components-modal');
  const btnOpen = document.getElementById('btn-open-ui-hint');
  const btnClose = document.getElementById('btn-close-ui-modal');
  const btnCloseFooter = document.getElementById('btn-modal-close-footer');

  if (!modalOverlay || !btnOpen) return;

  function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  btnOpen.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCloseFooter) btnCloseFooter.addEventListener('click', closeModal);

  // Close when clicking on backdrop
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}
