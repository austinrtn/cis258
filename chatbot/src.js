/*‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 ---------------------- Initializing  ------------------
 _______________________________________________________*/

 /*These are the responses from the bot when it does not recognize the input*/
 var nullResponses = ["Sorry, I don't know how to respond to that.",
                     "I'm not sure I understand",
                     "Can you try asking me in a differnt way?"];

 printInputs();
 
 /********************
 ****HTML Connection***
 *******************/

/* In order to get input from the user and display output,
we need to get the contents of the HTML elements */

const output = document.getElementById("output");
const input = document.getElementById("input");
const breakline = "\n";

/*This function returns the text from the input and
converts all letters to lowercase so that there is no
case sensitivity, as well as deletes any punctation*/
var getInput = function(){
  var punctation = [".",",","?","'","!"];

  var string = input.value.toLowerCase(); //Converts string to lowercase

  for(var i = 0; i < punctation.length; i++)
    string = string.replace(punctation[i], ""); //Removes all punctation in punctation array

  return string;
}


/*‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 ---------------------- Main Functionality  -----------------
 _______________________________________________________*/

function searchJson(){
  /*If the input field is empty, it will return this message*/
  if(getInput() === "") return "The input field is blank";

  for(var i = 0; i < data.length; i++){
    for (var x = 0; x < data[i].input.length; x++) {
      // This searches through the JSON file to see if there's a match
      if(data[i].input[x] === getInput()){
        // If there's a match, the output from the JSON object is returned
        return data[i].output[Math.floor(Math.random()*data[i].output.length)];
      }
    }
  }
  // If there is no match, a random response from the "nullResponses" array is retured
  return nullResponses[Math.floor(Math.random() * nullResponses.length)]
}

function logChat(text, isUser){
 /*This function outputs text to the chat and formats the in a "chat like" way*/
 var name = "Chat Bot: ";
 var extraBreakline = "\n"; //If the bot is outputing, there will be extra space in the log
 // If the isUser variabe = true, then the name variable will be changed to User
 if(isUser){
  name = "    User: ";
  extraBreakline = "";
  }
 output.append(name + text + breakline + extraBreakline);
}

function outputResponse(){
  // Push user input to chatlog
  logChat(input.value, true);
  // Push bot response to chatlog
  logChat(searchJson(), false);
  // Delete text in input field
  input.value = "";
}

function printInputs(){
  for(var i = 0; i < data.length; i++){
    for(var x = 0; x < data[i].input.length;x++)
      document.getElementById("list").innerHTML += ("<li>"+data[i].input[x]+"</li>")
  }
}

/*‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 ---------------------- Key Listener  ----------------------
 _______________________________________________________*/

/*This code runs the outputResponse() function when the user presses enter in the input field*/
 document.querySelector(input.id).addEventListener('keypress', function (e) {
     if (e.key === 'Enter') {
       outputResponse();
     }
 });