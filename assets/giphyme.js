$(document).ready(function() {
  var animes = ["Dragonball Z", "Naruto", "Fairy Tail", "Sword Art Online"];

  function generateButtons(arrayTopics, classToAdd, areaToDisplay) {
    $(areaToDisplay).empty();

    for (var i = 0; i < arrayTopics.length; i++) {
      var topicButton = $("<button>");
      topicButton.addClass(classToAdd);
      topicButton.attr("data-type", arrayTopics[i]);
      topicButton.text(arrayTopics[i]);
      $(areaToDisplay).append(topicButton);
    }
  }

  $(document).on("click", ".anime-button", function() {
    $("#animes").empty();
    $(".anime-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryUrl =
      "http://api.giphy.com/v1/gifs/search?q=" +
      type +
      "&api_key=HRSzzkmS6i0qfmut3OkeXGsNChtMsZfJ";

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).done(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var animeDiv = $('<div class="anime-item">');

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var animeImage = $("<img>");
        animeImage.attr("src", still);
        animeImage.attr("data-still", still);
        animeImage.attr("data-animate", animated);
        animeImage.attr("data-state", "still");
        animeImage.addClass("anime-image");

        animeDiv.append(p);
        animeDiv.append(animeImage);

        $("#animes").append(animeDiv);
      }
    });
  });

  $(document).on("click", ".anime-image", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-anime").on("click", function(event) {
    event.preventDefault();
    var newAnime = $("input")
      .eq(0)
      .val();

    if (newAnime.length > 2) {
      animes.push(newAnime);
    }

    generateButtons(animes, "anime-button", "#anime-buttons");
  });

  generateButtons(animes, "anime-button", "#anime-buttons");
});
