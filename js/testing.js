var modules = {}


var requiredModules = [1,2,4,5,6,7,17,18,19,20,33,34,35,36,37,38,39,40,41,42,43,142,143,152,153,154,155,156,157,158,159,160,161,162,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,291,292,293,294,295,296,297,298,299,300,301,304,305,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498];

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