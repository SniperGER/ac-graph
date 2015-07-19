(function() {
	window.AppleGrapher = function(items) {
		this.graphs = [];

		for (var i=0; i<items.length; i++) {
			if (items[i].type == "curvedLine") {
				this.graphs.push(new _AppleGrapherCurvedLine(items[i].selector, items[i].options));
			} else if (items[i].type == "donut")  {
				this.graphs.push(new _AppleGrapherDonut(items[i].selector, items[i].options));
			}
			
		}
	};
	window._AppleGrapherCurvedLine = function(selector, options) {
		var grapher = this;
		
		grapher.selector = selector;
		grapher.selector_li = selector.querySelectorAll("li");
		grapher.params = {
			graphData: options.graphData || null,
			width: options.width || 418,
			height: options.height || 240,
			splinewidth: options.splinewidth || 2.5,
			splineColorStart: options.splineColorStart ? options.splineColorStart : "rgb(214,214,214)",
			splineColorEnd: options.splineColorEnd ? options.splineColorEnd : "rgb(0,0,0)",
			tension: options.tension || 0.6,
			yAxisLineColor: options.yAxisLineColor || "#f5f5f5",
			xAxisLineDotSize: options.xAxisLineDotSize || 2,
			autoPlay: options.autoPlay || true,
			delay: options.delay || 0
		}

		for (var param in options) {
			grapher.params[param] = options[param];
		}

		grapher.graphLine = null;
		grapher.played = false;

		grapher.play = function() {
			if (grapher.selector) {
				var p,o;
				grapher.graphLine = new window.ACGraphCurvedLine(grapher.selector, grapher.params);
				if (!grapher.played) {
					for (p=0, o=grapher.selector_li.length; p<o; p+=1) {
						var s = grapher.selector_li[p];
						//window.ACBaseElement.setVendorPrefixStyle(s,"transitionDelay", p * 100 + "ms,0");
						s.style.webkitTransitionDelay = p * 100 + "ms,0";
					}
					setTimeout(function() {
						grapher.selector.classList.add("play");
						setTimeout(function() {
							grapher.graphLine.play();
						}, grapher.params.delay);
					}, 0)
					grapher.played = true;
				}
			}
		}
		if (grapher.params.autoPlay) {
			grapher.play();
		}
	}
	window._AppleGrapherDonut = function(selector, options) {
		var grapher = this;

		grapher.params = {
			autoPlay: options.autoPlay || true,
			bgAnimate: options.bgAnimate || true,
			bgPercent: options.bgPercent || 1,
			bgColor: options.bgColor || "#ccc",
			delay: options.delay || 0,
			duration: options.duration || 0,
			fillPercent: options.fillPercent || 1,
			fillColor: options.fillColor || "#ccc",
			label: options.label || null,
			easing: options.easing || "easeInOutQuint",
			size: options.size || 235,
			lineWidth: options.lineWidth || 5
		};
		for (var param in options) {
			grapher.params[param] = options[param];
		}

		grapher.selector = selector;
		grapher.graphLine = null;

		if (grapher.selector) {
			grapher.selector.classList.add("donut");
			grapher.graphLine = new window.ACGraphDonut(grapher.selector, [{
                animate: grapher.params.bgAnimate,
                percent: grapher.params.bgPercent,
                color: grapher.params.bgColor
            }, {
                delay: grapher.params.delay,
                duration: grapher.params.duration,
                percent: grapher.params.fillPercent,
                color: grapher.params.fillColor,
                label: grapher.params.label
            }
            ], {
                easing: grapher.params.easing,
                size: grapher.params.size,
                lineWidth: grapher.params.lineWidth
            });
		}
		if (grapher.params.autoPlay) {
			grapher.graphLine.play();
		}
	}
})();


var ipad_cpu = [{
    name: "ipad",
    y: 0.04928571428571
}, {
    name: "ipad 2",
    y: 0.19357142857143
}, {
    name: "ipad 3rd gen",
    y: 0.224
}, {
    name: "ipad 4th gen",
    y: 0.375
}, {
    name: "ipad air",
    y: 0.71428571428571
}, {
    name: "new ipad air",
    y: 1
}
];

var ipad_gpu = [{
    name: "ipad",
    y: 0.00555555555556 + 0.04373015873015
}, {
    name: "ipad 2",
    y: 0.05 + 0.04373015873015
}, {
    name: "ipad 3rd gen",
    y: 0.1 + 0.04373015873015
}, {
    name: "ipad 4th gen",
    y: 0.2 + 0.04373015873015
}, {
    name: "ipad air",
    y: 0.5
}, {
    name: "new ipad air",
    y: 1
}
];

function RGBtoObject(p) {
    var o = p.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return {
        r: parseInt(o[1], 10),
        g: parseInt(o[2], 10),
        b: parseInt(o[3], 10)
    }
}
function getVendorPrefix()
{
	if('result' in arguments.callee) return arguments.callee.result;

	var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;

	var someScript = document.getElementsByTagName('script')[0];

	for(var prop in someScript.style)
	{
		if(regex.test(prop))
		{
			// test is faster than match, so it's better to perform
			// that on the lot and match only when necessary
			return arguments.callee.result = prop.match(regex)[0];
		}

	}

	// Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
	// However (prop in style) returns the correct value, so we'll have to test for
	// the precence of a specific property
	if('WebkitOpacity' in someScript.style) return arguments.callee.result = 'Webkit';
	if('KhtmlOpacity' in someScript.style) return arguments.callee.result = 'Khtml';

	return arguments.callee.result = '';
}