// function refresh()
// {
//     var req = new XMLHttpRequest();
//     console.log("Grabbing Value");
//     req.onreadystatechange=function() {
//       if (req.readyState==4 && req.status==200) {
//         document.getElementById('trulyCodesFavouriteNumber').innerText = req.responseText;
//       }
//     }
//     req.open("GET", 'reload.txt', true);
//     req.send(null);
// }
function init()
{
  // refresh()
  // var int=self.setInterval(function(){refresh()},1000);
  document.getElementById("0").addEventListener("click", calcKeyPressed)
  document.getElementById("1").addEventListener("click", calcKeyPressed)
  document.getElementById("2").addEventListener("click", calcKeyPressed)
  document.getElementById("3").addEventListener("click", calcKeyPressed)
  document.getElementById("4").addEventListener("click", calcKeyPressed)
  document.getElementById("5").addEventListener("click", calcKeyPressed)
  document.getElementById("6").addEventListener("click", calcKeyPressed)
  document.getElementById("7").addEventListener("click", calcKeyPressed)
  document.getElementById("8").addEventListener("click", calcKeyPressed)
  document.getElementById("9").addEventListener("click", calcKeyPressed)
  document.getElementById("0").addEventListener("click", calcKeyPressed)
  document.getElementById("c").addEventListener("click", calcKeyPressed)
  document.getElementById("divide").addEventListener("click", calcKeyPressed)
  document.getElementById("subtract").addEventListener("click", calcKeyPressed)
  document.getElementById("multiply").addEventListener("click", calcKeyPressed)
  document.getElementById("add").addEventListener("click", calcKeyPressed)
  document.getElementById("dot").addEventListener("click", calcKeyPressed)
  document.getElementById("enter").addEventListener("click", calcKeyPressed)
}

/*
  callback function for all the keys on the calculator
*/
function calcKeyPressed() {
  document.getElementById("workingBox").style.borderColor = "black";
  if (this.id == "c") {
    document.getElementById("workingBox").value = "";
  } else if (this.id == "enter") {
    calculate(document.getElementById("workingBox").value);
  } else {
    existingText = document.getElementById("workingBox").value
    document.getElementById("workingBox").value = existingText + this.innerText;
  }
}

/*
  Takes in the string in the input box and pops out a result, as long as they
  contain a number and are a valid javascript expression
*/
function calculate(functionString) {
  var matches = functionString.match(/\d+/g);
  if (matches != null) {
    try {
      answer = eval(functionString)
      document.getElementById("workingBox").value = answer;
      updateGlobalState(answer);
      // document.getElementById("resultsBox").innerHTML += "<p>" + answer + "<\p>";
      console.log(answer);
    } catch(e) {
      console.log(e);
      document.getElementById("workingBox").style.borderColor = "red";
    }
  } else {
    console.log("Please enter a valid mathematical expression");
    document.getElementById("workingBox").style.borderColor = "red";
  }
}

/*
  Gets in contact with the server to update the global state of the results.
  Once updated, retrieves the state, and updates the page accordingly.
*/
function updateGlobalState(answerString) {
  var req = new XMLHttpRequest();
  req.open("POST", "https://72eoaoqwvb.execute-api.us-east-2.amazonaws.com/a/");
  req.setRequestHeader("Content-type", "application/json");
  req.onreadystatechange=function() {
    if (req.readyState==4 && req.status==200) {
      console.log(req.responseText)
      // document.getElementById('trulyCodesFavouriteNumber').innerText = req.responseText;
    }
  }
  req.send();
}
