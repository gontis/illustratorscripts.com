//(c) www.illustratorscripts.com


(function () {
  //hue variation of color of triangles
  var HUE_VAR = 20;
  //saturation variation of triangles
  var SAT_VAR = 10;
  //lightness variation of triangles
  var LIGHT_VAR = 10;

  //additional points to add to shape as vertices
  var NUM_POINTS = 60

  //setting this to [R,G,B], 0..255, ie: COL=[12,20,255]
  //will override selection color being picked

  var COL;

  if (ScriptUI.environment.keyboardState.altKey)
    NUM_POINTS = parseInt(prompt("enter point density. recommended range is 100..10000", 100))


  var doc;



  function main() {

    if (app.documents.length == 0 || app.selection.length != 1 || !(app.selection[0].constructor.name == "PathItem" || app.selection[0].constructor.name == "CompoundPathItem")) {
      alert(''' 
Triangulator.jsx. 
Select single path or compund path. Text should be
converted to outlines first. Press [ALT] when starting script for additional options.
Check for more at illustratorscripts.com
        ''');
      return;
    }

    clearConsole();

    doc = app.activeDocument;
    var selectedItem = doc.selection[0]

    var holes = [];
    var outerPath = null;

    //converts compounds to holes/outer paths
    if (selectedItem.constructor.name == "CompoundPathItem") {
      for (p = 0; p < selectedItem.pathItems.length; p++) {
        //ignore small holes
        if (Math.abs(selectedItem.pathItems[p].area) < 30)
          continue;
        holes.push(flattenPath(selectedItem.pathItems[p]));
      }
      if (holes.length == 1 && outerPath == null) {
        outerPath = holes[0];
        holes = [];
      } else {
        var minx = holes[0][0][0];
        var outer = 0;
        for (p = 0; p < holes.length; p++) {
          for (q = 0; q < holes[p].length; q++) {
            if (holes[p][q][0] < minx) {
              minx = holes[p][q][0];
              outer = p;
            }
          }
        }
        outerPath = holes[outer];
        holes.splice(outer, 1);
      }
    } else //or just one path
      outerPath = flattenPath(selectedItem);

    if (!outerPath) {
      alert("Bad path");
      return;
    }

    var dd;
    var fillRGB;
    try {
      if (selectedItem.pathItems)
        dd = selectedItem.pathItems[0].fillColor
      else
        if (!selectedItem.filled) throw "not filled"
        else
          dd = selectedItem.fillColor

      fillRGB = getRGBFromColor(dd);

    } catch (e) {
      trace(e)
      fillRGB = [255, 255, 255]
    }


    COL = COL || fillRGB


    var pathA = cutHolesInPath(outerPath, holes)

    var points = [];

    var rnd = NUM_POINTS;
    for (var i = 0; i < rnd; i++) {
      var B = selectedItem.geometricBounds;
      var x = B[0] + Math.random() * (B[2] - B[0]);
      var y = B[1] + Math.random() * (B[3] - B[1]);
      if (pointInsidePoly([x, y], pathA)) {
        points.push([x, y])
      }

    }
    points = points.concat(pathA)

    // Triangulate the points using Delaunay triangulation
    var triangles = Delaunay.triangulate(points);
    // Create a new layer for the triangulated shape
    //change data format
    var triangles2 = [];

    for (var i = 0; i < triangles.length; i += 3) {
      var triangle = [triangles[i], triangles[i + 1], triangles[i + 2]];
      triangles2.push(triangle);
    }


    drawTriangles2(triangles2, points, pathA)

  }


  /////////////////////////////////// geom

  //132532



  function drawTriangles2(triangles, points,outerPath) {


    var layer = doc.layers.add();
    layer.name = "Triangulated Shape";


    // Construct a map from point indices to arrays of adjacent triangles
    // indexas - taskas, taskas turi masyva trikampiu kurie eina per ji
    var adj = {};
    for (var i = 0; i < triangles.length; i++) {
      //kampu taskai
      var a = triangles[i][0];
      var b = triangles[i][1];
      var c = triangles[i][2];
      //jei kampas neturi dezutes, sukuriam jam
      if (!adj[a]) adj[a] = [];
      if (!adj[b]) adj[b] = [];
      if (!adj[c]) adj[c] = [];
      //i ta kampa padedam trikampio nr
      adj[a].push(i);
      adj[b].push(i);
      adj[c].push(i);
    }

    var processedPoints = {}
    var processedTriangles = {}
    var l = points.length;

    //::::::::::: FAUX SHADOW

    for (var i = 0; i < l; i++) {
      var toContinue = false;
      //pick random point
      var p = ~~(Math.random() * l);
      if (processedPoints[p])
        continue;

      processedPoints[p] = true;

      //kazkur bugas, nzn, jau velu krc
      if (!adj[p]) continue;
      //check all triangles around that point, make sure all unprocessed
      for (var j = 0; j < adj[p].length; j++) {

        var triangle = triangles[adj[p][j]];
        //even one triangle processed, we break out
        if (processedTriangles[triangle]) {
          toContinue = true
          break;
        }

        //::::::::: uncomment bellow for consistant shadows, } must be uncommented too
        // }

        // if (toContinue) continue;

        // //check all triangles aroudn that point again

        // for (var j = 0; j < adj[p].length; j++) {
        //   //check all triangles aroudn that point
        //   var triangle = triangles[adj[p][j]];

        //::::::::: end uncomment

        processedTriangles[triangle] = true;
        var a = triangle[0];
        var b = triangle[1];
        var c = triangle[2];
        var v = points[p];

        var trianglePoints = [points[a], points[b], points[c]]
        var cc = calculateTriangleCentroid(trianglePoints);

        if (!pointInsidePoly(cc, outerPath))
          continue;


        var angle = Math.atan2(cc[1] - v[1], cc[0] - v[0])
        angle = Math.abs(angle)

        trianglePoints.push(trianglePoints[0]);
        drawOneTriangle(trianglePoints, angle, layer)
      }
    }
    //::::::: REMAINING TRIANGLES
    //return;
    for (var i = 0; i < triangles.length; i++) {
      var triangle = triangles[i];
      if (processedTriangles[triangle])
        continue;
      var a = triangle[0];
      var b = triangle[1];
      var c = triangle[2];
      var trianglePoints = [points[a], points[b], points[c]]
      var cc = calculateTriangleCentroid(trianglePoints);
      if (!pointInsidePoly(cc, outerPath))
        continue;

      trianglePoints.push(trianglePoints[0]);
      drawOneTriangle(trianglePoints, Math.random() * 2, layer)



    }



  }

  function drawOneTriangle(trianglePoints, angle, layer, dbg) {
    var drawnPath = doc.pathItems.add();
    drawnPath.setEntirePath(trianglePoints);
    variateOneLIGHTNESS(drawnPath, [HUE_VAR, SAT_VAR, -angle * LIGHT_VAR], COL)
    drawnPath.stroked = true;
    drawnPath.strokeWidth = .01
    drawnPath.moveToEnd(layer);
  }


  function setGradient(cell, pathItem, center) {
    // Create a new gradient fill
    var gc = getCellCenter(cell)

    var cx = center[0] - gc[0];
    var cy = center[1] - gc[1];

    var gradient = doc.gradients.add();
    gradient.type = GradientType.RADIAL;

    // set the center point and radius of the gradient
    gradient.gradientStops[0].rampPoint = 0;
    gradient.gradientStops[1].rampPoint = 100;
    gradient.gradientStops[0].midPoint = 80;
    gradient.gradientStops[1].midPoint = 80;
    var col0 = new RGBColor();
    col0.green = 0, col0.blue = 0, col0.red = 0;
    var col1 = new RGBColor();
    //col1.green=255,col1.blue=255,col1.red=255;
    col1.green = 155, col1.blue = 155, col1.red = 155;

    gradient.gradientStops[0].color = col1;
    gradient.gradientStops[1].color = col0;

    // // translate the gradient origin to [cx, cy]
    // var tx = cx - gradient.gradientStops[0].rampPoint / 100 * (cx - gradient.gradientStops[1].rampPoint);
    // var ty = cy - gradient.gradientStops[0].rampPoint / 100 * (cy - gradient.gradientStops[1].rampPoint);
    // gradient.gradientTransform = new Matrix(1, 0, 0, 1, cx, cy);

    // trace(tx)

    // Apply the gradient fill to the path


    var gc = new GradientColor();
    gc.gradient = gradient;
    //gc.matrix=concatenateTranslationMatrix(gc.matrix,cx,cy)
    //gc.origin=center


    var moveMatrix = getTranslationMatrix(cx, cy);
    var rotateMatrix = concatenateRotationMatrix(moveMatrix, 0);
    var totalMatrix = concatenateScaleMatrix(rotateMatrix, 110, 110);




    pathItem.fillColor = gc;
    pathItem.fillOverprint = false
    pathItem.transform(totalMatrix, false, false, true, false, 0, Transformation.CENTER);

  }
  function drawPath(a, n) {

    var drawnPath = doc.pathItems.add();
    try {
      drawnPath.setEntirePath(a);
    } catch (e) {
    }

    drawnPath.stroked = true;
    drawnPath.strokeColor = doc.swatches[n].color

  }
  function setGradient2(pathItem, center) {
    // Create a new gradient fill
    var gradient = doc.gradients.add();
    gradient.type = GradientType.RADIAL; // Set the gradient type to radial
    gradient.gradientOrigin = [center[1], center[0]]


    // Set the center of the gradient to [cx, cy]
    var centerColor = gradient.gradientStops.add();
    centerColor.color = doc.defaultFillColor; // Use the default fill color
    centerColor.location = 0;

    // Set the outer edge of the gradient to the maximum distance of the path from the center
    var outerColor = gradient.gradientStops.add();
    outerColor.color = doc.defaultFillColor; // Use the default fill color
    outerColor.location = 1;

    // Apply the gradient fill to the path


    var color_of_gradient = new GradientColor();
    color_of_gradient.gradient = gradient;

    pathItem.fillColor = color_of_gradient;
  }
  function drawPath(a, n) {

    var drawnPath = doc.pathItems.add();
    try {
      drawnPath.setEntirePath(a);
    } catch (e) {
    }

    drawnPath.stroked = true;
    drawnPath.strokeColor = doc.swatches[n].color

  }


  function curve4(x1, y1,   //Anchor1
    x2, y2,   //Control1
    x3, y3,   //Control2
    x4, y4,   //Anchor2
    nSteps   // Flattening value
  ) {
    var pointList = new Array();
    var dx1 = x2 - x1;
    var dy1 = y2 - y1;
    var dx2 = x3 - x2;
    var dy2 = y3 - y2;
    var dx3 = x4 - x3;
    var dy3 = y4 - y3;

    var subdiv_step = 1.0 / (nSteps + 1);
    var subdiv_step2 = subdiv_step * subdiv_step;
    var subdiv_step3 = subdiv_step * subdiv_step * subdiv_step;

    var pre1 = 3.0 * subdiv_step;
    var pre2 = 3.0 * subdiv_step2;
    var pre4 = 6.0 * subdiv_step2;
    var pre5 = 6.0 * subdiv_step3;

    var tmp1x = x1 - x2 * 2.0 + x3;
    var tmp1y = y1 - y2 * 2.0 + y3;

    var tmp2x = (x2 - x3) * 3.0 - x1 + x4;
    var tmp2y = (y2 - y3) * 3.0 - y1 + y4;

    var fx = x1;
    var fy = y1;

    var dfx = (x2 - x1) * pre1 + tmp1x * pre2 + tmp2x * subdiv_step3;
    var dfy = (y2 - y1) * pre1 + tmp1y * pre2 + tmp2y * subdiv_step3;

    var ddfx = tmp1x * pre4 + tmp2x * pre5;
    var ddfy = tmp1y * pre4 + tmp2y * pre5;

    var dddfx = tmp2x * pre5;
    var dddfy = tmp2y * pre5;

    var step = nSteps;

    pointList.push([x1, y1]);	// Start Here
    while (step--) {
      fx += dfx;
      fy += dfy;
      dfx += ddfx;
      dfy += ddfy;
      ddfx += dddfx;
      ddfy += dddfy;
      pointList.push([fx, fy]);
    }
    //    pointList.push ([x4, y4]); // Last step must go exactly to x4, y4
    return pointList;
  }

  function flattenPath(obj) {
    var newpath = new Array();
    var curveList;
    var pt, nextpt;
    var isFlattened = false;

    if (!obj.hasOwnProperty("pathPoints"))
      return null;

    for (pt = 0; pt < obj.pathPoints.length; pt++) {
      nextpt = pt + 1;
      if (nextpt == obj.pathPoints.length)
        nextpt = 0;
      if (obj.pathPoints[pt].anchor[0] == obj.pathPoints[pt].rightDirection[0] && obj.pathPoints[pt].anchor[1] == obj.pathPoints[pt].rightDirection[1] &&
        obj.pathPoints[nextpt].anchor[0] == obj.pathPoints[nextpt].leftDirection[0] && obj.pathPoints[nextpt].anchor[1] == obj.pathPoints[nextpt].leftDirection[1]) {
        newpath.push(obj.pathPoints[pt].anchor);
      } else {
        isFlattened = true;
        curveList = curve4(obj.pathPoints[pt].anchor[0], obj.pathPoints[pt].anchor[1],
          obj.pathPoints[pt].rightDirection[0], obj.pathPoints[pt].rightDirection[1],
          obj.pathPoints[nextpt].leftDirection[0], obj.pathPoints[nextpt].leftDirection[1],
          obj.pathPoints[nextpt].anchor[0], obj.pathPoints[nextpt].anchor[1],
          2);
        newpath = newpath.concat(curveList);
      }
    }
    //	Make path round
    //	newpath.push (newpath[0]);
    return newpath;
  }


  function removeWalls(current, neighbor) {
    var c0 = getCellCenter(current);
    var c1 = getCellCenter(neighbor);


    drawPath([c0, c1], 6)
  }

  function drawVoronoi(cells, centers, points, doc) {
    // Create a new layer to draw the Voronoi cells on
    var layer = doc.layers.add();
    layer.name = "Voronoi Diagram";

    // Loop through each cell and draw its edges and fill
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];

      // Create a new path object for the cell's edges
      var edges = doc.pathItems.add();
      edges.filled = false;
      edges.stroked = true;
      edges.strokeWidth = 0.5;

      cell.push(cell[0])
      edges.setEntirePath(cell);



      // setGradient(cell, edges, points[centers[i]])
    }
  }


  // Helper function to compute the circumcenter of a triangle
  function circumcenter(a, b, c) {
    // Define the coordinates of the points
    var ax = a[0], ay = a[1];
    var bx = b[0], by = b[1];
    var cx = c[0], cy = c[1];

    // Define the distances between the points
    var a2 = ax * ax + ay * ay;
    var b2 = bx * bx + by * by;
    var c2 = cx * cx + cy * cy;

    // Define the denominator of the formula
    var d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));

    // Define the coordinates of the circumcenter
    var ux = ((a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / d);
    var uy = ((a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / d);

    // Return the coordinates of the circumcenter as an array
    return [[ux, uy], d];
  }

  function sortCellPaths(cells) {
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];

      // Sort the points in the cell by their angle with respect to the cell center
      var center = getCellCenter(cell);
      cell.sort(function (a, b) {
        var angleA = Math.atan2(a[1] - center[1], a[0] - center[0]);
        var angleB = Math.atan2(b[1] - center[1], b[0] - center[0]);
        return angleA - angleB;
      });
    }
    return cells
  }




  // Helper function to compute the center of a Voronoi cell
  //not corect! just basic center of path
  function getCellCenter(cell) {
    var sumX = 0, sumY = 0;
    for (var i = 0; i < cell.length; i++) {
      sumX += cell[i][0];
      sumY += cell[i][1];
    }
    return [sumX / cell.length, sumY / cell.length];
  }

  //from Jongware
  function cutHolesInPath(path, holes) {
    if (getWinding(path) < 0)
      path.reverse();

    //	Remove holes by joining them with the outer edge
    if (holes.length) {
      for (hh = 0; hh < holes.length; hh++) {
        var h = holes[hh];
        if (getWinding(h) > 0)
          h.reverse();

        var maxpt = 0;
        for (i = 1; i < h.length; i++) {
          if (h[i][0] > h[maxpt][0] || (h[i][0] == h[maxpt][0] && h[i][1] < h[maxpt][1]))
            maxpt = i;
        }
        while (maxpt > 0) {
          h.push(h.shift());
          maxpt--;
        }
      }
      holes.sort(function (a, b) { if (a[0][0] > b[0][0]) return -1; if (a[0][0] < b[0][0]) return 1; return (a[0][1] < b[0][1]) ? 1 : -1; });
      for (hh = 0; hh < holes.length; hh++) {
        var h = holes[hh];
        var maxpt = 0;

        for (i = 1; i < h.length; i++)
          if (h[i][0] > h[maxpt][0] || (h[i][0] == h[maxpt][0] && h[i][1] < h[maxpt][1]))
            maxpt = i;

        var d2 = null;
        var closestpt;
        for (i = 0; i < path.length; i++) {
          if (path[i][0] > h[maxpt][0]) {
            if (d2 == null) {
              d2 = ClosestPointOnLine(h[maxpt], [path[i], path[(i + 1) % path.length]])[1];
              closestpt = i;
            } else {
              var dd2 = ClosestPointOnLine(h[maxpt], [path[i], path[(i + 1) % path.length]])[1];
              if (dd2 < d2) {
                d2 = dd2;
                closestpt = i;
              }
            }
          }
        }

        path.splice(closestpt, 0, [path[closestpt][0], path[closestpt][1] + 0.1]);
        closestpt++;
        h.splice(maxpt, 0, [h[maxpt][0], h[maxpt][1]]);

        h[maxpt][1] -= 0.1;
        for (var i = maxpt; i >= 0; i--) {
          path.splice(closestpt, 0, h[i]);
        }
        for (var i = h.length - 1; i > maxpt; i--) {
          path.splice(closestpt, 0, h[i]);
        }
      }
    }

    return path
  }
  function getWinding(path) {
    //    Return area of a simple (ie. non-self-intersecting) polygon.
    //    Will be negative for counterclockwise winding.
    var i, next;
    var accum = 0;
    for (i = 0; i < path.length - 1; i++) {
      next = i + 1;
      accum += path[next][0] * path[i][1] - path[i][0] * path[next][1];
    }
    next = 0;
    accum += path[next][0] * path[i][1] - path[i][0] * path[next][1];
    return accum / 2;
  }
  function calculateTriangleCentroid(tri) {
    //util_inspect_properties(tri)  
    var centerX = (tri[0][0] + tri[1][0] + tri[2][0]) / 3;
    var centerY = (tri[0][1] + tri[1][1] + tri[2][1]) / 3;
    return [centerX, centerY];
  }

  function pointInsidePoly(pt, poly) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
      ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1]))
        && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
        && (c = !c);

    return c;
  }

  function drawTriangles(triangles, points, outerPath) {
    var layer = doc.layers.add();
    layer.name = "Triangulated Shape";

    for (var i = 0; i < triangles.length; i += 3) {
      var triangle = [[points[triangles[i]][0], points[triangles[i]][1]],
      [points[triangles[i + 1]][0], points[triangles[i + 1]][1]],
      [points[triangles[i + 2]][0], points[triangles[i + 2]][1]],
      [points[triangles[i]][0], points[triangles[i]][1]]
      ]

      if (pointInsidePoly(calculateTriangleCentroid(triangle), outerPath)) {
        var drawnPath = doc.pathItems.add();

        drawnPath.setEntirePath(triangle);
        //drawnPath.filled = true;
        //drawnPath.fillColor = new RGBColor(255, 0, 0);
        variateOneLIGHTNESS(drawnPath, [0, 0, -Math.random() * 100], [255, 255, 255])
        drawnPath.stroked = true;
        drawnPath.moveToEnd(layer);
      }
    }
  }


  function linePathIntersect(line, path) {
    var x1 = line[0][0];
    var y1 = line[0][1];
    var x2 = line[1][0];
    var y2 = line[1][1];
    for (var i = 0; i < path.length - 1; i++) {
      var x3 = path[i][0];
      var y3 = path[i][1];
      var x4 = path[i + 1][0];
      var y4 = path[i + 1][1];
      var den = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
      if (den == 0) continue;
      var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / den;
      var ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / den;
      if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
        return true;
      }
    }
    return false;
  }


  function getPointsOfPath(selectedItem) {

    var pathA = [];
    for (var i = 0; i < selectedItem.pathPoints.length; i++) {
      var x = selectedItem.pathPoints[i].anchor[0];
      var y = selectedItem.pathPoints[i].anchor[1];
      pathA.push([x, y]);
    }
    return pathA;

  }




  ////////maze




  function getAdjacentCells(cells) {
    var adj = {};
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      for (var j = 0; j < cell.length; j++) {
        var point = cell[j];
        if (!adj[point]) adj[point] = [];
        //keeps index of cells
        adj[point].push(i);
      }
    }
    return adj;
  }

  function generateMaze(neighbours, startCellIndex) {
    var currentCell = neighbours[startCellIndex];
    visited[startCellIndex] = true;

    for (var i = 0; i < currentCell.length; i++) {
      var neighbourIndex = currentCell[i];

      // if the neighbour hasn't been visited, add it to the list of unvisited neighbours
      if (!visited[neighbourIndex]) {

        if (Math.random() > .4) {
          generateMaze(neighbours, neighbourIndex)
          removeWalls(cells[startCellIndex], cells[neighbourIndex]);

        }

      }
    }

  }
  function getNeighbouringCells(cells) {
    var neighbours = {};

    // get cells adjacent to each vertex
    var adjacentCells = getAdjacentCells(cells);

    // iterate over each cell
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var cellNeighbours = [];

      // check each vertex of the current cell
      for (var j = 0; j < cell.length; j++) {
        var vertex = cell[j];

        // iterate over adjacent cells for the current vertex
        for (var k = 0; k < adjacentCells[vertex].length; k++) {
          var adjacentCellIndex = adjacentCells[vertex][k];

          // add the adjacent cell index to the current cell's neighbours
          if (adjacentCellIndex !== i && cellNeighbours.indexOf(adjacentCellIndex) === -1) {
            cellNeighbours.push(adjacentCellIndex);
          }
        }
      }

      neighbours[i] = cellNeighbours;
    }

    return neighbours;
  }
  function generateMaze2(neighbours, startCellIndex) {
    var visited = {};
    var stack = [startCellIndex];
    var maze = {};

    // mark the starting cell as visited
    visited[startCellIndex] = true;

    // set previous cell to starting cell
    var prevIndex = startCellIndex;

    // loop until the stack is empty
    while (stack.length > 0) {
      var currentIndex = stack[stack.length - 1];
      var currentCell = neighbours[currentIndex];
      var unvisitedNeighbours = [];

      // check each neighbouring cell
      for (var i = 0; i < currentCell.length; i++) {
        var neighbourIndex = currentCell[i];

        // if the neighbour hasn't been visited, add it to the list of unvisited neighbours
        if (!visited[neighbourIndex]) {
          unvisitedNeighbours.push(neighbourIndex);
        }
      }

      // if there are unvisited neighbours, pick one at random and remove the wall between the current cell and the chosen neighbour
      if (unvisitedNeighbours.length > 0) {
        var chosenIndex = Math.floor(Math.random() * unvisitedNeighbours.length);
        var chosenCell = unvisitedNeighbours[chosenIndex];

        // remove the wall between the current cell and the chosen neighbour
        if (!maze[currentIndex]) {
          maze[currentIndex] = [];
        }
        removeWalls(cells[currentIndex], cells[chosenCell]);

        if (!maze[chosenCell]) {
          maze[chosenCell] = [];
        }
        maze[currentIndex].push(chosenCell);
        maze[chosenCell].push(currentIndex);

        // mark the chosen neighbour as visited and add it to the stack
        visited[chosenCell] = true;
        stack.push(chosenCell);

        // update previous cell
        prevIndex = currentIndex;
      } else {
        // backtracking: if there are no unvisited neighbours, remove the current cell from the stack and continue with the previous cell
        stack.pop();
        currentIndex = prevIndex;
      }
    }

    return maze;
  }
  function drawTriangle(i) {
    var triangle =
      [[points[triangles2[i][0]][0], points[triangles2[i][0]][1]],
      [points[triangles2[i][1]][0], points[triangles2[i][1]][1]],
      [points[triangles2[i][2]][0], points[triangles2[i][2]][1]],
      [points[triangles2[i][0]][0], points[triangles2[i][0]][1]]
      ]

    var drawnPath = doc.pathItems.add();
    drawnPath.setEntirePath(triangle);
    drawnPath.stroked = true;


  }




  /////////////////////////////////// misc








  Array.prototype.indexOf = function (searchElement, fromIndex) {
    var startIndex = fromIndex || 0;
    var length = this.length;

    for (var i = startIndex; i < length; i++) {
      if (this[i] == searchElement) {
        return i;
      }
    }

    return -1;
  };
  function clearConsole() {
    return;
    if (app.name === "ExtendScript Toolkit") {
      app.clc();
    } else {
      var estApp = BridgeTalk.getSpecifier("estoolkit");
      if (estApp) {
        var bt = new BridgeTalk;
        bt.target = estApp;
        bt.body = "app.clc()";
        bt.send();
      }
    }
  }
  function util_inspect_properties(f) {
    $.writeln(f.reflect.name);
    var props = f.reflect.properties;
    var array = [];
    for (var i = 0; i < props.length; i++)
      try {
        array.push(props[i].name + ": " + f[props[i].name])
      } catch (_) { }
    array.sort();
    $.writeln(array.join("\r"));
  }

  function traceON(v) {
    return;
    trace(JSON.stringify(v))
  }

  function trace() {
    return;
    var s = "";
    for (var i = 0; i < arguments.length; i++) {
      s += arguments[i] + " "
    }
    $.writeln(s);
  }
  // Compute the distance from segment Line to Pt
  // Returns [ Point, Distance ]
  function ClosestPointOnLine(pt, line) {
    var X1 = line[0][0], Y1 = line[0][1];
    var X2 = line[1][0], Y2 = line[1][1];
    var px = pt[0], py = pt[1];

    var dx = X2 - X1;
    var dy = Y2 - Y1;

    var nx, ny;

    if (dx == 0 && dy == 0) {
      // It's a point not a line segment.
      // dx = px - X1
      // dy = py - Y1
      // distance = Sqr(dx * dx + dy * dy)
      nx = X1;
      ny = Y1;
    } else {
      // Calculate the t that minimizes the distance.
      var t = ((px - X1) * dx + (py - Y1) * dy) / (dx * dx + dy * dy);

      // See if this represents one of the segment's
      // end points or a point in the middle.
      if (t <= 0) {
        nx = X1;
        ny = Y1;
      } else if (t >= 1) {
        nx = X2;
        ny = Y2;
      } else {
        nx = X1 + t * dx;
        ny = Y1 + t * dy;
      }
    }

    dx = px - nx;
    dy = py - ny;

    return [[nx, ny], Math.sqrt(dx * dx + dy * dy)];
  }



  function getCurrentColors() {
    var doc = app.activeDocument;
    var currentColors = {};
    var dd
    var fillRGB
    try {
      dd = doc.defaultFillColor
      fillRGB = getRGBFromColor(dd);
    } catch (e) {
      fillRGB = [255, 255, 255]
    }
    var fillRGBColor = getRGBColorFromArray(fillRGB);
    currentColors.fill = fillRGBColor;
    //!!!!!!!!!!! add try/cacth
    var strokeRGB = getRGBFromColor(doc.defaultStrokeColor);
    var strokeRGBColor = getRGBColorFromArray(strokeRGB);
    currentColors.stroke = strokeRGBColor;
    return currentColors;
  }
  function getRGBFromColor(color) {

    if (color.typename == "RGBColor") {
      return [color.red, color.green, color.blue];
    } else if (color.typename == "GrayColor") {
      return [color.gray, color.gray, color.gray];
    } else if (color.typename == "CMYKColor") {
      var cyan = color.cyan / 100;
      var magenta = color.magenta / 100;
      var yellow = color.yellow / 100;
      var black = color.black / 100;

      var red = 1 - Math.min(1, cyan * (1 - black) + black);
      var green = 1 - Math.min(1, magenta * (1 - black) + black);
      var blue = 1 - Math.min(1, yellow * (1 - black) + black);

      return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
    } else {
      return [0, 0, 0];
    }
  }
  function getRGBColorFromArray(rgbArray) {
    var red = rgbArray[0];
    var green = rgbArray[1];
    var blue = rgbArray[2];

    red = range(red, 0, 255);
    green = range(green, 0, 255);
    blue = range(blue, 0, 255);

    var rgbColor = new RGBColor();
    rgbColor.red = red;
    rgbColor.green = green;
    rgbColor.blue = blue;
    return rgbColor;
  }
  function range(v, d, u) {
    if (v > u) v = u;
    if (v < d) v = d;
    return v;
  }
  function rgbToHsl(color) {
    var r = color.red / 255;
    var g = color.green / 255;
    var b = color.blue / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      hue: Math.round(h * 360),
      saturation: Math.round(s * 100),
      lightness: Math.round(l * 100)
    };
  }
  function hslToRgb(h, s, l) {
    var chroma = (1 - Math.abs((2 * l / 100) - 1)) * (s / 100);
    var hueSegment = h / 60;
    var x = chroma * (1 - Math.abs((hueSegment % 2) - 1));
    var r1, g1, b1;
    if (hueSegment >= 0 && hueSegment < 1) {
      r1 = chroma;
      g1 = x;
      b1 = 0;
    } else if (hueSegment >= 1 && hueSegment < 2) {
      r1 = x;
      g1 = chroma;
      b1 = 0;
    } else if (hueSegment >= 2 && hueSegment < 3) {
      r1 = 0;
      g1 = chroma;
      b1 = x;
    } else if (hueSegment >= 3 && hueSegment < 4) {
      r1 = 0;
      g1 = x;
      b1 = chroma;
    } else if (hueSegment >= 4 && hueSegment < 5) {
      r1 = x;
      g1 = 0;
      b1 = chroma;
    } else {
      r1 = chroma;
      g1 = 0;
      b1 = x;
    }
    var m = (l / 100) - (chroma / 2);
    var r = Math.round((r1 + m) * 255);
    var g = Math.round((g1 + m) * 255);
    var b = Math.round((b1 + m) * 255);
    return [r, g, b];
  }


  function variateOneLIGHTNESS(p, h, cc) {
    c = p.fillColor;
    c = getRGBFromColor(c);
    ///!!!
    c = getRGBColorFromArray(cc ? cc : c);
    c = rgbToHsl(c);
    p.filled = true;
    p.fillColor = getRGBColorFromArray(hslToRgb(c.hue + h[0] * Math.random() - h[0] / 2, c.saturation + h[1] * Math.random() - h[1] / 2, c.lightness + h[2]));
  }

  var Delaunay;

