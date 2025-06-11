let isCursorPresent = false;
export function themesButton() {
    const themeBar = document.getElementById('themeBar');
    const sidebarToggle = document.getElementById("sidebar");
    const themeBtn = document.getElementById("theme-btn");
    const themeTxt = document.getElementById("theme-text");

    if (!isCursorPresent) {
        themeBar.addEventListener("mouseenter", () => {
            themeExpand(sidebarToggle, themeBtn, themeTxt);
        });
        themeBar.addEventListener("mouseleave", () => {
            themeClose(sidebarToggle, themeBtn, themeTxt);
        });
    }
    themeBar.addEventListener("click", () => {
        isCursorPresent = true;
        clickThemebar(sidebarToggle, themeBtn, themeTxt);
    });
}
function themeClose(sidebar, btn, text) {
    sidebar.classList.toggle('expanded-themebar');
    sidebar.classList.add('hidden-themebar');
    btn.classList.add('hidden');
    btn.classList.remove('flex');
    text.classList.add('rotate-90');
}
function themeExpand(sidebar, btn, text) {
    btn.classList.remove('hidden');
    btn.classList.add('flex');
    text.classList.remove('rotate-90');
    sidebar.classList.toggle('hidden-themebar');
    sidebar.classList.add('expanded-themebar');
}
function clickThemebar(sidebar, btn, text) {
    if (sidebar.classList.contains('hidden-themebar')) {
        themeExpand(sidebar, btn, text);
    } else {
        themeClose(sidebar, btn, text);
    }
    isCursorPresent = false;
}
