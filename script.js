// TODO: Will be set by the user in the future
// TODO: Validate input (at least a 2x2 grid required)
const GRID_WIDTH = 16;
const GRID_HEIGHT = 16;

document.addEventListener('DOMContentLoaded', () => {
    let cells = [];
    const numberOfCells = GRID_WIDTH * GRID_HEIGHT;
    
    // Spawn cells (.cell DOM elements)
    for (let i=0; i<numberOfCells; i++) {
        // TODO: In the future this should update the .cell declaration
        // instead of each DOM element separately
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.flexBasis = 100/GRID_WIDTH + '%';

        // !TODO: Calculate .cell height

        cells.push(cell);
    }

    const grid = document.querySelector('#grid');
    grid.append(...cells); 
});