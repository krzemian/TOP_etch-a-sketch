// TODO: Will be set by the user in the future
// TODO: Validate input (at least a 2x2 grid required)
const GRID_WIDTH = 256;
const GRID_HEIGHT = 256;

function changeCellColor() {
    let currentBgColor = this.style.backgroundColor;

    if (currentBgColor === '') {
        // Initiate a randomized color
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        
        // This is required to keep it as inline CSS
        // Otherwise we'd need to refer to
        // window.computedStyles() every time
        this.style.opacity = '1';
        this.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    } else {
        // If the color is already set, decrease cell opacity to make it darker
        // (the grid's background color is black, which does the trick)
        const currentOpacity = Number.parseFloat(this.style.opacity);
        const newOpacity = (currentOpacity - 0.1 > 0) ? (currentOpacity - 0.1) : 0;

        this.style.opacity = newOpacity;
    }
}

document.addEventListener('DOMContentLoaded', () => 
    let cells = [];
    const numberOfCells = GRID_WIDTH * GRID_HEIGHT;
    
    // Spawn cells (.cell DOM elements)
    for (let i=0; i<numberOfCells; i++) {
        // TODO: In the future this should update the .cell declaration
        // instead of each DOM element separately
        let cell = document.createElement('div');
        cell.classList.add('cell');
        // TODO: Make it work on LMB hold only
        cell.addEventListener('mouseover', changeCellColor);
        cell.style.flexBasis = 100/GRID_WIDTH + '%';

        // !TODO: Calculate .cell height
        // (need to set fixed grid px height/width for that)

        cells.push(cell);
    }

    // Set up an empty grid
    const grid = document.querySelector('#grid');
    grid.append(...cells); 
);