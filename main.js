setup(15, 15, 30, 30, '7FDBFF', '39CCCC', 50);

function main() {
    if (mouse.clicked && mouse.inside()) {
        var row = Math.floor(mouse.y / grid.tile.height),
            column = Math.floor(mouse.x / grid.tile.width);

        if (tool == 'pen') {
            database['row' + row]['column' + column] = 1;
            thingy[row * column] = 1;
        } else if (tool == 'bucket') {
            for (var i = 0; i < grid.height; i++) {
                for (var j = 0; j < grid.width; j++) {
                    database['row' + i]['column' + j] = 1;
                    thingy[row * column] = 1;
                }
            }
        } else if (tool == 'eraser') {
            database['row' + row]['column' + column] = 0;
        }
    }

    draw.clear();
    draw.grid();
    draw.objects();
}
