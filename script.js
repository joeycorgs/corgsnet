document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.tabs');
    const tabs = document.querySelectorAll('.tab');
    const title = document.querySelector('.title');
    let currentIndex = 0;
    let tabsVisible = false;

    function updateSelection() {
        tabs.forEach((tab, index) => {
            if (index === currentIndex - 1) {
                tab.classList.add('highlighted');
            } else {
                tab.classList.remove('highlighted');
            }
        });
        if (currentIndex === 0) {
            title.querySelector('.cursor').style.display = 'inline-block';
        } else {
            title.querySelector('.cursor').style.display = 'none';
        }
    }

    function toggleTabsVisibility() {
        if (tabsVisible) {
            tabsContainer.classList.add('hidden');
            tabsVisible = false;
        } else {
            tabsContainer.classList.remove('hidden');
            tabsVisible = true;
        }
        currentIndex = 0;
        updateSelection();
    }

    // Handle keyboard navigation
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
                console.log(`Selected Tab ${currentIndex}`);
                // Add logic here to handle the tab selection
            }
        }
        updateSelection();
    });

    // Handle touch and click event on "corgs.net"
    title.addEventListener('touchstart', () => {
        if (currentIndex === 0) {
            toggleTabsVisibility();
        }
    });
    title.addEventListener('click', () => {
        if (currentIndex === 0) {
            toggleTabsVisibility();
        }
    });

    // Handle mouseover on "corgs.net" to move the cursor back
    title.addEventListener('mouseover', () => {
        currentIndex = 0;
        updateSelection();
    });

    // Handle touch, click, and hover events on tabs
    tabs.forEach((tab, index) => {
        tab.addEventListener('touchstart', () => {
            if (tabsVisible) {
                currentIndex = index + 1;
                updateSelection();
                console.log(`Selected Tab ${currentIndex}`);
                // Add logic here to handle the tab selection
            }
        });

        tab.addEventListener('click', () => {
            if (tabsVisible) {
                currentIndex = index + 1;
                updateSelection();
                console.log(`Selected Tab ${currentIndex}`);
                // Add logic here to handle the tab selection
            }
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
