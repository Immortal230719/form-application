"Use Strict";

$(document).ready(function() {
  // banks in city
  const moscowArr = [
    "SberBank",
    "VTB",
    "MTSBank",
    "Akibank",
    "Avangard",
    "TheIronBankofBraavos"
  ];
  const spbArr = ["SberBank", "AlfaBank", "SPBBank", "TheIronBankofBraavos"];
  const kazanArr = ["AKBarsBank", "TatNeftBank", "VTB", "TheIronBankofBraavos"];
  const berlinArr = ["DeutscheBank", "DZBank", "TheIronBankofBraavos"];
  const dusseldorfArr = ["CommerzBank", "TheIronBankofBraavos"];
  const nYorkArr = [
    "BankOfAmerica",
    "CitiBank",
    "CNBBank",
    "NYBank",
    "TheIronBankofBraavos",
    "PensionerBank"
  ];
  const losAngelesArr = [];

  // banks in salary

  const salaryArr = [
    [
      "SberBank",
      "VTB",
      "MTSBank",
      "AlfaBank",
      "AKBarsBank",
      "BankOfAmerica",
      "CitiBank",
      "CNBBank",
      "DeutscheBank",
      "DZBank",
      "CommerzBank",
      "PensionerBank"
    ],
    [
      "SberBank",
      "VTB",
      "MTSBank",
      "AlfaBank",
      "AKBarsBank",
      "TatNeftBank",
      "VTB",
      "BankOfAmerica",
      "CitiBank",
      "CNBBank",
      "DeutscheBank",
      "DZBank",
      "CommerzBank",
      "PensionerBank"
    ],
    [
      "SberBank",
      "VTB",
      "MTSBank",
      "Akibank",
      "AlfaBank",
      "AKBarsBank",
      "TatNeftBank",
      "VTB",
      "BankOfAmerica",
      "NYBank",
      "DeutscheBank",
      "DZBank",
      "CommerzBank",
      "PensionerBank"
    ],
    [
      "SberBank",
      "VTB",
      "Avangard",
      "SPBBank",
      "AKBarsBank",
      "TatNeftBank",
      "VTB",
      "BankOfAmerica",
      "NYBank",
      "DeutscheBank",
      "DZBank",
      "CommerzBank",
      "TheIronBankofBraavos",
      "PensionerBank"
    ]
  ];

  // variables
  const salaryRusArray = ["less 10000", "10000-25000", "25000-50000", "50000+"];
  const salaryUSAArray = ["less 100", "100-500", "500-1500", "1500+"];
  let userObj = {};
  if (!$.isEmptyObject(Cookies.getJSON())) {
    const cookie = Cookies.getJSON();
    userObj = {
      name: cookie.currentUser.name,
      age: cookie.currentUser.age,
      country: cookie.currentUser.country,
      city: cookie.currentUser.city,
      salary: cookie.currentUser.salary,
      bank: cookie.currentUser.bank
    };
  }
  let json;
  const stepOne = $("#stepOne");
  const stepTwo = $("#stepTwo");
  const nextStepBtn1 = $("#nextStep1");
  const backStepBtn1 = $("#backStep1");
  const inputUserName = $("#userName");
  const inputUserAge = $("#userAge");
  const selectUserCountry = $("#countrySelect");
  const selectRusCity = $("#rusCitySelect");
  const selectGerCity = $("#gerCitySelect");
  const selectUSACity = $("#usaCitySelect");
  const formStepOne = $("#formStepOne");

  // STEP TWO variables

  const stepTwoBtnBack = $("#backStep2");
  const stepTwoBtnNext = $("#nextStep2");
  const stepTwoFormLabels = $("#salary .salary-text");
  let salaryValue = userObj.salary;
  let salaryText = "";

  // STEP THREE variables

  const stepThreeWrapper = $("#stepThree");
  const stepThreeBtnBack = $("#backStep3");
  const stepThreeBtnNext = $("#nextStep3");
  let bankValue = "";

  // STEP FINISH variables

  const finishWrapper = $("#finish");

  // get & set cookies
  if (userObj.bank !== undefined) {
    $("#welcome").fadeOut(0);
    const salaryCookie = userObj.salary;
    const ageCheck = parseInt(userObj.age);
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
  } else if (userObj.salary !== undefined) {
    $("#welcome").fadeOut(0);
    stepOne.fadeOut(100);

    setCookieSalary(userObj.salary);
    renderStepTwo(userObj);

    stepTwo.fadeIn(1000);
    stepTwoBtnNext.prop("disabled", false);
  } else if (userObj.name !== undefined) {
    $("#welcome").fadeOut(0);
    nextStepBtn1.prop("disabled", false);

    setCookieStepOne();

    // hide div "welcome"
    stepOne.fadeIn(1000);
  }

  // validate forms

  let validator = formStepOne.validate({
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
      let re = new RegExp(regexp);
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
      // enabled button next if had input select 'city'
      if (userObj.hasOwnProperty("city")) {
        nextStepBtn1.prop("disabled", false);
      }
      if (!validator.invalid.name) {
        userObj.name = inputValue;
      }
      if (validator.invalid.name || validator.invalid.age) {
        // disabled button next if hasn't validate
        nextStepBtn1.prop("disabled", true);
        return;
      }
    }, 0);
  });

  // input age

  inputUserAge.on("focusout", function() {
    let inputAgeValue = $(this).val();

    setTimeout(function() {
      // enabled button next if had input select 'city'
      if (userObj.hasOwnProperty("city")) {
        nextStepBtn1.prop("disabled", false);
      }
      if (!validator.invalid.age) {
        userObj.age = inputAgeValue;
      }
      if (validator.invalid.age || validator.invalid.name) {
        // disabled button next if hasn't validate
        nextStepBtn1.prop("disabled", true);
        return;
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

  const citySelect = formStepOne.find("select[name='city']");
  for (let index = 0; index < citySelect.length; index++) {
    $(citySelect[index]).on("change", function() {
      var checkName = userObj.name;
      var checkAge = userObj.age;
      userObj.city = $(this).val();
      setTimeout(function() {
        if (!validator.invalid.age && !validator.invalid.name) {
          nextStepBtn1.prop("disabled", false);
        }
        if (userObj.city === "default" || !checkName || !checkAge) {
          nextStepBtn1.prop("disabled", true);
        }
      }, 0);
    });
  }

  formStepOne.on("submit", function(e) {
    e.preventDefault();
    let name = $(this.name).val();
    let age = $(this.age).val();
    let country = $(this.country).val();

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

    stepOne.fadeOut(0);
    stepTwo.fadeIn(1000);
    json = JSON.stringify(userObj);
    Cookies.set("currentUser", json, { expires: 7 });
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
    json = JSON.stringify(userObj);
    Cookies.set("currentUser", json, { expires: 7 });
    stepTwo.fadeOut(0);
    stepThreeWrapper.fadeIn(1000);
    let ageFilter = parseInt(userObj.age);
    let cityFilter = userObj.city;
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
    userObj.bank = bankValue;
    json = JSON.stringify(userObj);
    Cookies.set("currentUser", json, { expires: 7 });
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
    inputUserName.val(userObj.name);
    inputUserAge.val(userObj.age);
    selectUserCountry.val(userObj.country);

    switch (userObj.country) {
      case "Russia": {
        selectRusCity.fadeIn().val(userObj.city);
        break;
      }
      case "Germany": {
        selectGerCity.fadeIn().val(userObj.city);
        break;
      }
      case "USA": {
        selectUSACity.fadeIn().val(userObj.city);
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
    Cookies.remove("currentUser");
    Cookies.remove("bank");
    return;
  }

  function getBanksFromArrays(arrayOfCity, arrayOfSalary, salaryValue) {
    const indexOfSalary = parseInt(salaryValue);
    let resultArr = [];
    // filter our arrays to get resultArray of Banks
    for (let index = 0; index < arrayOfCity.length; index++) {
      let bankInCity = arrayOfCity[index];
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
      $("#PensionerBank")
        .parents()
        .fadeIn(0);
    } else return;
    return;
  }

  function renderFinish(objectOfUser) {
    let finishUl = $("#finish-data > li");
    Object.entries(objectOfUser).forEach(function(e, index) {
      if (e[0] === "salary") {
        $(finishUl[index]).text("salary :" + salaryText);
      } else {
        let finishText = e.join(" : ");
        $(finishUl[index]).text(finishText);
      }
    });
    return;
  }
});
