(function() {
	window.AppleGrapher = function(items) {
		this.graphs = [];

		for (var i=0; i<items.length; i++) {
			this.graphs.push(new _AppleGrapher(items[i].selector, items[i].options));
		}
	};
	window._AppleGrapher = function(selector, options) {
		var grapher = this;
		
		grapher.selector = selector;
		grapher.selector_li = window.ACBaseElement.selectAll("li", grapher.selector);
		grapher.params = {
			graphData: options.graphData || null,
			width: options.width || 418,
			height: options.height || 240,
			splineWidth: options.splineWidth || 2.5,
			splineColorStart: options.splineColorStart ? options.splineColorStart : "rgb(214,214,214)",
			splineColorEnd: options.splineColorEnd ? options.splineColorEnd : "rgb(0,0,0)",
			tension: options.tension || 0.6,
			yAxisLineColor: options.yAxisLineColor || "#D6D6D6",
			xAxisLineDotSize: options.xAxisLineDotSize || 2
		}

		for (var param in options) {
			grapher.params[param] = options[param];
		}

		grapher.graphLine = null;
		grapher.ElementEngagement = null;
		grapher.played = false;

		if (grapher.selector) {
			var p,o;
			grapher.graphLine = new window.ACGraphCurvedLine(grapher.selector, grapher.params);
			grapher.ElementEngagement = new window.ACElementEngagement();
			grapher.ElementEngagement.on("engaged", function() {
				if (!grapher.played) {
					grapher.graphLine.play();
					for (p=0, o=grapher.selector_li.length; p<o; p+=1) {
						var s = grapher.selector_li[p];
						window.ACBaseElement.setVendorPrefixStyle(s,"transitionDelay", 0 + "ms,0");
					}
					window.ACBaseElement.addClassName(grapher.selector,"play");
					grapher.played = true;
				}
			});
			grapher.ElementEngagement.start();
			grapher.ElementEngagement.addElement(grapher.selector);
			window.BreakpointsDelegate.on("breakpoint", function(C) {
				if ((C.incoming.name === "large" && C.outgoing.name !== "xlarge") || C.incoming.name === "medium" || C.icoming.name === "small") {
					grapher.graphLine.setOptions(grapher.params);
					if (grapher.played) {
						grapher.graphLine.draw({
							_progress: 1,
							size: grapher.graphLine.plotPointDotSize,
							padding: grapher.graphLine.targetRulePadding
						})
					}
				}
			})
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