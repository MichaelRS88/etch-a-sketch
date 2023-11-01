// Initialize variables and get elements
const sketch = document.getElementById("sketch");
const penColorPicker = document.getElementById("penColorPicker"); // Get the color picker input
const bgColorButton = document.getElementById("bgColorButton");
const eraserButton = document.getElementById("eraserButton");
const rainbowButton = document.getElementById("rainbowButton");
const shadingButton = document.getElementById("shadingButton");
const gridSizeRange = document.getElementById("gridSizeRange");
let drawing = false;
let penColor = "#000000"; // Default pen color
let bgColor = "white";
let isEraser = false;
let isRainbow = false;
let isShading = false;

// Function to create the grid
function createGrid(gridSize) {
    sketch.innerHTML = '';
    sketch.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        sketch.appendChild(cell);
    }

    // Event listeners for drawing
    document.addEventListener("mousedown", () => {
        drawing = true;
    });

    document.addEventListener("mouseup", () => {
        drawing = false;
        sketch.style.cursor = "default";
    });

    sketch.addEventListener("mousemove", (e) => {
        if (drawing) {
            sketch.style.cursor = "crosshair";
            e.target.style.backgroundColor = isEraser ? bgColor : (isRainbow ? getRandomColor() : penColor);

            if (isShading) {
                if (e.target.style.opacity === "") {
                    e.target.style.opacity = "0.1";
                } else {
                    e.target.style.opacity = parseFloat(e.target.style.opacity) + 0.1;
                }
            }
        }
    });
}

// Function to get a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to clear the sketch
function clearSketch() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = bgColor;
        cell.style.opacity = "";
    });
}

// Event listeners for color picker input
penColorPicker.addEventListener("input", () => {
    penColor = penColorPicker.value;
});

// Event listeners for buttons and controls
bgColorButton.addEventListener("click", () => {
    bgColor = prompt("Enter background color (e.g., white, #CCCCCC):", bgColor);
    sketch.style.backgroundColor = bgColor;
});

eraserButton.addEventListener("click", () => {
    isEraser = !isEraser;
    eraserButton.classList.toggle("active");
});

rainbowButton.addEventListener("click", () => {
    isRainbow = !isRainbow;
    rainbowButton.classList.toggle("active");
});

shadingButton.addEventListener("click", () => {
    isShading = !isShading;
    shadingButton.classList.toggle("active");
});

gridSizeRange.addEventListener("input", () => {
    createGrid(gridSizeRange.value);
});

// Initial grid creation
createGrid(gridSizeRange.value);
