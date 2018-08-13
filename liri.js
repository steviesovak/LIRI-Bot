var dataKeys = require("./keys.js");

var fs = require('fs'); 
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');


var writeToLog = function(data) {
  fs.appendFile("log.txt", '\r\n\r\n');

  fs.appendFile("log.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("log.txt has been updated!");
  });
}

//spotify
//function to find artist

var getArtistNames = function(artist) {
  return artist.name;
};

var getMeSpotify = function(songName) {

  //if no song is found, use song "Thriller" By Michael Jackson

  if (songName === undefined) {
    songName = 'Thriller';
  };

  // console.log(songName)

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }

    console.log(data.tracks.items);
    var songs = data.tracks.items;
    
    //empty array to hold song data
    var data = []; 

    for (var i = 0; i < songs.length; i++) {
      data.push({
        'artist(s)': songs[i].artists.map(getArtistNames),
        'song name: ': songs[i].name,
        'preview song: ': songs[i].preview_url,
        'album: ': songs[i].album.name,
      });
    }
    writeToLog(data);
  });
};


//tweets

var getTweets = function() {

  
  var client = new twitter({
  consumer_key: 'jvoKd1Z25wNcIVc271qxvq0jO',
  consumer_secret: 'D3T47iitJcKnOHEDE1RRUH19ITpfzZoBylLIUPdc9rp4JgWUlQ',
  access_token_key: '1028469933087309824-AuscBssBT38TbT0bAt9z5gj34fjLVG',
  access_token_secret: 'vptY8ihZVMNsB20itVn9AZd1QrSyGr4HrNHepcyO3gZu1',
    });

  // console.log(client);

  var params = { screen_name: 'steviesovak', count: 20 };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {


    if (!error) {
      
      //array to hold tweets
      var data = [];
      for (var i = 0; i < tweets.length; i++) {
        data.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      }
      console.log(data);
      writeToLog(data);
    }
  });
};


//movies
var getMeMovie = function(movieName) {

  if (movieName === undefined) {
    movieName = 'Mr.Nobody';
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = [];
      var jsonData = JSON.parse(body);

      data.push({
      'Title: ' : jsonData.Title,
      'Year: ' : jsonData.Year,
      'Rated: ' : jsonData.Rated,
      'IMDB Rating: ' : jsonData.imdbRating,
      'Country: ' : jsonData.Country,
      'Language: ' : jsonData.Language,
      'Plot: ' : jsonData.Plot,
      'Actors: ' : jsonData.Actors,
      'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
      'Rotton Tomatoes URL: ' : jsonData.tomatoURL,
  });
      console.log(data);
      writeToLog(data);
}
  });

}


//Do what it says function

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    writeToLog(data);
    var dataArr = data.split(',')

    if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      pick(dataArr[0]);
    }

  });
}


//switch statement 

var pick = function(caseData, functionData) {

  switch (caseData) {

    case 'my-tweets':
      getTweets();
      break;

    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;

    case 'movie-this':
      getMeMovie(functionData);
      break;

    case 'do-what-it-says':
      doWhatItSays();
      break;

    default:
      console.log('error!');
  }
}

var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);