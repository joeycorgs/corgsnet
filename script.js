// ─── Utility ──────────────────────────────────────────────────────────────────

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function typeLine(container, text, speed = 12, cls = '') {
    const line = document.createElement('div');
    if (cls) line.className = cls;
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;
    for (const ch of text) {
        line.textContent += ch;
        await sleep(speed);
    }
    return line;
}

async function blank(container) {
    container.appendChild(document.createElement('div'));
}

async function progressBar(container, label, duration = 650) {
    const line = document.createElement('div');
    container.appendChild(line);
    const cols = 22;
    for (let i = 0; i <= cols; i++) {
        const bar = '█'.repeat(i) + '░'.repeat(cols - i);
        const pct = Math.round((i / cols) * 100).toString().padStart(3);
        line.textContent = `${label} [${bar}] ${pct}%`;
        await sleep(duration / cols);
    }
}

async function fadeOut(el, ms = 280) {
    el.style.transition = `opacity ${ms}ms ease`;
    el.style.opacity = '0';
    await sleep(ms + 20);
    el.style.display = 'none';
    el.style.opacity = '';
    el.style.transition = '';
}

// ─── Phase 1: BIOS boot ───────────────────────────────────────────────────────

async function runBoot() {
    const s = document.getElementById('boot-screen');

    await typeLine(s, 'CORGS-BIOS v2.069   Copyright (C) 1994-2026 CORGS Corporation', 5);
    await blank(s);
    await typeLine(s, 'CPU: CORGI-9000 Hexacore @ 3.14 GHz                    [OK]', 4);
    await typeLine(s, 'Memory Test: 2097152K OK', 4);
    await typeLine(s, 'Extended Memory: 2096128K OK', 4);
    await sleep(50);
    await blank(s);
    await typeLine(s, 'Detecting Primary Master   ...... [CORGS_SSD_01]', 4);
    await typeLine(s, 'Detecting Primary Slave    ...... [NONE]', 4);
    await typeLine(s, 'Detecting Secondary Master ...... [USB_3.0_HUB]', 4);
    await sleep(50);
    await blank(s);
    await progressBar(s, 'Loading CORGS-OS v6.66  ', 650);
    await sleep(70);
    await blank(s);
    await typeLine(s, 'CORGS-OS v6.66 [Build 1337-RELEASE]', 4);
    await typeLine(s, '(c) 2026 CORGS Corporation. All rights reserved.', 4);
    await sleep(80);
    await blank(s);
    await typeLine(s, 'Starting subsystems...', 7);
    await typeLine(s, '  [  OK  ] memory-manager.service', 3);
    await typeLine(s, '  [  OK  ] filesystem.service', 3);
    await typeLine(s, '  [  OK  ] network-interface.service', 3);
    await typeLine(s, '  [  OK  ] crypto-daemon.service', 3);
    await typeLine(s, '  [  OK  ] display-manager.service', 3);
    await sleep(150);

    await fadeOut(s, 220);
    await runLogin();
}

// ─── Phase 2: Fake login ──────────────────────────────────────────────────────

async function runLogin() {
    const s = document.getElementById('login-screen');
    s.style.display = 'block';

    await sleep(80);
    await typeLine(s, 'CORGS-OS v6.66 — Secure Shell', 8);
    await blank(s);

    // Username: typed with natural jitter
    const userLine = document.createElement('div');
    s.appendChild(userLine);
    for (const ch of 'login: ') { userLine.textContent += ch; await sleep(7); }
    await sleep(200);
    for (const ch of 'j0ey') { userLine.textContent += ch; await sleep(70 + Math.random() * 40); }
    await sleep(160);

    // Password: dots appear with jitter
    const passLine = document.createElement('div');
    s.appendChild(passLine);
    for (const ch of 'password: ') { passLine.textContent += ch; await sleep(7); }
    await sleep(280);
    for (let i = 0; i < 9; i++) {
        passLine.textContent += '●';
        await sleep(60 + Math.random() * 45);
    }
    await sleep(220);

    // Auth
    await blank(s);
    const authLine = await typeLine(s, 'Authenticating', 18);
    for (let i = 0; i < 3; i++) { await sleep(170); authLine.textContent += '.'; }
    await sleep(200);
    authLine.textContent += '  DONE';
    await sleep(120);

    await blank(s);
    await typeLine(s, 'ACCESS GRANTED', 15, 'access-granted');
    await sleep(100);
    await typeLine(s, 'Welcome back, j0ey.', 18);
    await sleep(80);
    await typeLine(s, 'Establishing encrypted session...', 12);
    await sleep(300);

    await fadeOut(s, 220);
    await runMatrix();
}

