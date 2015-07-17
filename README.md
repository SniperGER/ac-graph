# ac-graph
Apple's Graph rendering library extracted

## Notes
Support for labels will follow soon!

## Prerequisites
You need two Apple Scripts for this to work:

* `head.built.js` available [http://images.apple.com/v/ipad-air-2/a/scripts/head.built.js]here
* `performance.built.js` available [http://images.apple.com/v/ipad-air-2/b/scripts/performance.built.js]here

Both scripts consist of modules, so you need a non-minified version of `performance.built.js`. If the code is compressed, insert it into [http://jsbeautifier.org]jsbeautifier.org to make it readable. If you are using Safari, it is possible that you already have a uncompressed version if "Source Code Formatting" is switched on.

It is recommended you save both scripts locally. Leave `head.built.js` alone.

Now open up your favorite code editor and open both `performance.built.js` and `modules.js`. Search inside `performance.built.js` for "6:" (and only for "6:", not "26:" or "136:", exactly "6:") and replace the complete object with the code for "6:" inside `modules.js`. Do the same for "170:".

The replacement code in module 6 makes the graph rendering after loading the page, not after an additional `scroll`, `resize` or `orientationchange` event.
Module 170 exports the important libraries into global scope (also known as `window`), so they are accessible for other functions.

## Usage
NOTE: Include `head.built.js` and `graph.js` inside the `<head></head>` tag and `performance.build.js` before the closing `</body>` tag first.

```javascript
var graph = new AppleGrapher([
	selector: window.ACBaseElement.select('.graph-holder'),
	options: {
		graphData: [
			{
				y: 0.0
			},
			{
				y: 0.2
			},
			{
				y: 0.4
			},
			{
				y: 0.6
			},
			{
				y: 0.8
			},
			{
				y: 1.0
			}
		],
		splineColorEnd: "rgb(21, 137, 201)",
		splineColorStart: "rgb(149, 202, 82)",
	}
]);
```

This creates a new graph inside `.graph-holder`, with 6 data points resulting in a straight line upwards. The AppleGrapher constructor can take multiple graphs and stores them inside `graph.graphs`.

I'd recommend a value of at least `0.05` for the first data point.

## Parameters
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

## Credits
* Apple - Everything inside `head.built.js` and `performance.built.js`, except for Module 170 inside `performance.built.js`
* @Sniper_GER - Replacement Module 170, making the Graph function available for public use

Special Thanks to
* Ronald "Doctor" Jett
* Kyle Olson
for their work on `head.built.js`