var listRequiredModules = function(startModule) {
	if (modules[startModule]) {
		if (modules[startModule][0]) {
			// check for exports with brackets
			var moduleContent = modules[startModule][0].toString().replace(/\s/g, "");
			var moduleContentNumberPre = moduleContent.slice(moduleContent.indexOf(".exports")+11);
			var moduleContentNumber = parseInt(moduleContentNumberPre.slice(0, moduleContentNumberPre.indexOf(")")));
			if (!isNaN(moduleContentNumber)) {
				listRequiredModules(moduleContentNumber);
				if (requiredModules.indexOf(moduleContentNumber) == -1) {
					requiredModules.push(moduleContentNumber);
				}
			}

			// check for exports with equal sign
			var moduleContent = modules[startModule][0].toString().replace(/\s/g, "");
			var moduleContentNumberPre = moduleContent.slice(moduleContent.indexOf(".exports")+9);
			var moduleContentNumber = parseInt(moduleContentNumberPre.slice(0, moduleContentNumberPre.indexOf(";}")));
			if (!isNaN(moduleContentNumber)) {
				listRequiredModules(moduleContentNumber);
				if (requiredModules.indexOf(moduleContentNumber) == -1) {
					requiredModules.push(moduleContentNumber);
				}
			}
		}
		if (modules[startModule][1]) {
			for (var i in modules[startModule][1]) {
				listRequiredModules(modules[startModule][1][i]);
				if (requiredModules.indexOf(modules[startModule][1][i]) == -1) {
					requiredModules.push(modules[startModule][1][i]);
				}
			}
		}
	}
}
var listAvailableModules = function(moduleList) {
	var moduleInList = [];
	for (var i=0; i<moduleList.length; i++) {
		if (modules[moduleList[i]]) {
			//moduleInList.push(true);
		} else {
			moduleInList.push(moduleList[i]);
		}
	}
	return moduleInList;
}