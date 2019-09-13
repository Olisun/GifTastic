// Array for button topics when the page loads.
var topics = ['Avengers', 'Thanos', 'Fantastic Four', 'Captain America', 'Black Panther', 'Dr. Strange'];
// Declaring global variables
var newTopicButton = $('#new-topic-submitted');
var avengerButtons = $('#avenger-buttons');
var gifs = $('#forGifsOne');

// This assigns the apiCall function below to all buttons with a class of 'avenger-button'.
$(document).on('click', '.avenger-button', apiCall);

// This is the function that creates the buttons from the array above. It loop through each item in the array and applies the following below.
function createButton() {
  // The empty() prevents the buttons already on the page from being created again when the user enters a button topic.
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

// This will create a new button when the user enters a new topic in the form input field and clicks the Add Avenger Topic button.
newTopicButton.on('click', function(event) {
  // prevent default is needed otherise the form's default action upon submit would the clear the gifs on the page.
  event.preventDefault();
  // This assigns the value from the input field on the DOMN to a variable. The trim() gets rid of any spaces after the text the user typed in case they did unknowingly.
  var newAvengerTopic = $('#new-avenger-topic').val().trim();
  // These last two things will push the value of the text from the client back into the array above and the the createButton function will turn that into a new button.
  topics.push(newAvengerTopic);
  createButton();
})

// This function calls the gify API and will query their data base for the gifs' data asking it to send it to me. The data comes over as objects.
function apiCall() {
  var marvel = $(this).attr('data-marvel');
  // This is the query parameters. The https address plus the data plus my API key and the final is the limit of gifs to send over (10)
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
      // First you have to empty any gifs loaded previously from the DOM.
      gifs.empty();
      // This for loop will loop over the current items in the array and add all the attributes and classes below to the new images.
      for (var i = 0; i < results.length; i++) {
        // The reason we are creating 2 different gif divs is to keep the numbert of gifs loaded per subject click to 10
        var forGifsTwo = $('<div class="gify">');
        var forGifsTwo = $('<div>');
        forGifsTwo.attr('class', 'gify');
        var marvelImage = $('<img>');
        // adding ratings and titles data from the API through targeting their key value pair.
        var rating = $('<p>').text('Rating: ' + results[i].rating);
        var title = $('<p>').text('Title: ' + results[i].title);
        // These are the attributes and classes needed in order to target the gif images for the start and stop function.
        marvelImage.attr('src', results[i].images.fixed_height_still.url); // <-- results[i].images....is how you specify what to get from the API.
        marvelImage.attr('data-animate', results[i].images.fixed_height.url);
        marvelImage.attr('data-still', results[i].images.fixed_height_still.url);
        marvelImage.attr('data-state', 'still');
        marvelImage.addClass('gif')
          // This appends the images to the DOM along with their ratings and titles. The ratings and titles were captured by setting the results[i]. to their object key value pair. Just like getting the gifs.
        forGifsTwo.append(marvelImage);
        forGifsTwo.append(rating);
        forGifsTwo.append(title);
        gifs.prepend(forGifsTwo);
      }
    });

};
// Finally the start stop function to pause the gifs. By setting their data-attributes above, you can do an if-else bascially saying if (this) meaning the image clicked on, is animated, chage its state to still and vice versa.
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