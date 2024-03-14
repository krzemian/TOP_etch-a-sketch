function setInputAlert(node) {
    node.style.color = 'red';
    node.style.outlineColor = 'red';
    node.style.backgroundColor = 'rgb(255, 219, 219)';
}

function removeInputAlert(node) {
    node.style.color = 'revert-layer';
    node.style.outlineColor = 'revert-layer';
    node.style.backgroundColor = 'revert-layer';
}

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

function deleteCurrentGrid() {
    const grid = document.querySelector('#grid');

    // TODO!: This possibly pollutes the scope with leftover event handlers
    // Need a way to diagnose it & possibly remove them
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function drawGrid(gridCols, gridRows, gridPixelWidth, gridPixelHeight) {
    const grid = document.querySelector('#grid');
    // Fancy maths to get a proportionate corner border radius
    const borderRadius = `${Math.floor(gridPixelWidth/(gridCols*2))}px`;
    const numberOfCells = gridCols * gridRows;
    
    deleteCurrentGrid();
    let cells = [];

    for (let i=1; i<=numberOfCells; i++) {
        // TODO: In the future this should update the .cell declaration
        // instead of each DOM element separately
        let cell = document.createElement('div');
        cell.classList.add('cell');

        // For corner cells, set a nice round outer border
        if (i === 1) {
            cell.style.borderTopLeftRadius = borderRadius;
        } else if (i === gridCols) {
            cell.style.borderTopRightRadius = borderRadius;
        } else if (i === gridCols * (gridRows-1) + 1) {
            cell.style.borderBottomLeftRadius = borderRadius;
        } else if (i === gridCols * gridRows) {
            cell.style.borderBottomRightRadius = borderRadius;
        }

        // If not set there will be black bg bleeding
        grid.style.borderRadius = borderRadius;

        // TODO: Make it work on LMB hold only
        // TODO: Try adding it to #grid once and 
        // determine the target cell dynamically instead
        cell.addEventListener('mouseover', changeCellColor);
        cell.style.flexBasis = 100/gridCols + '%';

        cells.push(cell);
    }

    grid.append(...cells); 
}

document.addEventListener('DOMContentLoaded', () => {
    const DEFAULT_GRID_COLS = 64;
    const DEFAULT_GRID_ROWS = 64;
    const GRID_PX_WIDTH = 960;
    const GRID_PX_HEIGHT = 960;
    const MAX_CELLS = 100;

    const gridColsInput = document.querySelector('#gridCols');
    const gridRowsInput = document.querySelector('#gridRows');
    
    // Populate menu inputs with default col/row values
    gridColsInput.value = DEFAULT_GRID_COLS;
    gridRowsInput.value = DEFAULT_GRID_ROWS;

    // Draw initial grid
    drawGrid(DEFAULT_GRID_COLS, DEFAULT_GRID_ROWS, GRID_PX_WIDTH, GRID_PX_HEIGHT);

    // Set event handling for menu buttons
    const btn = document.querySelector('header button');
    btn.addEventListener('click', () => {
        const gridCols = Number.parseInt(gridColsInput.value);
        const gridRows = Number.parseInt(gridRowsInput.value);

        // Reset visual errors indicators, just in case
        removeInputAlert(gridColsInput);
        removeInputAlert(gridRowsInput);
        
        // Reject erroneous input
        // TODO: This should be handled live when user's typing
        if ((isNaN(gridCols) || gridCols < 1 || gridCols > MAX_CELLS) && 
          (isNaN(gridRows) || gridRows < 1 || gridRows > MAX_CELLS)) {
              setInputAlert(gridColsInput);
              setInputAlert(gridRowsInput);
        }
        else if (isNaN(gridCols) || gridCols < 1 || gridCols > MAX_CELLS) {
            setInputAlert(gridColsInput);
        } else if (isNaN(gridRows) || gridRows < 1 || gridRows > MAX_CELLS) {
            setInputAlert(gridRowsInput);
        } else {
            // TODO: Make grid pixel width/height dynamic 
            // to preserve 1:1 cell ratio
            drawGrid(gridCols, gridRows, GRID_PX_WIDTH, GRID_PX_HEIGHT);
        }
    });
});