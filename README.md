# ac-graph
Apple's Graph rendering library extracted

## Notes
Supports "CurvedLine" graphs including labels, aswell as "Donut" graphs

## Usage
Include `Base.js`, `AppleGrapher.js` and `AppleGrapherElements.js` in this order inside the `<head></head>` tag of your document.

You also have the options to use the ultra-minified version with `AppleGrapher.min.js`.

To use labels, you also need to include `AppleGrapher.css`.


```html
<body>
	<div class="chart chart1" style="width: 418px; height: 240px"></div>
	<div class="donut chart2" id="donut-graphs" style="width: 235px; height: 235px;"></div>
</body>
```
```javascript
var curvedLineOptions = {
	type: "curvedLine",
	selector: document.querySelector(".chart1"),
	options: {
		graphData: [{
		    y: 0.04928571428571
		}, {
		    y: 0.19357142857143
		}, {
		    y: 0.224
		}, {
		    y: 0.375
		}, {
		    y: 0.71428571428571
		}, {
		    y: 1
		}],
		splineColorEnd: "rgb(21, 137, 201)",
		splineColorStart: "rgb(149, 202, 82)",
	}
}
var donutOptions = {
	type: "donut",
	selector: document.querySelector(".chart2"),
	options: {
		bgAnimate: false,
		bgPercent: 1,
		bgColor: "#f5f5f5",
		delay: 0,
		duration: 1,
		percent: 0.87,
		fillColor: "rgb(238, 91, 47)",
		label: document.querySelector(".chart2 span.label"),
		easing: "easeInOutExpo",
		size: 235,
		lineWidth: 8
	}
}


var graph = new AppleGrapher([curvedLineOptions, donutOptions]);
```

Example data is included in the variables `ipad_cpu` and `ipad_gpu`.

## Parameters
### CurvedLine
| Parameter        | Type     | Usage                                                                                                    | Default Value      |
|------------------|----------|----------------------------------------------------------------------------------------------------------|--------------------|
| graphData        | Array    | The data the graph is supposed to display. If no data is specified, the graph won't render               | null               |
| width            | integer  | The width of the graph                                                                                   | 418                |
| height           | integer  | The height of the graph                                                                                  | 240                |
| splineWidth      | float    | The width of the rendered line (the actual graph)                                                        | 2.5                |
| splineColorStart | String   | Specifies the gradient color at the beginning. RGB color as String 'rgb(214,214,214)', values from 0-255 | "rgb(214,214,214)" |
| splineColorEnd   | String   | Same as above, but for the gradient end                                                                  | "rgb(0,0,0)"       |
| tension          | float    | Haven't found out yet. Probably speed or something                                                       | 0.6                |
| yAxisLineColor   | "String" | Sets the color of the lines that mark the points on the X axis. HEX color as String '#D6D6D6'            | "#D6D6D6           |
| xAxisLineDotSize | float    | Specifies the size of the dots on the X axis.                                                            | 2                  |

### Donut
| Parameter | Type        | Usage                                                                  | Default Value |
|-----------|-------------|------------------------------------------------------------------------|---------------|
| bgAnimate | boolean     | Animate the background (if available) upon creation                    | false         |
| bgPercent | float       | Set the radial progress for the background ring                        | 1.0           |
| bgColor   | String      | Set the background color. HEX and RGB allowed                          | "#CCC"        |
| delay     | float       | Wait for the specified time before the animation begins                | 0             |
| duration  | float       | Set the duration of the animation                                      | 0             |
| percent   | float       | Set the total radial progress for the foreground ring                  | 1.0           |
| fillColor | String      | Set the foreground color. HEX and RGB allowed                          | "#CCC"        |
| label     | HTMLElement | Specifies an optional label that shows the progress as a numeric value | null          |
| size      | integer     | Sets the canvas width and height.                                      | 235           |
| lineWidth | float       | Sets the width of the outer and inner ring                             | 5             |

## Labels


### CurvedLine

Add the following code to your chart holder and customize it the way you want it to be:

```html
<ul class="axis-labels" role="presentation">
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
</ul>
```

This code adds six labels to your chart. The wider the chart is, the more labels fit in.

### Donut

Add the following code to your donut holder. There is no need to customize it, only through CSS.

```html
<div class="donut-label">
	<span class="label">0</span>
</div>
```

## Credits
* Apple - For their work on `head.built.js`, `performance.built.js` and `overview.built.js`
* @Sniper_GER - making the Graph functions available for public use