function penTool() {
    dom.style.cursor = 'crosshair';
    tool = 'pen';
}

function bucketTool() {
    dom.style.cursor = 'move';
    tool = 'bucket';
}

function eraserTool() {
    dom.style.cursor = 'cell';
    tool = 'eraser';
}

function openExport() {
    exportArray();
    document.getElementById('export').innerHTML = '[' + thingy + ']';
    document.getElementById('hat').style.display = 'block';
}

function closeExport() {
    document.getElementById('hat').style.display = 'none';
}

function updateUI() {
    document.getElementById('tile-width').value = grid.tile.width;
    document.getElementById('tile-height').value = grid.tile.height;
    document.getElementById('grid-width').value = grid.width;
    document.getElementById('grid-height').value = grid.height;
    document.getElementById('background-color').value = color;
    document.getElementById('grid-color').value = grid.color;
    document.getElementById('grid-opacity').value = grid.opacity * 100;

    document.getElementById('background-color').style.backgroundColor = color;
    document.getElementById('grid-color').style.backgroundColor = grid.color;
    if (grid.opacity < 0.3) {
        document.getElementById('grid-opacity').style.opacity = 0.3;
    } else {
        document.getElementById('grid-opacity').style.opacity = grid.opacity;
    }
}

function updatePreferences() {
    grid.tile.width = document.getElementById('tile-width').value;
    grid.tile.height = document.getElementById('tile-height').value;
    grid.width = document.getElementById('grid-width').value;
    grid.height = document.getElementById('grid-height').value;
    color = document.getElementById('background-color').value;
    grid.color = document.getElementById('grid-color').value;
    grid.opacity = document.getElementById('grid-opacity').value / 100;

    if (grid.tile.width > 999) {
        grid.tile.width = 999;
    } else if (grid.tile.width < 1) {
        grid.tile.width = 1;
    }

    if (grid.tile.height > 999) {
        grid.tile.height = 999;
    } else if (grid.tile.height < 1) {
        grid.tile.height = 1;
    }

    if (grid.width > 999) {
        grid.width = 999;
    } else if (grid.width < 1) {
        grid.width = 1;
    }

    if (grid.height > 999) {
        grid.height = 999;
    } else if (grid.height < 1) {
        grid.height = 1;
    }

    if (grid.opacity > 100) {
        grid.opacity = 100;
    } else if (grid.opacity < 0) {
        grid.opacity = 0;
    }

    calculate.canvas();

    updateUI();
}
