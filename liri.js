require("dotenv").config();
var keys = require("./keys.js");

var command = process.argv[2];

switch (command) {
  case "my-tweets":
    callAjax(command);
    break;
  case "spotify-this-song":
    callAjax(command);
    break;
  case "movie-this":
    callAjax(command);
    break;
  case "do-what-it-says":
    callAjax(command);
    break;

  default:
    break;
}

function callAjax(command) {}
