"Use Strict";

$(document).ready(function() {
  var userObj = {};
  var nextStepBtn1 = $("#nextStep1");
  var backStepBtn1 = $("#backStep1");
  var inputUserName = $("#userName");
  var inputUserAge = $("#userAge");
  var selectUserCountry = $("#countrySelect");
  var selectRusCity = $("#rusCitySelect");
  var selectGerCity = $("#gerCitySelect");
  var selectUSACity = $("#usaCitySelect");
  var formStepOne = $("#formStepOne");
  // validate forms

  var validator = formStepOne.validate({
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
      },
      country: "required"
    },
    messages: {
      name: {
        required: "Please, enter your name",
        pattern:
          "Your parents with humor, if you have numbers in your name O_o",
        minlength: jQuery.validator.format(
          "Oh My God! Are your name really has one letter!? Please, enter min {0} letter"
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

  // validate name without numbers
  $.validator.addMethod(
    "pattern",
    function(value, element, regexp) {
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    },
    "Please check your input."
  );

  inputUserName.rules("add", { pattern: "[a-zA-Z]" });

  // function reset Form

  function resetForm($form) {
    $form.find("input, select").val("");
  }

  // first page

  $("#startBtn").on("click", function() {
    $("#welcome").fadeOut(0);
    $("#stepOne").fadeIn(1000);

    // get cookies
    if (!$.isEmptyObject(Cookies.get())) {
      nextStepBtn1.prop("disabled", false);

      inputUserName.val(Cookies.get("name"));
      inputUserAge.val(Cookies.get("age"));
      selectUserCountry.val(Cookies.get("country"));

      var userCountry = Cookies.get("country");
      var userCity = Cookies.get("city");

      switch (userCountry) {
        case "rus": {
          selectRusCity.fadeIn().val(userCity);
          break;
        }
        case "ger": {
          selectGerCity.fadeIn().val(userCity);
          break;
        }
        case "usa": {
          selectUSACity.fadeIn().val(userCity);
          break;
        }
        default:
          return;
      }
    }
  });

  // step 1

  // input name

  inputUserName.on("focusout", function() {
    let inputValue = $(this).val();
    setTimeout(function() {
      if (!validator.invalid.name) {
        userObj.name = inputValue;
      }
      if (validator.invalid.name || validator.invalid.age) {
        // disabled button next if hasn't validate
        nextStepBtn1.prop("disabled", true);
        return;
      }
      // enabled button next if had input select 'city'
      if (userObj.hasOwnProperty("city")) {
        nextStepBtn1.prop("disabled", false);
      }
    }, 0);
  });

  // input age

  inputUserAge.on("focusout", function() {
    let inputAgeValue = $(this).val();

    setTimeout(function() {
      if (!validator.invalid.age) {
        userObj.age = inputAgeValue;
      }
      if (validator.invalid.age || validator.invalid.name) {
        // disabled button next if hasn't validate
        nextStepBtn1.prop("disabled", true);
        return;
      }
      // enabled button next if had input select 'city'
      if (userObj.hasOwnProperty("city")) {
        nextStepBtn1.prop("disabled", false);
      }
    }, 0);
  });

  // button back
  backStepBtn1.on("click", function() {
    $("#stepOne").fadeOut(0);
    $("#welcome").fadeIn(1000);
    selectGerCity.fadeOut(0);
    selectUSACity.fadeOut(0);
    selectRusCity.fadeOut(0);
    nextStepBtn1.prop("disabled", true);
    validator.resetForm();
    resetForm(formStepOne);
    formStepOne.find("input").removeClass("error");
  });

  // enable select of City

  selectUserCountry.on("change", function(e) {
    switch ($(this).val()) {
      case "rus": {
        selectGerCity.fadeOut(0);
        selectUSACity.fadeOut(0);
        selectRusCity.fadeIn();
        break;
      }
      case "ger": {
        selectRusCity.fadeOut(0);
        selectUSACity.fadeOut(0);
        selectGerCity.fadeIn();
        break;
      }
      case "usa": {
        selectGerCity.fadeOut(0);
        selectRusCity.fadeOut(0);
        selectUSACity.fadeIn();
        break;
      }
      default:
        selectGerCity.fadeOut(0);
        selectRusCity.fadeOut(0);
        selectUSACity.fadeOut(0);
        nextStepBtn1.prop("disabled", true);
    }
  });

  // button next enabled

  var citySelect = formStepOne.find("select[name='city']");
  for (let index = 0; index < citySelect.length; index++) {
    $(citySelect[index]).on("change", function() {
      userObj.city = $(this).val();
      setTimeout(function() {
        if (!validator.invalid.age && !validator.invalid.name) {
          nextStepBtn1.prop("disabled", false);
        }
        if (userObj.city === "default") {
          nextStepBtn1.prop("disabled", true);
        }
      }, 0);
    });
  }

  // form data variables

  formStepOne.on("submit", function(e) {
    e.preventDefault();
    var name = $(this.name).val();
    var age = $(this.age).val();
    var country = $(this.country).val();

    switch (country) {
      case "rus": {
        var city = selectRusCity.val();
        break;
      }
      case "ger": {
        var city = selectGerCity.val();
        break;
      }
      case "usa": {
        var city = selectUSACity.val();
        break;
      }
      default:
        return;
    }

    Cookies.set("name", name, { expires: 7 });
    Cookies.set("age", age, { expires: 7 });
    Cookies.set("country", country, { expires: 7 });
    Cookies.set("city", city, { expires: 7 });
  });

  console.log(userObj);
});
