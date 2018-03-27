// original array for gifs
var gifs = [];
// function to create buttons from 
function renderButtons() {

    $("#buttons-display").empty();
        
    for (var i = 0; i < gifs.length; i++) {
        const element = gifs[i];
        
        var button = $("<button>");
        
        button.attr("data-gif", element);
        
        button.text(element);
        
        $("#buttons-display").append(button);
    }
};

// adds input from search bar into array of gifs
$("body").on("click", "#add-gif", function(event) {
    event.preventDefault();
    
    var addedGif = $("#gif-searchbar").val()

    gifs.push(addedGif);

    renderButtons();

    $("#gif-searchbar").val("");
});

// once button is clicked this brings up gifs along with set attributes
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
            gifImage.addClass("gif");
            gifImage.attr("still", results[i].images.fixed_height_still.url);
            gifImage.attr("animated", results[i].images.fixed_height.url);
            gifImage.attr("state", "animated");
            $("#gif-display").prepend(p);
            $("#gif-display").prepend(gifImage);
        }
      });
});
//pauses gifs
$("body").on("click", ".gif", function(){
    
    var state = $(this).attr("state");
    // console.log(state);
    if(state === "animated"){
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("state", "still");
    }
    if(state === "still"){
        $(this).attr("src", $(this).attr("animated"));
        $(this).attr("state", "animated");
    };
});



