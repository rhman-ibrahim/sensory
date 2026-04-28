function updateThemeColor(e) {
    e.preventDefault();
    const themeColorInput = document.getElementById("theme-color-input");
    if (!themeColorInput) return;
    
    const colorValue = themeColorInput.value.trim();
    
    if (CSS.supports("color", colorValue)) {
        document.documentElement.style.setProperty("--th", colorValue);
        console.log(`Theme color updated to: ${colorValue}`);
    } else {
        console.warn(`Invalid color: "${colorValue}"`);
        themeColorInput.style.borderColor = "black";
        setTimeout(
            () => {
                themeColorInput.style.borderColor = "";
            },
            1000
        );
    }
}

document.addEventListener(
    "DOMContentLoaded",
    () => {
        const themeColorButton = document.getElementById("theme-color-button");
        if (themeColorButton) {
            themeColorButton.addEventListener("click", updateThemeColor);
        }
    }
);