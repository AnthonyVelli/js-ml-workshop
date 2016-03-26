
//Start off with what passes the first test.
function KNN(kSize){
	this.kSize = kSize;
	this.points = [];
}

KNN.prototype.train = function(array){
	this.points = this.points.concat(array);
}



KNN.prototype._distance = function(array1, array2){
	 function euclideanNorm(arr){
        return Math.sqrt( arr.reduce(function(old, n){return old + n*n },0) )
    }

    function vectorSub(array1, array2){
        return array1.map(function(_,index){return array1[index] - array2[index]});
    }

    function dist(array1, array2){
        
        return euclideanNorm(vectorSub(array1,array2));
 
        
    }
    return dist(array1,array2);
}
KNN.prototype._distances = function(array1, array2){
	return(array2.map(function(element){
		return [this._distance(element[0], array1), element[1]]
	}, this))
}
KNN.prototype._sorted = function(arrayOfArrays){
	return arrayOfArrays.sort(function(a,b){
		if(a[0] > b[0]){
			return 1
		} else {
			return -1
		}
	}).map(element => {return element[1]})
}

KNN.prototype._majority = function(kVal, array){
	var frequencyCount = {};
	array.slice(0, kVal).forEach(element => frequencyCount[element] ? frequencyCount[element] += 1 : frequencyCount[element] = 1)
	var counter = 0;
	var highestFreq;
	for (var key in frequencyCount){
		if (frequencyCount[key] >= counter) {
			counter = frequencyCount[key];
			highestFreq = key;
		}
	}
	return parseInt(highestFreq);
}


KNN.prototype.predictSingle = function(vector){
	//console.log(this.points)
	return this._majority(this.kSize, this._sorted(this._distances(vector, this.points)))
};

KNN.prototype.predict = function(vectorSample){
	return vectorSample.map(element => this.predictSingle(element))
};

KNN.prototype.score = function(vectorSample){
	return vectorSample.map(element => this.predictSingle(element))
};

module.exports = KNN