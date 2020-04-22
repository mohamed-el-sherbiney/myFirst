// setting canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 0.8 * window.innerWidth; //setting canvas width dynamically (Responsive)



// this variable is used to store how many bars the user need to draw
var bars;
//this variable is used to store the title of the graph
var title;
//this variable is used to store the names of bars in an array
var names;
//this variable is used to store the values of bars in an array
var values;
//number of grids to be drawn in the canvas
var numberOfGrids;
//the vertical distance between each grid and the other , in px
var gridHeight;
//this variable is used to store vertical scale to be used in the graph
var verticalScale;
//this variable is used to store the width of each bar
var barWidth;
//this variable is used to store the margin between bars
var horizontalMargin;



//when the user clicks the button , function printHTML will be called
document.getElementById("btn").addEventListener("click", printHTML);

/*
this function is used to :
1- assign value of bars
2- verifying the user's input
3-inject html code to the empty div whose id "col-list"
3-create a button and add event to it
*/

function printHTML() {
  bars = Number(document.getElementById("bars").value);
  //first check validity of inputs
  if (bars < 1) {
    document.getElementById("verification").innerText = "enter valid number";
  } else if (bars > 8) {
    document.getElementById("verification").innerText = "number of bars can't exceed 8";
  } else {
    document.getElementById("verification").innerText = "";
    //this html code will be printed as many times as value of bars by using for loop
    var code = "<p>bar name <input type='text' class='name'>,value<input type='number' class='value'></p>";
    //reset the value of div to null each time to evade collapse
    document.getElementById("col-list").innerHTML = "";
    for (var i = 0; i < bars; i++) {
      document.getElementById("col-list").innerHTML += code;
    }
    document.getElementById("col-list").innerHTML += "<button type='button' name='button' id = 'start'>Start Drawing</button>";
    document.getElementById("start").addEventListener("click", fetchInputs);
  }
}


/*
this function is used to :
1-store the input values in arrays (array for names , and another array for values)
2- determine the width of each bar , the margin between bars , verticalScale
*/
function fetchInputs() {

  // to clear both arrays each time the user clicks
  names = [];
  values = [];


  // for loop for saving set of names and values in arrays
  for (var i = 0; i < bars; i++) {
    names.push(document.querySelectorAll(".name")[i].value);
    // we added "Number" method in order to save the values as integers not strings
    values.push(Number(document.querySelectorAll(".value")[i].value));
  }


  //draw the grid of the X-axis , assume margin 5% at start and end of the myCanvas
  //assume maximum number of elements to be drawn = 8 ,, and set the width of the bar and margin depending on number of bars to be drawn
  if (bars < 4) {
    barWidth = 0.15 * canvas.width;
    horizontalMargin = 0.10 * canvas.width;
  } else if (bars > 4) {
    barWidth = 0.08 * canvas.width;
    horizontalMargin = 0.05 * canvas.width;
  }

  numberOfGrids = 20;
  gridHeight = 30;
  verticalScale = Math.ceil(Math.max(...values) / 20);  //we didn't choose math.round ,because if the largest value is less than 20 the scale would be made 0 instead of 1

  //draw the main canvas
  ctx.fillStyle = "#82bae0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  //we will set gridHeight to 0 at first then add 30px each time
  gridHeight = 0;
  //we will start with the maximum value for grid numbering then subtract the vertical scale each time
  var invertedScale = verticalScale * 20;
  //set color of the grid lines
  ctx.strokeStyle = "#a5a5a5";
  for (i = 0; i <= 20; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 100 + gridHeight);
    ctx.lineTo(canvas.width, 100 + gridHeight);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.font = "16px Arial";
    ctx.fillText(invertedScale, 0, 100 + gridHeight)
    gridHeight = gridHeight + 30;
    invertedScale = invertedScale - verticalScale;
  }
  var numberOfRequiredGrids;
  var startX = 0.05 * canvas.width;
  var startY;
  var endY = 700;

  for (i = 0; i < values.length; i++) {
    numberOfRequiredGrids = values[i] / verticalScale;
    startY = 700 - numberOfRequiredGrids * 30;
    ctx.fillStyle = "#fcff84";
    ctx.fillRect(startX, startY, barWidth, endY - startY);
    //draw names under each bar
    ctx.fillStyle = "#ffffff";
    ctx.font = "32px Arial";
    ctx.fillText(names[i], startX, 750, barWidth);
    startX = startX + barWidth + horizontalMargin;

  }
  //refresh title value and draw it
  title = document.getElementById("title").value;
  ctx.font = "46px Arial";
  ctx.textAlign = "center";
  ctx.fillText(title, canvas.width / 2, 60);
}
