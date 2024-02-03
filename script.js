function setInputAlert(node) {
    node.style.borderColor = 'red';
    node.style.backgroundColor = 'rgb(255, 219, 219)';
}

function removeInputAlert(node) {
    node.style.borderColor = 'revert';
    node.style.backgroundColor = 'revert';
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

document.addEventListener('DOMContentLoaded', () => {
    // TODO: Will be set by the user in the future
    // TODO: Validate input (at least a 2x2 grid required)
    const DEFAULT_GRID_WIDTH = 16;
    const DEFAULT_GRID_HEIGHT = 16;
    const MAX_CELLS = 100;
    const borderRadius = `${DEFAULT_GRID_WIDTH*2}px`;

    const grid = document.querySelector('#grid');
    const gridWidthInput = document.querySelector('#gridWidth');
    const gridHeightInput = document.querySelector('#gridHeight');

    let cells = [];
    const numberOfCells = DEFAULT_GRID_WIDTH * DEFAULT_GRID_HEIGHT;

    // Populate menu inputs with default width/height values
    gridWidthInput.value = DEFAULT_GRID_WIDTH;
    gridHeightInput.value = DEFAULT_GRID_HEIGHT;

    // Spawn cells
    for (let i=1; i<=numberOfCells; i++) {
        // TODO: In the future this should update the .cell declaration
        // instead of each DOM element separately
        let cell = document.createElement('div');
        cell.classList.add('cell');

        // For corner cells, set a nice round outer border
        if (i === 1) {
            cell.style.borderTopLeftRadius = borderRadius;
        } else if (i === DEFAULT_GRID_WIDTH) {
            cell.style.borderTopRightRadius = borderRadius;
        } else if (i === DEFAULT_GRID_WIDTH * (DEFAULT_GRID_HEIGHT-1) + 1) {
            cell.style.borderBottomLeftRadius = borderRadius;
        } else if (i === DEFAULT_GRID_WIDTH * DEFAULT_GRID_HEIGHT) {
            cell.style.borderBottomRightRadius = borderRadius;
        }

        // If not set there will be black bg bleeding
        grid.style.borderRadius = borderRadius;

        // TODO: Make it work on LMB hold only
        cell.addEventListener('mouseover', changeCellColor);
        cell.style.flexBasis = 100/DEFAULT_GRID_WIDTH + '%';

        cells.push(cell);
    }

    grid.append(...cells); 

    // Set event handling for menu buttons
    const btn = document.querySelector('header button');
    btn.addEventListener('click', () => {
        const gridWidth = Number.parseInt(gridWidthInput.value);
        const gridHeight = Number.parseInt(gridHeightInput.value);

        // Reset visual errors indicators, just in case
        removeInputAlert(gridWidthInput);
        removeInputAlert(gridHeightInput);
        
        // Reject erroneous input
        // TODO: This should be handled live when user's typing
        if ((isNaN(gridWidth) || gridWidth < 1 || gridWidth > MAX_CELLS) && 
          (isNaN(gridHeight) || gridHeight < 1 || gridHeight > MAX_CELLS)) {
              setInputAlert(gridWidthInput);
              setInputAlert(gridHeightInput);
        }
        else if (isNaN(gridWidth) || gridWidth < 1 || gridWidth > MAX_CELLS) {
            setInputAlert(gridWidthInput);
        } else if (isNaN(gridHeight) || gridHeight < 1 || gridHeight > MAX_CELLS) {
            setInputAlert(gridHeight);
        } else {
            // TODO!: Grid re-drawing logic
        }
    });
});