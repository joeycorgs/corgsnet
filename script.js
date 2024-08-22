document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.tabs');
    const tabs = document.querySelectorAll('.tab');
    const title = document.querySelector('.title');
    let currentIndex = 0;
    let tabsVisible = false;
    let isTouch = false;

    function updateSelection() {
        tabs.forEach((tab, index) => {
            if (index === currentIndex - 1) {
                tab.classList.add('highlighted');
            } else {
                tab.classList.remove('highlighted');
            }
        });
        if (currentIndex === 0) {
            title.querySelector('.cursor').style.visibility = 'visible'; // Cursor is visible
        } else {
            title.querySelector('.cursor').style.visibility = 'hidden'; // Cursor is invisible but still in the layout
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
    title.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Prevent default touch behavior
        isTouch = true; // Mark that a touch event is happening
        if (currentIndex === 0) {
            toggleTabsVisibility();
        }
    });

    title.addEventListener('click', () => {
        if (!isTouch && currentIndex === 0) {
            toggleTabsVisibility();
        }
        isTouch = false; // Reset touch flag
    });

    // Handle mouseover on "corgs.net" to move the cursor back
    title.addEventListener('mouseover', () => {
        currentIndex = 0;
        updateSelection();
    });

    // Handle touch, click, and hover events on tabs
    tabs.forEach((tab, index) => {
        tab.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Prevent default touch behavior
            if (tabsVisible) {
                currentIndex = index + 1;
                updateSelection();
                console.log(`Selected Tab ${currentIndex}`);
                // Add logic here to handle the tab selection
            }
        });

        tab.addEventListener('click', () => {
            if (!isTouch && tabsVisible) {
                currentIndex = index + 1;
                updateSelection();
                console.log(`Selected Tab ${currentIndex}`);
                // Add logic here to handle the tab selection
            }
            isTouch = false; // Reset touch flag
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
