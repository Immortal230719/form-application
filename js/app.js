"Use Strict";

$(document).ready(function() {
  // step 1

  $("#startBtn").on("click", function() {
    $("#welcome").fadeOut(0);
    $("#stepOne").fadeIn(1000);
  });

  $("#formStepOne select").on("change", function(e) {
    switch ($(this).val()) {
      case "rus": {
        $("#gerCitySelect").fadeOut(0);
        $("#usaCitySelect").fadeOut(0);
        $("#rusCitySelect").fadeIn();
        break;
      }
      case "ger": {
        $("#rusCitySelect").fadeOut(0);
        $("#usaCitySelect").fadeOut(0);
        $("#gerCitySelect").fadeIn();
        break;
      }
      case "usa": {
        $("#gerCitySelect").fadeOut(0);
        $("#rusCitySelect").fadeOut(0);
        $("#usaCitySelect").fadeIn();
        break;
      }
      default:
        return;
    }
    console.log($(this).val());
  });

  // validate forms

  $("#formStepOne").validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      age: {
        required: true,
        number: true,
        min: 14,
        max: 120
      }
    },
    messages: {
      name: {
        required: "Please, enter your name",
        minlength: jQuery.validator.format(
          "Oh My God! Are your name really has one charachter!? Please, enter min {0} charachters"
        )
      },
      age: {
        required: "Please, Enter Your Age",
        min: "You too young for this service",
        max: "Unfortunally, you must be under the Gravestone with that age O_o"
      }
    }
  });
});
