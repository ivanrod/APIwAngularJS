function usersFilter(){
	'use strict';
	return function(inputArray, anotherArray) {
	    var inputArray = inputArray.slice() || [];
	    
	    for (var i = 0; i < anotherArray.length; i++){
	    	for (var j = 0; j < inputArray.length; j++){
	    		if (inputArray[j].name === anotherArray[i].userId){
	    			inputArray.splice(j,1)
	    		}
	    	}
	    }

	    return inputArray;
  	};
}