(function() {
  "use strict";

  var EPSILON = 1.0 / 1048576.0;

  function supertriangle(vertices) {
    var xmin = Number.POSITIVE_INFINITY,
        ymin = Number.POSITIVE_INFINITY,
        xmax = Number.NEGATIVE_INFINITY,
        ymax = Number.NEGATIVE_INFINITY,
        i, dx, dy, dmax, xmid, ymid;

    for(i = vertices.length; i--; ) {
      if(vertices[i][0] < xmin) xmin = vertices[i][0];
      if(vertices[i][0] > xmax) xmax = vertices[i][0];
      if(vertices[i][1] < ymin) ymin = vertices[i][1];
      if(vertices[i][1] > ymax) ymax = vertices[i][1];
    }

    dx = xmax - xmin;
    dy = ymax - ymin;
    dmax = Math.max(dx, dy);
    xmid = xmin + dx * 0.5;
    ymid = ymin + dy * 0.5;

    return [
      [xmid - 20 * dmax, ymid -      dmax],
      [xmid            , ymid + 20 * dmax],
      [xmid + 20 * dmax, ymid -      dmax]
    ];
  }

  function circumcircle(vertices, i, j, k) {
    var x1 = vertices[i][0],
        y1 = vertices[i][1],
        x2 = vertices[j][0],
        y2 = vertices[j][1],
        x3 = vertices[k][0],
        y3 = vertices[k][1],
        fabsy1y2 = Math.abs(y1 - y2),
        fabsy2y3 = Math.abs(y2 - y3),
        xc, yc, m1, m2, mx1, mx2, my1, my2, dx, dy;

    /* Check for coincident points */
    if(fabsy1y2 < EPSILON && fabsy2y3 < EPSILON)
      throw new Error("Eek! Coincident points!");

    if(fabsy1y2 < EPSILON) {
      m2  = -((x3 - x2) / (y3 - y2));
      mx2 = (x2 + x3) / 2.0;
      my2 = (y2 + y3) / 2.0;
      xc  = (x2 + x1) / 2.0;
      yc  = m2 * (xc - mx2) + my2;
    }

    else if(fabsy2y3 < EPSILON) {
      m1  = -((x2 - x1) / (y2 - y1));
      mx1 = (x1 + x2) / 2.0;
      my1 = (y1 + y2) / 2.0;
      xc  = (x3 + x2) / 2.0;
      yc  = m1 * (xc - mx1) + my1;
    }

    else {
      m1  = -((x2 - x1) / (y2 - y1));
      m2  = -((x3 - x2) / (y3 - y2));
      mx1 = (x1 + x2) / 2.0;
      mx2 = (x2 + x3) / 2.0;
      my1 = (y1 + y2) / 2.0;
      my2 = (y2 + y3) / 2.0;
      xc  = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
      yc  = (fabsy1y2 > fabsy2y3) ?
        m1 * (xc - mx1) + my1 :
        m2 * (xc - mx2) + my2;
    }

    dx = x2 - xc;
    dy = y2 - yc;
    return {i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy};
  }

  function dedup(edges) {
    var i, j, a, b, m, n;

    for(j = edges.length; j; ) {
      b = edges[--j];
      a = edges[--j];

      for(i = j; i; ) {
        n = edges[--i];
        m = edges[--i];

        if((a === m && b === n) || (a === n && b === m)) {
          edges.splice(j, 2);
          edges.splice(i, 2);
          break;
        }
      }
    }
  }

  Delaunay = {
    triangulate: function(vertices, key) {
      var n = vertices.length,
          i, j, indices, st, open, closed, edges, dx, dy, a, b, c;

      /* Bail if there aren't enough vertices to form any triangles. */
      if(n < 3)
        return [];

      /* Slice out the actual vertices from the passed objects. (Duplicate the
       * array even if we don't, though, since we need to make a supertriangle
       * later on!) */
      vertices = vertices.slice(0);

      if(key)
        for(i = n; i--; )
          vertices[i] = vertices[i][key];

      /* Make an array of indices into the vertex array, sorted by the
       * vertices' x-position. Force stable sorting by comparing indices if
       * the x-positions are equal. */
      indices = new Array(n);

      for(i = n; i--; )
        indices[i] = i;

      indices.sort(function(i, j) {
        var diff = vertices[j][0] - vertices[i][0];
        return diff !== 0 ? diff : i - j;
      });

      /* Next, find the vertices of the supertriangle (which contains all other
       * triangles), and append them onto the end of a (copy of) the vertex
       * array. */
      st = supertriangle(vertices);
      vertices.push(st[0], st[1], st[2]);
      
      /* Initialize the open list (containing the supertriangle and nothing
       * else) and the closed list (which is empty since we havn't processed
       * any triangles yet). */
      open   = [circumcircle(vertices, n + 0, n + 1, n + 2)];
      closed = [];
      edges  = [];

      /* Incrementally add each vertex to the mesh. */
      for(i = indices.length; i--; edges.length = 0) {
        c = indices[i];

        /* For each open triangle, check to see if the current point is
         * inside it's circumcircle. If it is, remove the triangle and add
         * it's edges to an edge list. */
        for(j = open.length; j--; ) {
          /* If this point is to the right of this triangle's circumcircle,
           * then this triangle should never get checked again. Remove it
           * from the open list, add it to the closed list, and skip. */
          dx = vertices[c][0] - open[j].x;
          if(dx > 0.0 && dx * dx > open[j].r) {
            closed.push(open[j]);
            open.splice(j, 1);
            continue;
          }

          /* If we're outside the circumcircle, skip this triangle. */
          dy = vertices[c][1] - open[j].y;
          if(dx * dx + dy * dy - open[j].r > EPSILON)
            continue;

          /* Remove the triangle and add it's edges to the edge list. */
          edges.push(
            open[j].i, open[j].j,
            open[j].j, open[j].k,
            open[j].k, open[j].i
          );
          open.splice(j, 1);
        }

        /* Remove any doubled edges. */
        dedup(edges);

        /* Add a new triangle for each edge. */
        for(j = edges.length; j; ) {
          b = edges[--j];
          a = edges[--j];
          open.push(circumcircle(vertices, a, b, c));
        }
      }

      /* Copy any remaining open triangles to the closed list, and then
       * remove any triangles that share a vertex with the supertriangle,
       * building a list of triplets that represent triangles. */
      for(i = open.length; i--; )
        closed.push(open[i]);
      open.length = 0;

      for(i = closed.length; i--; )
        if(closed[i].i < n && closed[i].j < n && closed[i].k < n)
          open.push(closed[i].i, closed[i].j, closed[i].k);

      /* Yay, we're done! */
      return open;
    },
    contains: function(tri, p) {
  /* Bounding box test first, for quick rejections */
  if (p[0] < tri[0][0] && p[0] < tri[1][0] && p[0] < tri[2][0] ||
      p[0] > tri[0][0] && p[0] > tri[1][0] && p[0] > tri[2][0] ||
      p[1] < tri[0][1] && p[1] < tri[1][1] && p[1] < tri[2][1] ||
      p[1] > tri[0][1] && p[1] > tri[1][1] && p[1] > tri[2][1])
    return null;

  var a = tri[1][0] - tri[0][0],
      b = tri[2][0] - tri[0][0],
      c = tri[1][1] - tri[0][1],
      d = tri[2][1] - tri[0][1],
      i = a * d - b * c;

  /* Degenerate tri. */
  if (i === 0.0)
    return null;

  var u = (d * (p[0] - tri[0][0]) - b * (p[1] - tri[0][1])) / i,
      v = (a * (p[1] - tri[0][1]) - c * (p[0] - tri[0][0])) / i;

  /* If we're outside the tri, fail */
  if (u < 0.0 || v < 0.0 || (u + v) > 1.0)
    return null;

  return [u, v];
},
  };

  if(typeof module !== "undefined")
    module.exports = Delaunay;
})();
  main()

})();

