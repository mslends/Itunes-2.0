var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here



    this.getSongData = function(artist) {
      var deferred = $q.defer();

      $http({
        method: 'JSONP',
        url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
      }).then(function(response) {
        console.log(response);


      var artistData = [];
      for(var i = 0; i < response.data.results.length; i++) {
        artistData.push({
          AlbumArt: response.data.results[i].artworkUrl100,
          Artist: response.data.results[i].artistName,
          Collection: response.data.results[i].collectionCensoredName,
          CollectionPrice: response.data.results[i].trackPrice,
          Play: response.data.results[i].previewUrl,
          Type: response.data.results[i].kind
        })
      }
      console.log(artistData);
      deferred.resolve(artistData);
    })
      return deferred.promise;
 }
});
