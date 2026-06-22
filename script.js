document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.tabs');
    const tabs = document.querySelectorAll('.tab');
    const title = document.querySelector('.title');
    const panels = document.querySelectorAll('.panel');
    let currentIndex = 0;
    let tabsVisible = false;
    let isTouch = false;

    function hideAllPanels() {
        panels.forEach(p => p.classList.add('hidden'));
    }

    function updateSelection() {
        tabs.forEach((tab, index) => {
            if (index === currentIndex - 1) {
                tab.classList.add('highlighted');
            } else {
                tab.classList.remove('highlighted');
            }
        });
        if (currentIndex === 0) {
            title.querySelector('.cursor').style.visibility = 'visible';
        } else {
            title.querySelector('.cursor').style.visibility = 'hidden';
        }
    }

    function toggleTabsVisibility() {
        if (tabsVisible) {
            tabsContainer.classList.add('hidden');
            hideAllPanels();
            tabsVisible = false;
        } else {
            tabsContainer.classList.remove('hidden');
            tabsVisible = true;
        }
        currentIndex = 0;
        updateSelection();
    }

    function activateTab(index) {
        // index is 1-based (currentIndex convention)
        hideAllPanels();
        const tab = tabs[index - 1];
        if (!tab) return;
        const panelId = tab.dataset.panel;
        if (panelId) {
            const panel = document.getElementById(panelId);
            if (panel) panel.classList.remove('hidden');
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            if (tabsVisible && currentIndex < tabs.length) {
                currentIndex++;
            }
        } else if (event.key === 'ArrowUp') {
            if (tabsVisible && currentIndex > 0) {
                currentIndex--;
            }
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

    // Click/touch on title
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

    // Click/touch/hover on tabs
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
            if (tabsVisible) {
                currentIndex = index + 1;
                updateSelection();
            }
        });

        tab.addEventListener('mouseout', () => {
            updateSelection();
        });
    });
});
