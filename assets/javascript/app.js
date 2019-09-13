// Array for button topics when the page loads.
var topics = ['Avengers', 'Thanos', 'Marvel Phase Four', 'Captain America', 'Black Panther', 'Dr. Strange'];

// Declaring global variables
var newTopicButton = $('#new-topic-submitted');
var avengerButtons = $('#avenger-buttons');
var gifs = $('#forGifsOne');

// This assigns the apiCall function below to all buttons with a class of 'avenger-button'.
$(document).on('click', '.avenger-button', apiCall);

// This is the function that creates the buttons from the array above. It loop through each item in the array and applies the following below.
function createButton() {
  // The empty() prevents the buttons already on the page fro being created again when the user enters a button topic.
  avengerButtons.empty();
  for (var i = 0; i < topics.length; i++) {
    // Creates a new button element
    var newAvengerButton = $('<button>');
    // Adds a class of 'avenger-button'
    newAvengerButton.addClass('avenger-button');
    // Adds an attriute that ties it to the API call data below.
    newAvengerButton.attr('data-marvel', topics[i]);
    // This puts the topic title in the button
    newAvengerButton.text(topics[i]);
    // This appends the buttons to the DOM
    avengerButtons.append(newAvengerButton);
  };
};
// Now we call the createButton function.
createButton();

newTopicButton.on('click', function(event) {
  event.preventDefault();
  var newAvengerTopic = $('#new-avenger-topic').val().trim();
  topics.push(newAvengerTopic);
  createButton();

})

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

      // Creating a div to hold the movie


      gifs.empty();

      for (var i = 0; i < results.length; i++) {
        var forGifsTwo = $('<div class="gify">');
        var forGifsTwo = $('<div>');

        forGifsTwo.attr('class', 'gify');

        var marvelImage = $('<img>');

        var rating = $('<p>').text('Rating: ' + results[i].rating);
        var title = $('<p>').text('Title: ' + results[i].title);

        marvelImage.attr('src', results[i].images.fixed_height.url);
        marvelImage.attr('data-animate', results[i].images.fixed_height.url);
        marvelImage.attr('data-still', results[i].images.fixed_height_still.url);
        marvelImage.attr('data-state', 'still');
        marvelImage.addClass('gif')

        forGifsTwo.append(marvelImage);
        forGifsTwo.append(rating);
        forGifsTwo.append(title);
        gifs.prepend(forGifsTwo);
      }
    });

};

$(document).on('click', '.gif', function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    var animate = $(this).attr("data-animate");
    $(this).attr("src", animate);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});