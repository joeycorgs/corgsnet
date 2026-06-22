document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.tabs');
    const tabs = document.querySelectorAll('.tab');
    const title = document.querySelector('.title');
    let currentIndex = 0;
    let tabsVisible = false;
    let isTouch = false;

    function closeAllSubtabs() {
        document.querySelectorAll('.subtabs').forEach(s => s.classList.add('hidden'));
    }

    function updateSelection() {
        tabs.forEach((tab, index) => {
            tab.classList.toggle('highlighted', index === currentIndex - 1);
        });
        title.querySelector('.cursor').style.visibility = currentIndex === 0 ? 'visible' : 'hidden';
    }

    function toggleTabsVisibility() {
        if (tabsVisible) {
            tabsContainer.classList.add('hidden');
            closeAllSubtabs();
            tabsVisible = false;
        } else {
            tabsContainer.classList.remove('hidden');
            tabsVisible = true;
        }
        currentIndex = 0;
        updateSelection();
    }

    function activateTab(index) {
        const tab = tabs[index - 1];
        if (!tab) return;
        const subtabsId = tab.dataset.subtabs;
        if (!subtabsId) return;
        const subtabs = document.getElementById(subtabsId);
        if (!subtabs) return;
        // Toggle: clicking an open tab closes its subtabs
        const isOpen = !subtabs.classList.contains('hidden');
        closeAllSubtabs();
        if (!isOpen) subtabs.classList.remove('hidden');
    }

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            if (tabsVisible && currentIndex < tabs.length) currentIndex++;
        } else if (event.key === 'ArrowUp') {
            if (tabsVisible && currentIndex > 0) currentIndex--;
        } else if (event.key === 'Enter') {
            if (currentIndex === 0) {
                toggleTabsVisibility();
            } else {
                activateTab(currentIndex);
            }
        } else if (event.key === 'Escape') {
            if (tabsVisible) toggleTabsVisibility();
        }
        updateSelection();
    });

    // Title click/touch
    title.addEventListener('touchstart', (event) => {
        event.preventDefault();
        isTouch = true;
        if (currentIndex === 0) toggleTabsVisibility();
    });

    title.addEventListener('click', () => {
        if (!isTouch && currentIndex === 0) toggleTabsVisibility();
        isTouch = false;
    });

    title.addEventListener('mouseover', () => {
        currentIndex = 0;
        updateSelection();
    });

    // Tab click/touch/hover
    tabs.forEach((tab, index) => {
        tab.addEventListener('touchstart', (event) => {
            event.preventDefault();
            if (tabsVisible) {
                currentIndex = index + 1;
                updateSelection();
                activateTab(currentIndex);
            }
        });

        tab.addEventListener('click', () => {
            if (!isTouch && tabsVisible) {
                currentIndex = index + 1;
                updateSelection();
                activateTab(currentIndex);
            }
            isTouch = false;
        });

        tab.addEventListener('mouseover', () => {
            if (tabsVisible) { currentIndex = index + 1; updateSelection(); }
        });

        tab.addEventListener('mouseout', () => { updateSelection(); });
    });
});
