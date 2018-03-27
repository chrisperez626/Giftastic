var gifs = [];

function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-display").empty();
        // Loops through the array of movies
    for (var i = 0; i < gifs.length; i++) {
        const element = gifs[i];
        

        var button = $("<button>");

        // Adds a class of movie to our button
        button.addClass("gif");
        // Added a data-attribute
        button.attr("data-gif", element);
        // Provided the initial button text
        button.text(element);
        // Added the button to the buttons-view div
        $("#buttons-display").append(button);
    }
};

renderButtons();

$("body").on("click", "#add-gif", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var addedGif = $("#gif-searchbar").val()
    // The movie from the textbox is then added to our array
    gifs.push(addedGif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

    // $("#gif-searchbar").val("");
});


$("body").on("click","button", function() {
    var newGif = $(this).attr("data-gif");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      newGif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height.url);

            $("#gif-display").prepend(p);
            $("#gif-display").prepend(gifImage);
        console.log(results);
        }
      });
});
$("body").on("click", "img", function(){
    
});


