"Use Strict";

$(document).ready(function() {
  // banks in city

  var moscowArr = [
    "sberbank",
    "VTB",
    "mtsbank",
    "akibank",
    "avangard",
    "TheIronBankofBraavos"
  ];
  var spbArr = ["sberbank", "alfabank", "SPBBank", "TheIronBankofBraavos"];
  var kazanArr = ["AKBarsBank", "TATNEFT", "VTB", "TheIronBankofBraavos"];
  var berlinArr = ["DeutscheBank", "DZBank", "TheIronBankofBraavos"];
  var dusseldorfArr = ["CommerzBank", "TheIronBankofBraavos"];
  var nYorkArr = [
    "BankOfAMERICA",
    "CitiBank",
    "CNBBank",
    "NYBank",
    "TheIronBankofBraavos"
  ];
  var losAngelesArr = [];

  // banks in salary

  var salaryArr = [
    [
      "sberbank",
      "VTB",
      "mtsbank",
      "alfabank",
      "AKBarsBank",
      "BankOfAMERICA",
      "CitiBank",
      "CNBBank",
      "DeutscheBank",
      "DZBank",
      "CommerzBank"
    ],
    [
      "sberbank",
      "VTB",
      "mtsbank",
      "alfabank",
      "AKBarsBank",
      "TATNEFT",
      "VTB",
      "BankOfAMERICA",
      "CitiBank",
      "CNBBank",
      "DeutscheBank",
      "DZBank",
      "CommerzBank"
    ],
    [
      "sberbank",
      "VTB",
      "mtsbank",
      "akibank",
      "alfabank",
      "AKBarsBank",
      "TATNEFT",
      "VTB",
      "BankOfAMERICA",
      "NYBank",
      "DeutscheBank",
      "DZBank",
      "CommerzBank"
    ],
    [
      "sberbank",
      "VTB",
      "avangard",
      "SPBBank",
      "AKBarsBank",
      "TATNEFT",
      "VTB",
      "BankOfAMERICA",
      "NYBank",
      "DeutscheBank",
      "DZBank",
      "CommerzBank",
      "TheIronBankofBraavos"
    ]
  ];

  // variables
  var salaryRusArray = ["less 10000", "10000-25000", "25000-50000", "50000+"];
  var salaryUSAArray = ["less 100", "100-500", "500-1500", "1500+"];
  var userObj = {};
  if (!$.isEmptyObject(Cookies.get())) {
    userObj = {
      name: Cookies.get("name"),
      age: Cookies.get("age"),
      country: Cookies.get("country"),
      city: Cookies.get("city"),
      salary: Cookies.get("salary"),
      bank: Cookies.get("bank")
    };
  }
  var json;
  var stepOne = $("#stepOne");
  var stepTwo = $("#stepTwo");
  var nextStepBtn1 = $("#nextStep1");
  var backStepBtn1 = $("#backStep1");
  var inputUserName = $("#userName");
  var inputUserAge = $("#userAge");
  var selectUserCountry = $("#countrySelect");
  var selectRusCity = $("#rusCitySelect");
  var selectGerCity = $("#gerCitySelect");
  var selectUSACity = $("#usaCitySelect");
  var formStepOne = $("#formStepOne");
  var clearCookiesBtn = $("#clearCookies");

  // STEP TWO variables

  var stepTwoBtnBack = $("#backStep2");
  var stepTwoBtnNext = $("#nextStep2");
  var stepTwoFormLabels = $("#salary .salary-text");
  var salaryValue = userObj.salary;
  var salaryText = "";

  // STEP THREE variables

  var stepThreeWrapper = $("#stepThree");
  var stepThreeBtnBack = $("#backStep3");
  var stepThreeBtnNext = $("#nextStep3");
  var bankValue = "";

  // STEP FINISH variables

  var finishWrapper = $("#finish");

  // get & set cookies
  if (Cookies.get("bank")) {
    $("#welcome").fadeOut(0);
    var salaryCookie = Cookies.get("salary");
    var ageCheck = parseInt(userObj.age);
    renderBanks(userObj.city, ageCheck);
    setCookieBank(userObj.bank);
    stepThreeWrapper.fadeIn(1000);
    setCookieSalary(salaryCookie);
    renderStepTwo(userObj);
    salaryText = $("#salary input:checked")
      .parent()
      .text();
    renderFinish(userObj);
    stepTwoBtnNext.prop("disabled", false);
    stepThreeBtnNext.prop("disabled", false);
  } else if (Cookies.get("salary")) {
    $("#welcome").fadeOut(0);
    stepOne.fadeOut(100);

    var salaryCookie = Cookies.get("salary");
    setCookieSalary(salaryCookie);
    renderStepTwo(userObj);

    stepTwo.fadeIn(1000);
    stepTwoBtnNext.prop("disabled", false);
  } else if (!$.isEmptyObject(Cookies.get())) {
    $("#welcome").fadeOut(0);
    nextStepBtn1.prop("disabled", false);

    setCookieStepOne();

    // hide div "welcome"
    stepOne.fadeIn(1000);
  }

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

  inputUserName.rules("add", { pattern: "^[a-zA-Z]+$" });
  // first page

  $("#startBtn").on("click", function() {
    $("#welcome").fadeOut(0);
    stepOne.fadeIn(1000);
    if (userObj.hasOwnProperty("name")) {
      setCookieStepOne();
      nextStepBtn1.prop("disabled", false);
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
    stepOne.fadeOut(0);
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

  selectUserCountry.on("change", function() {
    switch ($(this).val()) {
      case "Russia": {
        selectGerCity.fadeOut(0);
        selectUSACity.fadeOut(0);
        selectRusCity.fadeIn();
        break;
      }
      case "Germany": {
        selectRusCity.fadeOut(0);
        selectUSACity.fadeOut(0);
        selectGerCity.fadeIn();
        break;
      }
      case "USA": {
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

  // button nextStepOne enabled

  var citySelect = formStepOne.find("select[name='city']");
  for (let index = 0; index < citySelect.length; index++) {
    $(citySelect[index]).on("change", function() {
      var checkName = $("#userName").val();
      var checkAge = $("#userAge").val();
      userObj.city = $(this).val();
      setTimeout(function() {
        if (!validator.invalid.age && !validator.invalid.name) {
          nextStepBtn1.prop("disabled", false);
        }
        if (userObj.city === "default" || checkName || checkAge) {
          nextStepBtn1.prop("disabled", true);
        }
      }, 0);
    });
  }

  formStepOne.on("submit", function(e) {
    e.preventDefault();
    var name = $(this.name).val();
    var age = $(this.age).val();
    var country = $(this.country).val();

    switch (country) {
      case "Russia": {
        var city = selectRusCity.val();
        break;
      }
      case "Germany": {
        var city = selectGerCity.val();
        break;
      }
      case "USA": {
        var city = selectUSACity.val();
        break;
      }
      default:
        return;
    }

    userObj.name = name;
    userObj.age = age;
    userObj.country = country;
    userObj.city = city;

    Cookies.set("name", name, { expires: 7 });
    Cookies.set("age", age, { expires: 7 });
    Cookies.set("country", country, { expires: 7 });
    Cookies.set("city", city, { expires: 7 });
    stepOne.fadeOut(0);
    stepTwo.fadeIn(1000);
    json = JSON.stringify(userObj);
    renderStepTwo(userObj);
  });

  // STEP TWO

  stepTwoBtnBack.on("click", function() {
    setCookieStepOne();
    nextStepBtn1.prop("disabled", false);
    stepTwo.fadeOut(0);
    stepOne.fadeIn(1000);

    stepTwoFormLabels.each(function(element) {
      $(element).text("");
    });
  });

  // salary form handler

  $("#salary").on("click", function(e) {
    salaryValue = $("#salary input:checked").val();
    salaryText = $("#salary input:checked")
      .parent()
      .text();
    if (salaryValue) {
      stepTwoBtnNext.prop("disabled", false);
    }
    return;
  });

  $("#salary").on("submit", function(e) {
    e.preventDefault();
    userObj.salary = salaryValue;
    Cookies.set("salary", salaryValue, { expires: 7 });
    json = JSON.stringify(userObj);
    stepTwo.fadeOut(0);
    stepThreeWrapper.fadeIn(1000);
    var ageFilter = parseInt(userObj.age);
    var cityFilter = userObj.city;
    if (userObj.country === "Russia" && ageFilter > 60) {
      $("#step3Message2").fadeIn(0);
      return;
    }
    renderBanks(cityFilter, ageFilter);
  });

  //STEP THREE

  // bank form handler

  $("#bank").on("click", function(e) {
    bankValue = $(this)
      .find("input:checked")
      .val();
    if (bankValue) {
      userObj.bank = bankValue;
      stepThreeBtnNext.prop("disabled", false);
    }
    return;
  });

  stepThreeBtnBack.on("click", function() {
    stepThreeBtnNext.prop("disabled", true);
    nextStepBtn1.prop("disabled", false);
    stepThreeWrapper.fadeOut(0);
    stepTwo.fadeIn(1000);
    $("#bank")
      .children("label")
      .fadeOut(0);
    $("#step3Message").fadeOut(0);
    $("#step3Message2").fadeOut(0);
    return;
  });

  $("#bank").on("submit", function(e) {
    e.preventDefault();
    Cookies.set("bank", bankValue, { expires: 7 });
    userObj.bank = bankValue;
    json = JSON.stringify(userObj);
    finishWrapper.fadeIn(500);
    renderFinish(userObj);
  });

  // STEP FINISH

  $("#backFinish").on("click", function() {
    finishWrapper.fadeOut(500);
  });

  $("#finishBtn").on("click", function() {
    clearCookies();
    location.reload();
  });

  finishWrapper.on("click", function(e) {
    if (e.target.id === "finish") {
      $(this).fadeOut();
    } else return;
  });

  // FUNCTIONS

  function resetForm($form) {
    $form.find("input, select").val("");
  }

  function renderStepTwo({ country: value }) {
    switch (value) {
      case "Russia": {
        stepTwoFormLabels.each(function(index, el) {
          var text = salaryRusArray[index];
          $(el).text(text + " rub");
        });
        break;
      }
      case "USA": {
        stepTwoFormLabels.each(function(index, el) {
          var text = salaryUSAArray[index];
          $(el).text(text + " $");
        });
        break;
      }
      case "Germany": {
        stepTwoFormLabels.each(function(index, el) {
          var text = salaryUSAArray[index];
          $(el).text(text + " €");
        });
        break;
      }
      default:
        break;
    }
  }

  //set cookies stepOne

  function setCookieStepOne() {
    inputUserName.val(Cookies.get("name"));
    inputUserAge.val(Cookies.get("age"));
    selectUserCountry.val(Cookies.get("country"));

    var userCountry = Cookies.get("country");
    var userCity = Cookies.get("city");

    switch (userCountry) {
      case "Russia": {
        selectRusCity.fadeIn().val(userCity);
        break;
      }
      case "Germany": {
        selectGerCity.fadeIn().val(userCity);
        break;
      }
      case "USA": {
        selectUSACity.fadeIn().val(userCity);
        break;
      }
      default:
        return;
    }
    return;
  }

  function setCookieSalary(salaryValueStr) {
    if (typeof salaryValueStr === "string") {
      $("#" + salaryValueStr + "Salary").prop("checked", true);
    } else return;
    return;
  }

  function setCookieBank(bankValueStr) {
    if (typeof bankValueStr === "string") {
      $("#" + bankValueStr).prop("checked", true);
    }
    return;
  }

  function clearCookies() {
    Cookies.remove("name");
    Cookies.remove("age");
    Cookies.remove("country");
    Cookies.remove("city");
    Cookies.remove("salary");
    Cookies.remove("bank");
    return;
  }

  function getBanksFromArrays(arrayOfCity, arrayOfSalary, salaryValue) {
    var indexOfSalary = parseInt(salaryValue);
    var resultArr = [];
    // filter our arrays to get resultArray of Banks
    for (let index = 0; index < arrayOfCity.length; index++) {
      var bankInCity = arrayOfCity[index];
      for (
        let index = 0;
        index < arrayOfSalary[indexOfSalary].length;
        index++
      ) {
        if (bankInCity === arrayOfSalary[indexOfSalary][index]) {
          resultArr.push(arrayOfSalary[indexOfSalary][index]);
        } else continue;
      }
    }
    // render result banks
    resultArr.forEach(e =>
      $(`#${e}`)
        .parents()
        .fadeIn()
    );
    return;
  }

  function renderBanks(bankValue, ageValue) {
    switch (bankValue) {
      case "Moscow": {
        getBanksFromArrays(moscowArr, salaryArr, salaryValue);
        break;
      }
      case "SaintPeterburg": {
        getBanksFromArrays(spbArr, salaryArr, salaryValue);
        break;
      }
      case "Kazan": {
        getBanksFromArrays(kazanArr, salaryArr, salaryValue);
        break;
      }
      case "Berlin": {
        getBanksFromArrays(berlinArr, salaryArr, salaryValue);
        renderPensionerBank(ageValue);
        break;
      }
      case "Gamburg": {
        getBanksFromArrays(berlinArr, salaryArr, salaryValue);
        renderPensionerBank(ageValue);
        break;
      }
      case "Dusseldorf": {
        getBanksFromArrays(dusseldorfArr, salaryArr, salaryValue);
        renderPensionerBank(ageValue);
        break;
      }
      case "NewYork": {
        getBanksFromArrays(nYorkArr, salaryArr, salaryValue);
        renderPensionerBank(ageValue);
        break;
      }
      case "LosAngeles": {
        $("#step3Message").fadeIn(0);
        break;
      }
      default:
        break;
    }
  }

  function renderPensionerBank(userAge) {
    if (userAge > 50) {
      $("#PENSIONERBANK")
        .parents()
        .fadeIn(0);
    } else return;
    return;
  }

  function renderFinish(objectOfUser) {
    var finishUl = $("#finish-data > li");
    Object.entries(objectOfUser).forEach(function(e, index) {
      if (e[0] === "salary") {
        $(finishUl[index]).text("salary :" + salaryText);
      } else {
        var finishText = e.join(" : ");
        $(finishUl[index]).text(finishText);
      }
    });
    return;
  }
});
