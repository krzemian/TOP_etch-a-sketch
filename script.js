// TODO: Will be set by the user in the future
// TODO: Validate input (at least a 2x2 grid required)
const GRID_WIDTH = 16;
const GRID_HEIGHT = 16;

function changeCellColor() {
    // Randomize color
    const hue = Math.floor(Math.random() * 361);
    const saturation = Math.floor(Math.random() * 101);
    const lightness = Math.floor(Math.random() * 101);

    this.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

document.addEventListener('DOMContentLoaded', () => {
    let cells = [];
    const numberOfCells = GRID_WIDTH * GRID_HEIGHT;
    
    // Spawn cells (.cell DOM elements)
    for (let i=0; i<numberOfCells; i++) {
        // TODO: In the future this should update the .cell declaration
        // instead of each DOM element separately
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', changeCellColor);
        cell.style.flexBasis = 100/GRID_WIDTH + '%';

        // !TODO: Calculate .cell height
        // (need to set fixed grid px height/width for that)

        cells.push(cell);
    }

    // Set up an empty grid
    const grid = document.querySelector('#grid');
    grid.append(...cells); 

    // Set an onhover event listener for all cells
    // When hovered, the cell should get a new style with bg color black
    // TODO: In the future, it should choose random colors
    // TODO: Then, it should start from 10% opacity and increase it by 10% until 100%
    // (So: see if it has a bgColor, if so, grab it, check the opacity, increase it) 
});