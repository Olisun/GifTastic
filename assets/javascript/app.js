var topics = ['Avengers', 'Eternals', 'Marvel Phase Four', 'Captain America', 'Black Panther'];

var newTopicButton = $('#new-topic-submitted');
var avengerButtons = $('#avenger-buttons');
var gifs = $('#for-gifs');

function createButton() {

  avengerButtons.empty();

  for (var i = 0; i < topics.length; i++) {
    var newAvengerButton = $("<button>");
    newAvengerButton.addClass('avenger-button');
    newAvengerButton.attr("data-marvel", topics[i]);
    newAvengerButton.text(topics[i]);
    avengerButtons.append(newAvengerButton);
  }
}
createButton();


$(document).on('click', '.avenger-button', apiCall);

function apiCall() {
  var marvel = $(this).attr('data-marvel');
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
    marvel + '&api_key=xmYKYe1T4Bdfwx4bKef115frvMnBfph3&limit=10';

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      console.log(queryURL);
      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var marvelDiv = $('<div>');
        var p = $('<p>').text('Rating: ' + results[i].rating);
        var marvelImage = $('<img>');

        marvelImage.attr('src', results[i].images.fixed_height.url);
        marvelDiv.append(marvelImage);
        marvelDiv.append(p);

        gifs.prepend(marvelDiv);
      }
    });
};

newTopicButton.on('click', function(event) {
  event.preventDefault();
  var newAvengerTopic = $('#new-avenger-topic').val().trim();
  topics.push(newAvengerTopic);
  createButton();
  apiCall();
})