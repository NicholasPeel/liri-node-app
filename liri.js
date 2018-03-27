require("dotenv").config();
var request = require("request");
var Twitter = require("twitter");
var spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var fs = require("fs");
var keys = require("./keys.js");

console.log("Hello. My name is Liri. How may I help you?");

liri();

function liri() {
  inquirer
    .prompt([
      {
        type: "input",
        message: " ",
        name: "command",
      },
    ])
    .then(data => {
      switch (data.command) {
        case "my-tweets":
          getTweets();
          liri();
          break;
        case "spotify-this-song":
          inquirer
            .prompt([
              {
                type: "input",
                message: "Please type the name of a song",
                name: "song",
              },
            ])
            .then(data => {
              if (data.song === "") {
                var song = "the sign ace of base";
                getSpotify(song);
                liri();
              } else {
                getSpotify(data.song);
                liri();
              }
            });
          break;
        case "movie-this":
          inquirer
            .prompt([
              {
                type: "input",
                message: "Please type the name of a movie",
                name: "movie",
              },
            ])
            .then(data => {
              if (data.movie === "") {
                var movie = "mr. nobody";
                getMovie(movie);
                liri();
              } else {
                getMovie(data.movie);
                liri();
              }
            });
          break;
        case "do-what-it-says":
          getWhatItSays();
          liri();
          break;

        default:
          console.log("Not a valid command. Please try again.");
          liri();
          break;
      }
    });

  function getTweets() {
    var client = new Twitter(keys.twitter);
    var params = { screen_name: "nickpeel8597" };
    client.get("statuses/home_timeline", params, function(
      error,
      tweets,
      response
    ) {
      for (let i = 0; i < tweets.length; i++) {
        var name = tweets[i].user.screen_name;
        var text = tweets[i].text;
        var created = tweets[i].created_at;

        console.log("      ");
        console.log(name);
        console.log(text);
        console.log(created);
        console.log(
          "___________________________________________________________________________________"
        );
        console.log("         ");
      }
    });
  }
  function getSpotify(song) {
    var client = new spotify(keys.spotify);
    client.search({ type: "track", query: song }, function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      for (let i = 0; i < data.tracks.items.length; i++) {
        console.log("         ");
        console.log("Artist: " + data.tracks.items[i].artists[0].name);
        console.log("Song name: " + data.tracks.items[i].name);
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log("Spotify URL: " + data.tracks.items[i].preview_url);
        console.log(
          "___________________________________________________________________________"
        );
        console.log("         ");
      }
    });
  }

  function getMovie(data) {
    var url = "http://www.omdbapi.com/?apikey=trilogy&t=" + data;

    request(url, { json: true }, function(error, response, body) {
      if (error) {
        console.log(error);
      }
      console.log("      ");
      console.log("Title: " + body.Title);
      console.log("Year: " + body.Year);
      console.log("IMDB Rating: " + body.imdbRating);
      console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log(
        "___________________________________________________________________________"
      );
      console.log("      ");
    });
  }

  function getWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      var array = data.split(",");
      switch (array[0]) {
        case "my-tweets":
          getTweets();
          break;
        case "spotify-this-song":
          getSpotify(array[1]);
          break;
        case "movie-this":
          getMovie(array[1]);
          break;
        default:
          console.log("Something went wrong. Please try again");
          liri();
          break;
      }
    });
  }
}
