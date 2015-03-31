var buildMatrixFromJson = function(json) {

  var packages = json;

  var indexByName = {};
  var packageNames = {};
  var matrix = [];
  var n = 0;
  var replaces = {};

  // Compute a unique index for each package name.
  packages.forEach(function(p) {
    packageName = p.name;
    if (!(packageName in indexByName)) {
      packageNames[n] = packageName;
      indexByName[packageName] = n++;
    }
  });

  // Construct a square matrix counting package requires.
  packages.forEach(function(p) {
    var source = indexByName[p.name];
    var row = matrix[source];
    if (!row) {
     row = matrix[source] = [];
     for (var i = -1; ++i < n;) row[i] = 0;
    }
    if (p.require!=null){
    p.require.forEach( function(packageName) {
	    console.log(indexByName)
	  console.log(packageName)
	  console.log(p.require)
	    console.log(indexByName[packageName])
      row[indexByName[packageName]]++; 
    });
    }
  });

  // add small increment to equally weighted dependencies to force order
  matrix.forEach(function(row, index) {
    var increment = 0.001;
    for (var i = -1; ++i < n;) {
      var ii = (i + index) % n;
      if (row[ii] == 1) {
        row[ii] += increment;
        increment += 0.001;
      }
    }
  });

  return {
    matrix: matrix,
    packageNames: packageNames
  }
};
