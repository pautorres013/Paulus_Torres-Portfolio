const themeBar = document.getElementById("themeBar");
const body = document.body;

const themeNavHTML = `
        <div id="sidebar" class="fixed  left-0 top-0 rounded-r-full cursor-pointer text-[var(--color-text)] 
                        flex items-center justify-center h-full hidden-themebar hover:opacity-80 overflow-hidden 
                        transition-all duration-500 ease-in-out flex-col bg-[var(--color-primary)] opacity-30 z-10 space-y-5">         
        <span class="rotate-90 whitespace-nowrap tracking-widest text-lg" id ='theme-text'>THEMES</span>
            <div id = 'theme-btn' class = 'hidden flex-col space-y-3 '>
                <button id="default-theme" class="bg-[var(--color-bg)]  
                    hover:bg-[var(--color-hover-bg)] hover:text-[var(--color-tertiary)] rounded-full text-[var(--color-text)] w-16 cursor-pointer">
                    Default
                </button>
                <button id="pastel-theme" class="bg-[var(--color-bg)]  
                    hover:bg-[var(--color-hover-bg)] hover:text-[var(--color-secondary)] rounded-full text-[var(--color-text)] w-16 cursor-pointer">
                    Pastel
                </button>
                <button id="retro-theme" class="bg-[var(--color-bg)]  
                    hover:bg-[var(--color-hover-bg)] hover:text-[var(--color-primary)] rounded-full text-[var(--color-primary)] w-16 cursor-pointer">
                    Retro
                </button>  
            </div>
        </div>
`;

themeBar.innerHTML = themeNavHTML;

// 🔥 Now select the buttons AFTER injecting HTML
let defaultThemeBtn = document.querySelector("#default-theme");
let pastelThemeBtn = document.querySelector("#pastel-theme");
let retroThemeBtn = document.querySelector("#retro-theme");

export function themeNavi() {
  retroThemeBtn.classList.add("retro-theme");
  pastelThemeBtn.classList.add("pastel-theme");
  defaultThemeBtn.classList.add("default-theme");
}

const themes = ["default-theme", "pastel-theme", "retro-theme"];
let currentTheme = localStorage.getItem("theme") || "default-theme";

body.classList.add(currentTheme);

export function themeEvents() {
  try {
    defaultThemeBtn.addEventListener("click", () => {
      body.classList.remove(...themes);
      body.classList.add("default-theme");

      localStorage.setItem("theme", "default-theme");
      currentTheme = "default-theme";
    });

    pastelThemeBtn.addEventListener("click", () => {
      body.classList.remove(...themes);
      body.classList.add("pastel-theme");

      localStorage.setItem("theme", "pastel-theme");
      currentTheme = "pastel-theme";
    });

    retroThemeBtn.addEventListener("click", () => {
      body.classList.remove(...themes);
      body.classList.add("retro-theme");

      localStorage.setItem("theme", "retro-theme");
      currentTheme = "retro-theme";
    });
  } catch (error) {
    console.error("Error in themeEvents:", error);
  }
}
