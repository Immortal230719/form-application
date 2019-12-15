"Use Strict";

$(document).ready(function() {
  // validate forms

  var validator = $("#formStepOne").validate({
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
    },
    focusCleanup: true
  });

  // function reset Form

  function resetForm($form) {
    $form.find("input, select").val("");
  }

  // first page

  $("#startBtn").on("click", function() {
    $("#welcome").fadeOut(0);
    $("#stepOne").fadeIn(1000);
  });

  // step 1

  // button back
  $("#backStep1").on("click", function() {
    $("#stepOne").fadeOut(0);
    $("#welcome").fadeIn(1000);
    $("#gerCitySelect").fadeOut(0);
    $("#usaCitySelect").fadeOut(0);
    $("#rusCitySelect").fadeOut(0);
    $("#nextStep1").prop("disabled", true);
    validator.resetForm();
    resetForm($("#formStepOne"));
    $("#formStepOne input").removeClass("error");
  });

  $("#countrySelect").on("change", function(e) {
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
  });

  // button next enabled

  var citySelect = $("#formStepOne select[name='city']");

  for (let index = 0; index < citySelect.length; index++) {
    $(citySelect[index]).on("change", function() {
      if ($("#userName").val().length >= 2 && $("#userAge").val() <= 120) {
        $("#nextStep1").prop("disabled", false);
      }
    });
  }

  // form data variables

  $("#formStepOne").on("submit", function(e) {
    e.preventDefault();
    var name = $(this.name).val();
    var age = $(this.age).val();
    var country = $(this.country).val();
    var city = $(this.city).val();
    console.log(name, age, country, city);
  });
});
