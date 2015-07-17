    6: [function(c, b, g) {
        var h;
        var f = c("../../../ac-object/src/ac-object");
        var i = c("ac-base").Element;
        var k = c("ac-base").Array;
        var m = c("../../../window-delegate/src/window-delegate").WindowDelegate;
        var j = c("./TrackedElement");
        var n = c("ac-event-emitter").EventEmitter;
        var d = {
            autoStart: false
        };
        function a(p, o) {
            this.options = f.clone(d);
            this.options = typeof o === "object" ? f.extend(this.options, o) : this.options;
            this.windowDelegate = m;
            this.tracking = false;
            this.elements = [];
            if (p && (Array.isArray(p) || this._isNodeList(p) || i.isElement(p))) {
                this.addElements(p)
            }
            if (this.options.autoStart) {
                this.start()
            }
        }
        h = a.prototype = new n();
        var l = /^\[object (HTMLCollection|NodeList|Object)\]$/;
        h._isNodeList = function(o) {
            if (!o) {
                return false
            }
            if (typeof o.length !== "number") {
                return false
            }
            if (typeof o[0] === "object" && (!o[0] ||!o[0].nodeType)) {
                return false
            }
            return l.test(Object.prototype.toString.call(o))
        };
        h._registerElements = function(o) {
            o = [].concat(o);
            o.forEach(function(q) {
                if (this._elementInDOM(q)) {
                    var p = new j(q);
                    p.offsetTop = p.element.offsetTop;
                    this.elements.push(p)
                }
            }, this)
        };
        h._registerTrackedElements = function(o) {
            var p = [].concat(o);
            p.forEach(function(q) {
                if (this._elementInDOM(q.element)) {
                    q.offsetTop = q.element.offsetTop;
                    this.elements.push(q)
                }
            }, this)
        };
        h._elementInDOM = function(q) {
            var p = false;
            var o = document.getElementsByTagName("body")[0];
            if (i.isElement(q) && o.contains(q)) {
                p = true
            }
            return p
        };
        h._onVPChange = function() {
            this.elements.forEach(function(o) {
                this.refreshElementState(o)
            }, this)
        };
        h._elementPercentInView = function(o) {
            return o.pixelsInView / o.height
        };
        h._elementPixelsInView = function(p) {
            var s = 0;
            var r = p.top;
            var q = p.bottom;
            var o = this.windowDelegate.innerHeight;
            if (r <= 0 && q >= o) {
                s = o
            } else {
                if (r >= 0 && r < o && q > o) {
                    s = o - r
                } else {
                    if (r < 0 && (q < o && q >= 0)) {
                        s = p.bottom
                    } else {
                        if (r >= 0 && q <= o) {
                            s = p.height
                        }
                    }
                }
            }
            return s
        };
        h._ifInView = function(o, p) {
            if (!p) {
                o.trigger("enterview", o)
            }
        };
        h._ifAlreadyInView = function(o) {
            if (!o.inView) {
                o.trigger("exitview", o)
            }
        };
        h.addElements = function(o) {
            o = this._isNodeList(o) ? k.toArray(o) : [].concat(o);
            o.forEach(function(p) {
                this.addElement(p)
            }, this)
        };
        h.addElement = function(p) {
            var o;
            if (i.isElement(p)) {
                o = new j(p);
                this._registerTrackedElements(o)
            }
            return o
        };
        h.removeElement = function(q) {
            var p = [];
            var o;
            this.elements.forEach(function(r, s) {
                if (r === q || r.element === q) {
                    p.push(s)
                }
            });
            o = this.elements.filter(function(s, r) {
                return p.indexOf(r) < 0 ? true : false
            });
            this.elements = o
        };
        h.stop = function() {
            if (this.tracking === true) {
                this.tracking = false;
                this.windowDelegate.off("DOMContentLoaded", this._onVPChange)
            }
        };
        h.start = function() {
            if (this.tracking === false) {
                this.tracking = true;
                this.windowDelegate.on("DOMContentLoaded", this._onVPChange, this);
                this.refreshAllElementStates()
            }
        };
        h.refreshAllElementStates = function() {
            this.elements.forEach(function(o) {
                this.refreshElementState(o)
            }, this)
        };
        h.refreshElementState = function(o) {
            var p = i.getBoundingBox(o.element);
            var q = o.inView;
            o = f.extend(o, p);
            o.pixelsInView = this._elementPixelsInView(o);
            o.percentInView = this._elementPercentInView(o);
            o.inView = o.pixelsInView > 0;
            if (o.inView) {
                this._ifInView(o, q)
            }
            if (q) {
                this._ifAlreadyInView(o)
            }
            return o
        };
        b.exports = a
    }, {
        "../../../ac-object/src/ac-object": 153,
        "../../../window-delegate/src/window-delegate": 167,
        "./TrackedElement": 7,
        "ac-base": false
    }
    ],

    170: [function(c, b, g) {
        window.ACBaseElement = c("ac-base").Element;
        window.ACBaseEnvBrowser = c("ac-base").Environment.Browser;
        window.ACBaseEnvFeature = c("ac-base").Environment.Feature;
        window.ACAutoGallery = c("../../../../ipad/shared/js/acAutoGallery");
        window.BreakpointsDelegate = c("../../../../ipad/shared/js/BreakpointsDelegate");
        window.ACGraphCurvedLine = c("../../../node_modules/ac-graph/src/ac-graph").CurvedLine;
        window.ACElementEngagement = c("../../../node_modules/ac-element-engagement/src/ac-element-engagement").ElementEngagement;
        window.LocalNav = c("../../../../ipad/shared/js/LocalNav");
		window.initGraph= function() {
            var p;
            var o;

            var cpu_graph_line;
            var cpu_ElementEngagement;
            var cpu_graph = window.ACBaseElement.select(".perf-chart-cpu");
            var cpu_graph_li = window.ACBaseElement.selectAll("li", cpu_graph);
            var cpu_played = false;
            var cpu_graph_data = [{
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

            var gpu_graph_line;
            var gpu_ElementEngagement;
            var gpu_graph = window.ACBaseElement.select(".perf-chart-gpu");
            var gpu_graph_li = window.ACBaseElement.selectAll("li", gpu_graph);
            var gpu_played = false;
            var gpu_graph_data = [{
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
            if (cpu_graph) {
                window.ACBaseElement.addClassName(gpu_graph, "canplay");
                cpu_graph_line = new window.ACGraphCurvedLine(cpu_graph, {
                    graphData: cpu_graph_data,
                    width: cpu_graph.offsetWidth,
                    height: cpu_graph.offsetHeight,
                    splinewidth: 2.5,
                    splineColorEnd: "rgb(21, 137, 201)",
                    splineColorStart: "rgb(149, 202, 82)",
                    tension: 0.6,
                    yAxisLineColor: "#f5f5f5",
                    xAxisLineDotSize: 2
                });
                cpu_ElementEngagement = new window.ACElementEngagement();
                cpu_ElementEngagement.on("engaged", function() {
                    if (!cpu_played) {
                        cpu_graph_line.play();
                        for (p = 0, o = cpu_graph_li.length; p < o; p += 1) {
                            var s = cpu_graph_li[p];
                            window.ACBaseElement.setVendorPrefixStyle(s, "transitionDelay", 0 + "ms, 0")
                        }
                        window.ACBaseElement.addClassName(cpu_graph, "play");
                        cpu_played = true
                    }
                });
                cpu_ElementEngagement.start();
                cpu_ElementEngagement.addElement(cpu_graph);
                window.BreakpointsDelegate.on("breakpoint", function(C) {
                    if ((C.incoming.name === "large" && C.outgoing.name !== "xlarge") || C.incoming.name === "medium" || C.incoming.name === "small") {
                        cpu_graph_line.setOptions({
                            graphData: cpu_graph_data,
                            width: cpu_graph.offsetWidth,
                            height: cpu_graph.offsetHeight,
                            splinewidth: 2.5,
                            splineColorEnd: "rgb(21, 137, 201)",
                            splineColorStart: "rgb(149, 202, 82)",
                            tension: 0.6,
                            yAxisLineColor: "#f5f5f5",
                            xAxisLineDotSize: 2
                        });
                        if (cpu_played) {
                            cpu_graph_line.draw({
                                _progress: 1,
                                size: cpu_graph_line.plotPointDotSize,
                                padding: cpu_graph_line.targetRulePadding
                            })
                        }
                    }
                })
            }
            if (gpu_graph) {
                window.ACBaseElement.addClassName(cpu_graph, "canplay");
                gpu_graph_line = new window.ACGraphCurvedLine(gpu_graph, {
                    graphData: gpu_graph_data,
                    width: gpu_graph.offsetWidth,
                    height: gpu_graph.offsetHeight,
                    splinewidth: 2.5,
                    splineColorStart: "rgb(251, 236, 62)",
                    splineColorEnd: "rgb(238, 91, 47)",
                    tension: 0.5,
                    yAxisLineColor: "#f5f5f5",
                    xAxisLineDotSize: 2
                });
                gpu_ElementEngagement = new window.ACElementEngagement();
                gpu_ElementEngagement.on("engaged", function() {
                    if (!gpu_played) {
                        gpu_graph_line.play();
                        for (p = 0, o = gpu_graph_li.length; p < o; p += 1) {
                            var s = gpu_graph_li[p];
                            window.ACBaseElement.setVendorPrefixStyle(s, "transitionDelay", + 0 + "ms, 0")
                        }
                        window.ACBaseElement.addClassName(gpu_graph, "play");
                        gpu_played = true
                    }
                });
                gpu_ElementEngagement.start();
                gpu_ElementEngagement.addElement(gpu_graph);
                window.BreakpointsDelegate.on("breakpoint", function(C) {
                    if ((C.incoming.name === "large" && C.outgoing.name !== "xlarge") || C.incoming.name === "medium" || C.incoming.name === "small") {
                        gpu_graph_line.setOptions({
                            graphData: gpu_graph_data,
                            width: gpu_graph.offsetWidth,
                            height: gpu_graph.offsetHeight,
                            splinewidth: 2.5,
                            splineColorStart: "rgb(251, 236, 62)",
                            splineColorEnd: "rgb(238, 91, 47)",
                            tension: 0.5,
                            yAxisLineColor: "#f5f5f5",
                            xAxisLineDotSize: 2
                        });
                        if (gpu_played) {
                            gpu_graph_line.draw({
                                _progress: 1,
                                size: gpu_graph_line.plotPointDotSize,
                                padding: gpu_graph_line.targetRulePadding
                            })
                        }
                    }
                })
            }
            return this
        }
                
        //b.exports = window.initGraph();
    }, {
        "../../../../ipad/shared/js/BreakpointsDelegate": 171,
        "../../../../ipad/shared/js/LocalNav": 174,
        "../../../../ipad/shared/js/acAutoGallery": 175,
        "../../../node_modules/ac-element-engagement/src/ac-element-engagement": 3,
        "../../../node_modules/ac-graph/src/ac-graph": 148,
        "ac-base": false
    }
    ],