// ─── Phase 3: Matrix rain ─────────────────────────────────────────────────────

const MATRIX_CHARS =
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*<>[]{}|/?';

function startMatrixRain(canvas) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const fs  = 14;
    const cols = Math.floor(canvas.width / fs);
    const drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -(canvas.height / fs)));

    function frame() {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${fs}px monospace`;
        for (let i = 0; i < cols; i++) {
            const ch = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
            ctx.fillStyle = (drops[i] < 3) ? '#b0ffb0' : '#0f0';
            ctx.fillText(ch, i * fs, drops[i] * fs);
            if (drops[i] * fs > canvas.height && Math.random() > 0.972) drops[i] = 0;
            drops[i]++;
        }
    }
    return setInterval(frame, 33);
}

async function runMatrix() {
    const canvas  = document.getElementById('matrix-canvas');
    const mtxt    = document.getElementById('matrix-text');
    const overlay = document.getElementById('boot-overlay');
    canvas.style.display = 'block';
    mtxt.style.display   = 'block';

    const rainInterval = startMatrixRain(canvas);
    await sleep(380);

    // Shorter hacker text
    for (const line of [
        '> SPOOFING MAC ADDRESS............... [OK]',
        '> BYPASSING FIREWALL................. [OK]',
        '> ROUTING THROUGH 7 PROXIES.......... [OK]',
        '> ACCESSING MAINFRAME................ [OK]',
        '> WIPING ACCESS LOGS................. [OK]',
        '',
        '> SYSTEM COMPROMISED. LOADING...',
    ]) {
        await typeLine(mtxt, line, 12);
        await sleep(line === '' ? 40 : 70);
    }

    await sleep(280);

    // Freeze the rain (last frame persists visually while overlay falls)
    clearInterval(rainInterval);

    // Reveal main content underneath (it's behind the overlay in z-order)
    const main = document.getElementById('main-content');
    main.style.opacity = '1';
    main.style.pointerEvents = 'auto';

    // Slide the ENTIRE boot overlay off the bottom — smooth fall effect
    // cubic-bezier(0.4,0,1,1) = ease-in so it accelerates like gravity
    overlay.style.transition = 'transform 760ms cubic-bezier(0.4, 0, 1, 1)';
    overlay.style.transform  = 'translateY(110vh)';

    // Wait for overlay to clear the title area (~22% down) then start typing.
    // With this ease-in curve, ~22% of the 110vh distance is crossed at ~310ms.
    await sleep(310);

    const titleEl = document.getElementById('title-text');
    for (const ch of 'corgs.net') {
        titleEl.textContent += ch;
        await sleep(76);
    }

    // Fall is complete; clean up overlay
    overlay.style.display = 'none';
    overlay.style.transform = '';

    initInteraction();
}

// ─── Main interaction ──────────────────────────────────────────────────────────

function initInteraction() {
    const tabsContainer = document.getElementById('tabs-container');
    const titleWrapper  = document.getElementById('title-wrapper');
    const cursor        = document.querySelector('.cursor');

    let currentIndex = 0;   // 0 = focus on title, 1+ = nav items
    let tabsVisible  = false;
    let animating    = false;
    let isTouch      = false;

    // Flat list of navigable elements: tabs interleaved with their open subtabs
    function getNavItems() {
        const items = [];
        tabsContainer.querySelectorAll('.tab').forEach(tab => {
            items.push({ el: tab, type: 'tab' });
            const subId = tab.dataset.subtabs;
            if (subId) {
                const sub = document.getElementById(subId);
                if (sub && sub.style.display !== 'none') {
                    sub.querySelectorAll('.subtab').forEach(st => {
                        items.push({ el: st, type: 'subtab' });
                    });
                }
            }
        });
        return items;
    }

    function updateHighlight() {
        tabsContainer.querySelectorAll('.tab, .subtab').forEach(el => el.classList.remove('highlighted'));
        const items = getNavItems();
        if (currentIndex > 0 && items[currentIndex - 1]) {
            items[currentIndex - 1].el.classList.add('highlighted');
        }
        cursor.style.visibility = currentIndex === 0 ? 'visible' : 'hidden';
    }

    async function typeLabel(el) {
        const label = el.dataset.label || '';
        el.textContent = '';
        for (const ch of label) {
            el.textContent += ch;
            await sleep(34);
        }
    }

    async function closeAllSubtabs() {
        tabsContainer.querySelectorAll('.subtabs').forEach(sub => {
            sub.style.display = 'none';
            sub.querySelectorAll('.subtab').forEach(st => { st.textContent = ''; });
        });
    }

    async function showTabs() {
        tabsContainer.style.display = 'flex';
        for (const tab of tabsContainer.querySelectorAll('.tab')) {
            await typeLabel(tab);
            await sleep(48);
        }
    }

    async function hideTabs() {
        await closeAllSubtabs();
        tabsContainer.style.display = 'none';
        tabsContainer.querySelectorAll('.tab').forEach(t => { t.textContent = ''; });
    }

    async function toggleTabs() {
        if (animating) return;
        animating = true;
        if (tabsVisible) {
            await hideTabs();
            tabsVisible = false;
        } else {
            tabsVisible = true;
            await showTabs();
        }
        currentIndex = 0;
        updateHighlight();
        animating = false;
    }

    async function activateItem() {
        if (animating) return;
        if (currentIndex === 0) { await toggleTabs(); return; }

        const item = getNavItems()[currentIndex - 1];
        if (!item) return;

        if (item.type === 'tab') {
            const subId = item.el.dataset.subtabs;
            if (!subId) return;
            const sub    = document.getElementById(subId);
            const isOpen = sub.style.display !== 'none';
            animating = true;
            await closeAllSubtabs();
            if (!isOpen) {
                sub.style.display = 'flex';
                for (const st of sub.querySelectorAll('.subtab')) {
                    await typeLabel(st);
                    await sleep(32);
                }
            }
            animating = false;
            updateHighlight();
        } else {
            const href = item.el.getAttribute('href');
            if (href) window.open(href, '_blank', 'noopener');
        }
    }

    // ── Keyboard ──
    document.addEventListener('keydown', async e => {
        if (!tabsVisible && e.key !== 'Enter') return;
        const items = getNavItems();
        if (e.key === 'ArrowDown') {
            if (currentIndex < items.length) currentIndex++;
            updateHighlight();
        } else if (e.key === 'ArrowUp') {
            if (currentIndex > 0) currentIndex--;
            updateHighlight();
        } else if (e.key === 'Enter') {
            await activateItem();
        } else if (e.key === 'Escape') {
            if (tabsVisible) await toggleTabs();
        }
    });

    // ── Title click / tap ──
    titleWrapper.style.cursor = 'pointer';
    titleWrapper.addEventListener('touchstart', e => {
        e.preventDefault(); isTouch = true; toggleTabs();
    });
    titleWrapper.addEventListener('click', () => {
        if (!isTouch) toggleTabs(); isTouch = false;
    });
    titleWrapper.addEventListener('mouseover', () => { currentIndex = 0; updateHighlight(); });

    // ── Tab & subtab mouse / click (delegated) ──
    tabsContainer.addEventListener('mouseover', e => {
        const el = e.target.closest('.tab, .subtab');
        if (!el || !tabsVisible) return;
        const i = getNavItems().findIndex(it => it.el === el);
        if (i !== -1) { currentIndex = i + 1; updateHighlight(); }
    });

    tabsContainer.addEventListener('click', async e => {
        if (isTouch) { isTouch = false; return; }
        const el = e.target.closest('.tab, .subtab');
        if (!el || !tabsVisible) return;
        const i = getNavItems().findIndex(it => it.el === el);
        if (i !== -1) { currentIndex = i + 1; await activateItem(); }
    });

    tabsContainer.addEventListener('touchstart', async e => {
        const el = e.target.closest('.tab, .subtab');
        if (!el || !tabsVisible) return;
        e.preventDefault(); isTouch = true;
        const i = getNavItems().findIndex(it => it.el === el);
        if (i !== -1) { currentIndex = i + 1; await activateItem(); }
    });
}

// ─── Boot ──────────────────────────────────────────────────────────────────────
runBoot();
