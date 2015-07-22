window.AppleGrapherOptions = {
	disableAnimationsOnOldDevices: true,
	enableElementEngagement: true,
	decimalMark: ","
};

(function() {
	window.AppleGrapher = function(items) {
		this.graphs = [];

		for (var i=0; i<items.length; i++) {
			if (items[i].type == "curvedLine") {
				this.graphs.push(new AppleGrapher.CurvedLine(items[i].selector, items[i].options));
			} else if (items[i].type == "donut") {
				this.graphs.push(new AppleGrapher.Donut(items[i].selector, items[i].options));
			} else if (items[i].type == "segmented") {
				this.graphs.push(new AppleGrapher.SegmentedDonut(items[i].selector, items[i].options));
			}

		}
	};
	window.AppleGrapher.CurvedLine = function(selector, options) {
		var grapher = this;

		grapher.selector = selector;
		grapher.selector_li = selector.querySelectorAll("li");

		grapher.params = {
			autoPlay: options.autoPlay || true,
			delay: options.delay ||0,
			duration: options.duration || 2,
			graphData: options.graphData || null,
			tension: options.tension || 0.3,
			splinewidth: options.splinewidth || 4.5,
			splineColorStart: options.splineColorStart || "rgb(214,214,214)",
			splineColorEnd: options.splineColorEnd || "rgb(0,0,0)",
			xAxisLineWidth: options.xAxisLineWidth || 1.5,
			xAxisLineColor: options.xAxisLineColor || "#D6D6D6",
			xAxisLineDotColor: options.xAxisLineDotColor || "#D6D6D6",
			xAxisLineDotSize: options.xAxisLineDotSize || Math.round(1.5 * 1.67),
			yAxisLineWidth: options.yAxisLineWidth || 1.5,
			yAxisLineColor: options.yAxisLineColor || "#D6D6D6",
			yAxisLineOffset: options.yAxisLineOffset || 15,
			shouldShowPlotPoints: options.shouldShowPlotPoints || false,
			plotPointDotSize: options.plotPointDotSize || 4,
			pointColor: options.pointColor || "#D6D6D6",
			padding: options.padding || 5,
			width: options.width || grapher.selector.offsetWidth,
			height: options.height || grapher.selector.offsetHeight,
			labels: options.labels || null,
		}

		for (var param in options) {
			grapher.params[param] = options[param];
		}
		if ((window.EnvBrowser.os == "iOS" && window.EnvBrowser.version<7 && window.AppleGrapherOptions && window.AppleGrapherOptions.disableAnimationsOnOldDevices)) {
			grapher.params.duration = 0;
			grapher.params.delay = 0;
		}

		grapher.graphLine = null;
		grapher.played = false;
		grapher.elementEngagement = null;

		grapher.play = function() {
			if (grapher.selector) {
				var p,o;
				grapher.graphLine = new window.ACGraphCurvedLine(grapher.selector, grapher.params);
				grapher.selector.style.width = grapher.params.width + "px";
				grapher.selector.style.height = grapher.params.height + "px";

				grapher.setLabels();
				window.addEventListener("orientationchange", function() {
					grapher.setLabels();
				});
				
				grapher.elementEngagement = new window.ACElementEngagement();
				grapher.elementEngagement.addElement(grapher.selector);
				grapher.elementEngagement.on("engaged", function() {
					if (!grapher.played) {
						if (!(window.EnvBrowser.os == "iOS" && window.EnvBrowser.version<7 && window.AppleGrapherOptions && window.AppleGrapherOptions.disableAnimationsOnOldDevices) && window.AppleGrapherOptions.enableElementEngagement) {
							setTimeout(function() {
								grapher.selector.classList.add("play");
								grapher.graphLine.play();
							}, grapher.params.delay*1000);
							grapher.played = true;
						}
					}
				});
				grapher.elementEngagement.start();
				if (!window.AppleGrapherOptions.enableElementEngagement) {
					setTimeout(function() {
						grapher.selector.classList.add("play");
						grapher.graphLine.play();
						grapher.played = true;
					}, grapher.params.delay*1000);
				}

			}
		}
		grapher.setLabels = function() {
			if (grapher.params.labels) {
				grapher.selector.classList.add("labels");

				if (grapher.selector.querySelector("ul")) {
					var el = grapher.selector.querySelector("ul");
					el.parentNode.removeChild(el);
				}
				var label_holder = document.createElement("ul");
				var label_holder_width = (grapher.selector.offsetWidth/(grapher.params.graphData.length-1)) * grapher.params.graphData.length;
				label_holder.className = "axis-labels";
				label_holder.style.width = label_holder_width + "px";
				label_holder.style.top = grapher.selector.offsetHeight + "px";
				label_holder.style.left = -((label_holder_width/grapher.params.graphData.length)/2) + "px";

				for (var i=0; i<grapher.params.labels.length; i++) {
					var label_inner = document.createElement("li");
					label_inner.innerHTML = grapher.params.labels[i];
					label_inner.style.width = (grapher.selector.offsetWidth/(grapher.params.graphData.length-1)) + "px";
					label_inner.style.left = i * (label_holder_width/grapher.params.graphData.length)+ "px";
					if (window.EnvBrowser.version<7 && (window.AppleGrapherOptions && window.AppleGrapherOptions.disableAnimationsOnOldDevices)) {
						label_inner.style.transitionDuration = "0ms";
						label_inner.style.mozTransitionDuration = "0ms";
						label_inner.style.webkitTransitionDuration = "0ms";
					} else {
						label_inner.style.transitionDelay = i * 100 + "ms,0";
						label_inner.style.webkitTransitionDelay = i * 100 + "ms,0";
						label_inner.style.mozTransitionDelay = i * 100 + "ms,0";
					}

					label_holder.appendChild(label_inner);
				}
				grapher.selector.appendChild(label_holder);
			}
		}
		grapher.convertToImg = function() {
			var url = grapher.selector.querySelector("canvas").toDataURL();
			window.location.href = url;
		}

		if (grapher.params.autoPlay) {
			grapher.play();
		}
	};
	window.AppleGrapher.Donut = function(selector, options) {
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
		if ((window.EnvBrowser.os == "iOS" && window.EnvBrowser.version<7 && window.AppleGrapherOptions && window.AppleGrapherOptions.disableAnimationsOnOldDevices)) {
			grapher.params.duration = 0;
			grapher.params.delay = 0;
		}

		grapher.selector = selector;
		grapher.graphLine = null;
		grapher.played = false;

		if (grapher.selector) {
			grapher.selector.classList.add("donut");
			grapher.selector.style.width = grapher.params.size + "px";
			grapher.selector.style.height = grapher.params.size + "px";

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

			grapher.elementEngagement = new window.ACElementEngagement();
			grapher.elementEngagement.addElement(grapher.selector);
			grapher.elementEngagement.on("engaged", function() {
				if (!grapher.played && grapher.params.autoPlay) {
					if (!(window.EnvBrowser.os == "iOS" && window.EnvBrowser.version<7 && window.AppleGrapherOptions && window.AppleGrapherOptions.disableAnimationsOnOldDevices) && window.AppleGrapherOptions.enableElementEngagement) {
						grapher.graphLine.play();
						grapher.played = true;
					}
				}
			});
			grapher.elementEngagement.start();
			if (!window.AppleGrapherOptions.enableElementEngagement) {
				grapher.graphLine.play();
				grapher.played = true;
			}

		}
		grapher.convertToImg = function() {
			var url = grapher.selector.querySelector("canvas").toDataURL();
			window.location.href = url;
		}
	};
	window.AppleGrapher.SegmentedDonut = function(selector, options) {
		var grapher = this;

		grapher.params = {
			slices: options.slices || null,
			label: options.label || null,
			autoPlay: options.autoPlay || true,
			delay: options.delay || 0,
			duration: options.duration || 0,
			gap: options.gap || 0,
			easing: options.easing || "linear",
			size: options.size || 235,
			lineWidth: options.lineWidth || 5
		};
		for (var param in options) {
			grapher.params[param] = options[param];
		}
		if ((window.EnvBrowser.os == "iOS" && window.EnvBrowser.version<7 && window.AppleGrapherOptions && window.AppleGrapherOptions.disableAnimationsOnOldDevices)) {
			grapher.params.duration = 0;
			grapher.params.delay = 0;
		}

		grapher.selector = selector;
		grapher.graphLine = null;

		grapher.createGraphObject = function(B) {
			var t = {
				slices: [{
					color: "#f0f",
					value: 1
				}
				],
				totalDuration: 1,
				gap: 0
			};
			B = B || {};
			t = this.extend(t, B);
			var s = [];
			var r = 0;
			var w = 0;
			var z = t.gap / 100;
			var A = t.slices;
			var y = this.getTotal(A);
			var x;
			var u;
			for (var v = 0; v < A.length; v++) {
				u = (v === 0);
				x = A[v].value / y;
				s[v] = {
					delay: u ? 0: r,
					startAngle: u ? 0: (z * v) + (w * 360),
					duration: x * t.totalDuration,
					percent: x - z,
					color: A[v].color
				};
				r += s[v].duration;
				w += x
			}
			return s
		}
		grapher.getTotal = function(t) {
			var s = 0;
			for (var r = 0; r < t.length;
			r++) {
				s += t[r].value
			}
			return s
		}
		grapher.extend = function(t, s) {
			var r = {};
			for (var u in t) {
				r[u] = (s[u] != null) ? s[u] : t[u]
			}
			return r
		}

		if (grapher.selector) {
			grapher.selector.classList.add("donut");
			grapher.selector.classList.add("segmented-donut");
			grapher.selector.style.width = grapher.params.size + "px";
			grapher.selector.style.height = grapher.params.size + "px";
			if (grapher.params.label) {
				if (document.querySelector(grapher.params.label.element)) {
					document.querySelector(grapher.params.label.element).style.lineHeight = grapher.params.size + "px";
				}
			}

			var graphObject = grapher.createGraphObject({
				slices: grapher.params.slices,
				totalDuration: grapher.params.duration,
				gap: grapher.params.gap
			})
			grapher.graphLine = new window.ACGraphSegmentedDonut(grapher.selector, graphObject, {
				easing: grapher.params.easing,
				size: grapher.params.size,
				lineWidth: grapher.params.lineWidth
			})
			grapher.elementEngagement = new window.ACElementEngagement();
			grapher.elementEngagement.addElement(grapher.selector);
			grapher.elementEngagement.on("engaged", function() {
				if (!grapher.played && grapher.params.autoPlay) {
					if (!(window.EnvBrowser.os == "iOS" && window.EnvBrowser.version<7 && window.AppleGrapherOptions && window.AppleGrapherOptions.disableAnimationsOnOldDevices) && window.AppleGrapherOptions.enableElementEngagement) {
						setTimeout(function() {
							if (grapher.params.label) {
								if (document.querySelector(grapher.params.label.element)) {
									window.ACGraphSegmentedDonut.countUp.initialize([{
										duration: grapher.params.duration,
										delay: 0,
										finalNumber: grapher.params.label.finalNumber,
										element: grapher.params.label.element
									}]);
								}
							}	
							if (grapher.params.autoPlay) {
								grapher.graphLine.play();
								grapher.played = true;
							}
						}, grapher.params.delay*1000);

					}
				}
			});
			if (!window.AppleGrapherOptions.enableElementEngagement) {
				window.ACGraphSegmentedDonut.countUp.initialize([{
					duration: grapher.params.duration,
					delay: 0,
					finalNumber: grapher.params.label.finalNumber,
					element: grapher.params.label.element
				}]);
				grapher.graphLine.play();
				grapher.played = true;
			}
		}
		grapher.convertToImg = function() {
			var url = grapher.selector.querySelector("canvas").toDataURL();
			window.location.href = url;
		}
	}
})();

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
								   || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
				 timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

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
}];

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
}];