# This file is for planning the app build and pseudo coding.

## Things Needed:
  1. Array of topics stored as a variable.
  
  2. Way to take topics and turn them into buttons to be pushed to the DOM.
     1. For Loop to iterate over the array of topics.
        1. Create a button for each topic and push that button to the DOM.

  3. On the DOM, user clicks the button and 10 GIF's appear 
     1. GIF's need to be static
        1. User clicks to turn on and off the GIFs.
     2. Each GIF has to display info like rating, other info...

  4. Dynamically generate a form where the user's enters values and those values are pushed into the topic array to create new buttons.


## Topics to review:
  1. GIPHY API Docs
  2. Method to create buttons from the array
  3. data attributes for the buttons
  4. create a form and push to DOM.
     1. capture value from the form and push those values back into array

## Remaining Bugs:
  1. Can't pause gifs. Problem is how to target the src of the static gif s the animated gif.
  2. The gifs return limit is only working for the first button clicked.
