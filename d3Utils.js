// JavaScript
var senseD3 = {
  createData : function(dataSet, numDims, msrInfo){
	console.log("Inside d3Utils createData function");
	var JsonData = [];
	var msr2 = [];
	var existsIndex = -999;
	for(var i = 0; i < dataSet.length; i++){
	
	  if(JsonData.length > 0)
	  	existsIndex = getExistingIndex(dataSet[i][1].qText,JsonData); 
	  var obj = {};
	    for(var j = 0; j < msrInfo.length; j++){
		  var msrVal = [];
		  msrVal[0] = parseInt(dataSet[i][0].qText);
		  msrVal[1] = parseInt(dataSet[i][2+j].qText);
		  var msrName = msrInfo[j].qFallbackTitle;
		  if(existsIndex != -999)
		  {
		  	JsonData[existsIndex][msrName].push(msrVal);
		  }
		  obj[msrName] = [];
		  obj[msrName].push(msrVal);
		  obj['name'] = dataSet[i][1].qText;
		}
		if(existsIndex == -999)
		JsonData.push(obj);
	}	
	return JsonData;
  },
  getMaxMinMeasure: function(dataSet,msrNum){
  	msrNum = msrNum + 1;
  	var maxMin = {};
  	var max = 0;
  	var min = parseInt(dataSet[0][2].qText);
  	for(var i = 0; i < dataSet.length; i++){
		if(parseInt(dataSet[i][msrNum].qText) > max){
			max = parseInt(dataSet[i][msrNum].qText) * 1.2;
		}
		if(parseInt(dataSet[i][msrNum].qText) < min){
			min = parseInt(dataSet[i][msrNum].qText);
		}
  	}
  	maxMin["max"] = max;
  	maxMin["min"] = min;
  	return maxMin;
  }
}

function getExistingIndex(country, JsonData){
	for(var i = 0; i < JsonData.length; i++){
		if(JsonData[i].name == country){
			return i;
		}
	}
		return -999;
}