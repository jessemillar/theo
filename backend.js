var dom
var ctx
var loop
var color
var grid

var database = new Object()
var thingy = new Array()

function setup(width, height, tileWidth, tileHeight, backgroundColor, gridColor, gridOpacity)
{
	dom = document.getElementById('canvas')
    ctx = document.getElementById('canvas').getContext('2d')

	dom.setAttribute('onmousedown', 'mouse.click(event)')
	dom.setAttribute('onmouseup', 'mouse.cancel()')

	document.onmousemove = mouse.moved

    document.body.setAttribute('onresize', 'calculate.canvas()')

	color = backgroundColor
	grid = new Object()
		grid.width = width
		grid.height = height
		grid.tile = new Object()
			grid.tile.width = tileWidth
			grid.tile.height = tileHeight
		grid.color = gridColor
		grid.opacity = gridOpacity / 100

	calculate.canvas()

	calculate.grid()
	loop = setInterval(main, 1000 / 60)

	updateUI() // Initial update of UI values

	var tool
	penTool() // Set the tool initially to the pen
}

mouse = new Object()
mouse.click = new Object()

mouse.click = function()
{
	mouse.clicked = true
}

mouse.cancel = function()
{
	mouse.clicked = false
}

mouse.moved = function(event)
{
    if (event)
    {
    	mouse.x = event.clientX - dom.offsetLeft + document.body.scrollLeft
    	mouse.y = event.clientY - dom.offsetTop + document.body.scrollTop
    }
}

mouse.inside = function()
{
	if (mouse.x > 0 && mouse.x < dom.offsetLeft + dom.offsetWidth && mouse.y > 0 && mouse.y < dom.offsetTop + dom.offsetHeight)
	{
		return true
	}
	else
	{
		return false
	}
}

calculate = new Object() // Group the calculation functions

calculate.canvas = function()
{
	if (!canvas)
	{
		canvas = new Object()
	}

	// Userful for later calculation
	canvas.width = grid.width * grid.tile.width
	canvas.height = grid.height * grid.tile.height

	if (canvas.width >= window.innerWidth) // Make the toolbar always fill the top of the screen
	{
		document.getElementById('toolbar').style.width = canvas.width
	}
	else
	{
		document.getElementById('toolbar').style.width = '100%'
	}

	if (canvas.width >= window.innerWidth && canvas.height >= window.innerHeight - 50)
	{
		document.body.style.background = color // A preventative measure for screen flicker on resize
		dom.style.left = 0
	    dom.style.top = 50 // Leave room for the toolbar
		dom.width = canvas.width
	    dom.height = canvas.height
	}
	else
	{
		if (canvas.width >= window.innerWidth)
		{
			document.body.style.background = '#111111'
			dom.width = canvas.width
	    	dom.height = canvas.height
	    	dom.style.left = 0
	    	dom.style.top = (window.innerHeight - 50) / 2 - dom.height / 2 + 50
		}
		else if (canvas.height >= window.innerHeight - 50)
		{
			document.body.style.background = '#111111'
			dom.width = canvas.width
	    	dom.height = canvas.height
	    	dom.style.left = window.innerWidth / 2 - dom.width / 2
	    	dom.style.top = 50
		}
		else
		{
			document.body.style.background = '#111111'
			dom.width = canvas.width
	    	dom.height = canvas.height
	    	dom.style.left = window.innerWidth / 2 - dom.width / 2
	    	dom.style.top = (window.innerHeight - 50) / 2 - dom.height / 2 + 50
		}
	}

	calculate.grid()
}

calculate.grid = function()
{
    for (var y = 0; y < grid.height; y++)
    {
        for (var x = 0; x < grid.width; x++)
        {
            if (!database['row' + y])
            {
                database['row' + y] = new Object()
            }

            if (!database['row' + y]['column' + x])
            {
                database['row' + y]['column' + x] = new Object()
            }

            database['row' + y]['column' + x].x = 0 - grid.width / 2 * grid.tile.width + x * grid.tile.width
            database['row' + y]['column' + x].y = 0 - grid.height / 2 * grid.tile.height + y * grid.tile.height
        }
    }
}

function exportArray()
{
	thingy.length = 0 // Wipe the array
	thingy.length = grid.height * grid.width
}

draw = new Object() // Group the draw functions

draw.clear = function()
{
	ctx.fillStyle = '#' + color
	ctx.fillRect(0, 0, dom.width, dom.height)
}

draw.line = function(x1, y1, x2, y2, width, color, opacity, dash)
{
	if (opacity > 0)
	{
		ctx.beginPath()
		ctx.moveTo(Math.round(x1) + 0.5, Math.round(y1) + 0.5)
		ctx.lineTo(Math.round(x2) + 0.5, Math.round(y2) + 0.5)
		ctx.lineWidth = width
		ctx.strokeStyle = '#' + color
		if (dash)
		{
			ctx.setLineDash([dash])
		}
		if (opacity)
		{
			ctx.globalAlpha = opacity
		}
		else
		{
			ctx.globalAlpha = 1
		}
		ctx.stroke()
	}
}

draw.rectangle = function(x, y, width, height, color, opacity)
{
	if (opacity > 0)
	{
		ctx.beginPath()
		ctx.rect(x, y, width, height)
		ctx.fillStyle = color
		if (opacity)
		{
			ctx.globalAlpha = opacity
		}
		else
		{
			ctx.globalAlpha = 1
		}
		ctx.fill()
	}
}

draw.grid = function()
{
	for (var i = 1; i < grid.width; i++)
	{
		draw.line(i * grid.tile.width, 0, i * grid.tile.width, canvas.height, 1, grid.color, grid.opacity, 4)
	}

	for (var i = 1; i < grid.height; i++)
	{
		draw.line(0, i * grid.tile.height, canvas.width, i * grid.tile.height, 1, grid.color, grid.opacity, 4)
	}

	for (var i = 0; i < grid.height; i++)
	{
		for (var j = 0; j < grid.width; j++)
		{
			draw.rectangle(j * grid.tile.width + grid.tile.width / 2, i * grid.tile.height + grid.tile.height / 2, 1, 1, grid.color, grid.opacity)
		}
	}
}

draw.objects = function()
{
	for (var i = 0; i < grid.height; i++)
	{
		for (var j = 0; j < grid.width; j++)
		{
			if (database['row' + i]['column' + j] == 1)
			{
				draw.rectangle(j * grid.tile.width, i * grid.tile.height, grid.tile.width, grid.tile.height, '#ff0000', 1)
			}
		}
	}
}