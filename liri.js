var Twitter = require("twitter");
var keys = require("./keys")
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


function tweets() {
    var client = new Twitter({
        consumer_key: keys.consumer_key,
        consumer_secret: keys.consumer_secret,
        access_token_key: keys.access_token_key,
        access_token_secret: keys.access_token_secret


    });

    var params = {
        screen_name: 'woahHomeWork',
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        }
    });
}

if (process.argv[2] === "my-tweets") {
    tweets();
}


 

    var x = process.argv[3]

function spot(x) {

    var spotify = new Spotify({
        id: "c54a8c4fffcf4be7b89718ca3aa1981b",
        secret: "e316ac85c07e4f458750b87e6148577f"
    });
   
    if (typeof(x) !== "string") {
        x = "The Sign";
    }

    spotify.search({
        type: 'track',
        query: x
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Track: " + data.tracks.items[0].name);
        console.log("Listen: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);

    });

}

if (process.argv[2] === "spotify-this-song") {
    spot();
}



var y = process.argv[3]
function movie(y) {
    var omdbURL = 'http://www.omdbapi.com/t=' + y + '&y=&plot=short&tomatoes=true&apikey=72d30bd0';
   
    request(omdbURL, function(error, response, body) {
        
        if (typeof(y) !== 'string') {
            y = 'Mr. Nobody'
        }
        
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);

            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
        }
    });
}

if (process.argv[2] === 'movie-this') {
    movie();
}




function doWhat(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spot(txt[1]);
  });
}


if(process.argv[2] === 'do-what-it-says'){
	doWhat();
}





