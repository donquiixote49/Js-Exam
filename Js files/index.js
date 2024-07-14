// !loader start 

$(".loading").fadeOut(700, function() {
    $("body").css("overflow", "auto");
});



// !loader end


// ! open links start 

// ? Category 



// ? Category 

// ! open links end


// ! sideBar start 

const sideBarWidth = $('.sideMenu').innerWidth()

function openSideBar() {


    $('#edgeToggle').children().eq("0").hide(500)

    $('#edgeToggle').children().eq("1").show(500)

    $('#sideBar').animate({
        left: 0
    }, 400)

    $('.sideLinks').children().addClass("animate__animated animate__fadeInUpBig ")
}




function closeSideBar() {
    $('#edgeToggle').children().eq("0").show(500)

    $('#edgeToggle').children().eq("1").hide(500)

    $('#sideBar').animate({
        left: -sideBarWidth
    }, 400)

    $('.sideLinks').children().removeClass("animate__animated animate__fadeInUpBig")
}



$('#edgeToggle').on('click', function() {
    if ($('#sideBar').css('left') == "0px") {
        closeSideBar()

    } else {
        openSideBar()
    }

})


// ! sideBar End



// ! get Api Data start

let meal = []

async function getMeals() {

    let mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let apiResponse = await mealApi.json()
    meal = apiResponse.meals

    displayMeals()
}

getMeals()

// ! Get Api Data end



// ! DisplayData start 



function displayMeals() {
    let mealBox = ``;

    for (let i = 0; i < meal.length; i++) {

        let strImg = meal[i].strMealThumb
        let strMeal = meal[i].strMeal
        let mealId = meal[i].idMeal


        mealBox += `
        <div class="col-md-4 col-lg-3">
                        <div class="card rounded-3">
                            <img src="${strImg}" loading="lazy" class="w-100" alt="">
                            <div class="overlay text-center d-flex align-items-center justify-content-center bg-light bg-opacity-75 px-1"><h2 class="h3"  data-id="${mealId}">${strMeal}</h2></div>
                        </div>
                    </div>
        
        `
    }

    $('#mealData').html(`${mealBox}`);


    $('.card').on('click', function() {

        let card = $(this);
        let mealId = card.find("h2").attr("data-id")
        getMealById(mealId)

    })



}


// ! DisplayData end



// ! Display Data Details start 

function displayDetails(meal) {

    $('mealData').html("")

    let ingredientsBox = ``;

    for (let i = 0; i < 20; i++) {

        if (meal[`strIngredient${i}`]) {

            ingredientsBox += `
    <li class="alert alert-secondary m-2 p-2">${
        meal[`strMeasure${i}`]
        } ${meal[`strIngredient${i}`]}</li>
    `
        }


    }

    let tag = meal.strTags?.split(",");

    if (!tag) tag = [];

    let tagBox = ``

    for (let i = 0; i < tag.length; i++) {

        tagBox += `
        
        <li class="alert alert-danger m-2 p-2">${tag[i]}</li>
        
        
        `
    }


    let mealDetailsBox = `
    
    <div class="col-md-4">
    <div class="text-center">
        <div class="mealImg rounded-3 border border-4 border-white">
            <img src="${meal.strMealThumb}" class="w-100" alt="">
        </div>
        <h2 class="mealName text-white fw-bold mt-3">${meal.strMeal}</h2>
    </div>
</div>

<div class="col-md-8 ">
    <div class="d-flex   flex-column text-white-50">
        <div>
            <h2>Instructions</h2>
            <p  class="text-gray">${meal.strInstructions}</p>
        </div>

        <div class="d-flex align-items-center gap-1 mt-2">
            <h4 class="mb-0">Area :</h4>
            <p class="fs-5 mb-0">${meal.strArea}</p>
        </div>

        <div class="d-flex align-items-center gap-1 mt-3">
            <h4 class="mb-0">Category :</h4>
            <p class="fs-5 mb-0">${meal.strCategory}</p>
        </div>

        <div class="mt-4">
            <h2 class="fw-bold">Ingredients :</h2>
            <div  class="d-flex flex-wrap gap-3 mt-3 text-dark">
                <ul class="ingList list-unstyled d-flex flex-wrap g-3">
                ${ingredientsBox}
                </ul>
            </div>
        </div>

        <div class="mt-4">
            <h2 class="fw-bold">Tags :</h2>
            <div  class="d-flex flex-wrap gap-3 mt-3 text-dark ">
                <ul class="ingList list-unstyled d-flex flex-wrap g-3">
                    ${tagBox}
                </ul>
            </div>
        </div>
        <div class="d-flex gap-3 mt-5 btns">
            <button type="button" class="btn btn-outline-primary">
                <a href="${meal.strSource}" target="_blank" id="btnSource"
                    class="text-white  fw-bold fs-5">Source</a>
            </button>
            <button type="button" class="btn btn-outline-danger">
                <a href="${meal.strYoutube}" target="_blank" id="btnYoutube"
                    class=" fw-bold fs-5">Youtube</a>
            </button>
        </div>
    </div>
</div>
    
    
    
    
    
    `;

    $('#mealData').html(`${mealDetailsBox}`)


}


// ! Display Data Details end 




// ! Get Meal With ID start 

async function getMealById(mealId) {



    let mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);

    let apiResponse = await mealApi.json();

    const meal = apiResponse.meals[0]


    displayDetails(meal);

}




// ! Get Meal With ID start 


// ! Categories start 


let categories = []

async function getCategories() {

    $('.loading').fadeIn(300)

    let mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);

    let apiResponse = await mealApi.json();


    categories = apiResponse.categories

    displayCategories();

    $('.loading').fadeOut(300)

}




function displayCategories() {


    categoryBox = ``

    for (let i = 0; i < categories.length; i++) {
        let strImg = categories[i].strCategoryThumb
        let category = categories[i].strCategory


        categoryBox += `
        
        
        <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card rounded-3 bg-transparent">
                            <img src="${strImg}" loading="lazy" class="w-100" alt="">
                            <div class="overlay   d-flex text-center align-items-center justify-content-center bg-light bg-opacity-75 px-2"><h2  >${category}</h2></div>
                        </div>
                    </div>
        
        
        
        
        
        `
    }

    $('#mealData').html(`${categoryBox}`)


    $('.card').on('click', function() {

        let card = $(this)
        let category = card.find('h2').html()

        displayMealByCategory(category)
    })

}


let selectedMeals = []


async function displayMealByCategory(category) {

    $(".loading").fadeIn(300);

    let mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let apiResponse = await mealApi.json();

    selectedMeals = apiResponse.meals


    displaySelectedMeals()


    $(".loading").fadeOut(300);

}


function displaySelectedMeals() {
    let mealBox = ``

    for (let i = 0; i < selectedMeals.length; i++) {

        let strImg = selectedMeals[i].strMealThumb;
        let strMeal = selectedMeals[i].strMeal;
        let mealId = selectedMeals[i].idMeal;

        mealBox += `
        
        
        
        <div class="col-md-3">
                        <div class="card rounded-3">
                            <img src="${strImg}" loading="lazy" class="w-100" alt="">
                            <div class="overlay  d-flex text-center align-items-center justify-content-center bg-light bg-opacity-75 px-3"><h2 class="h5" data-id="${mealId}">${strMeal}</h2></div>
                        </div>
                    </div>
        
        
        
        
        
        `

    }

    $('#mealData').html(`${mealBox}`)

    $('.card').on('click', function() {

        let card = $(this);
        let mealId = card.find("h2").attr("data-id")
        getMealById(mealId)

    })

}




$('.category').on('click', function() {
    $('#searchBox').html("");
    $('#mealData').html("");
    $('#contactBox').html("");

    closeSideBar();
    getCategories();
})




// ! Categories end



// ! Area Start 




let area = []

async function getArea() {
    $(".loading").fadeIn(300);

    let mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);

    let apiResponse = await mealApi.json()

    area = apiResponse.meals

    displayByArea();

    $(".loading").fadeOut(300);
}


function displayByArea() {

    let areaBox = ``

    for (let i = 0; i < area.length; i++) {

        areaBox += `
        
        <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="city text-center border border-1 border-white p-4 ">
                        <i class="fa-solid fa-city text-white fa-4x"></i>
                        <h2 class=" h4 text-white mb-0 mt-3">${area[i].strArea}</h2>
                        </div>
                    </div>
        
        `
    }

    $('#mealData').html(`${areaBox}`);

    $('.city').on('click', function() {

        let city = $(this)
        area = city.find('h2').html()

        getMealByArea(area)

    })
}


async function getMealByArea(area) {

    $(".loading").fadeIn(300);

    let mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let apiResponse = await mealApi.json();

    selectedMeals = apiResponse.meals;

    displaySelectedMeals();

    $(".loading").fadeOut(300);

}


$('.area').on('click', function() {
    $('#searchBox').html("");
    $('#mealData').html("");
    $('#contactBox').html("");

    closeSideBar();
    getArea();
})




// ! Area End



// ! ingredients start 

let mealIngredient = []


async function getIngredients() {
    $(".loading").fadeIn(300);

    let mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let apiResponse = await mealApi.json();

    mealIngredient = apiResponse.meals;


    displayIngredients()

    $(".loading").fadeOut(300);


}


function displayIngredients() {

    let ingredientBox = ``

    for (let i = 0; i < 20; i++) {

        ingredientBox += `
    

    <div class="col-lg-3 col-md-4 c0l-sm-6">
                        <div class="ingredient text-center border border-1 border-white py-4 px-2" >
    <i class="fa-solid fa-bowl-food fa-4x text-white"></i>
    <h2 class="text-white fw-bold m-3">${mealIngredient[i].strIngredient}</h2>
    <p  class="text-white"> ${mealIngredient[i].strDescription}</p>
    </div>
                    </div>
    `
    }

    $('#mealData').html(`${ingredientBox}`)

    $(".ingredient").on("click", function() {
        let item = $(this);
        let ingredient = item.find("h2").html();

        getMealByIngredient(ingredient);
    });


}



async function getMealByIngredient(ingredient) {

    $(".loading").fadeIn(300);

    let mealAPI = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    let apiResponse = await mealAPI.json();

    selectedMeals = apiResponse.meals;

    displaySelectedMeals();

    $(".loading").fadeOut(300);
}




$('.ingred').on('click', function() {
    $('#searchBox').html("");
    $('#mealData').html("");
    $('#contactBox').html("");

    closeSideBar();
    getIngredients();
})


// ! ingredients end 




// ! Search Start 

async function searchByName(mealName) {

    $(".loading").fadeIn(300);

    let mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    let apiResponse = await mealApi.json();
    meal = apiResponse.meals;

    displayMeals()

    $(".loading").fadeOut(300);

}




async function searchByLetter(letter) {
    $(".loading").fadeIn(300);

    let mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);

    let apiResponse = await mealApi.json();

    meal = apiResponse.meals;

    displayMeals()

    $(".loading").fadeOut(300);
}




function searchInputs() {

    let searchInputBox = `



<div class="searchInputs d-flex mt-3">
                    <form class="form-floating w-100 mx-4 ">
                        <input type="text" class="form-control  border-0 border-bottom" id="searchByName" placeholder="name@example.com" >
                        <label for="searchByName">Search By Name</label>
                    </form>
                    <form class="form-floating w-100 mx-4 ">
                        <input maxlength="1" type="text" class="form-control  border-0 border-bottom" id="searchByLetter" placeholder="name@example.com" >
                        <label  for="searchByLetter">Search By First Letter</label>
                    </form>
                </div>


`

    $('#searchBox').html(`${searchInputBox}`);


    $('#searchByName').on('input', function() {

        let nameInput = $(this).val();

        searchByName(nameInput)


    })



    $('#searchByLetter').on('input', function() {

        let letterInput = $(this).val()

        searchByLetter(letterInput)




    })




}



$('.searchPage').on('click', function() {
    $('#searchBox').html("");
    $('#mealData').html("");
    $('#contactBox').html("");

    closeSideBar();
    searchInputs();
})



// ! Search end 




// ! contact Start 


function getInputs() {
    let contactBox = `
    
    
<div class="container ps-5 min-vh-100 d-flex flex-column justify-content-center align-items-center ">
       <h2 class=" text-white mb-5">Contact Us</h2>
              <div class="row g-4  ">
                <div class="col-md-6">
                  <input
                  
                    type="text"
                    placeholder="Enter Your Name"
                    class="nameInput form-control   bg-transparent text-white p-3 border-0 border-bottom "
                  />
                  <p class="mt-1 mb-1 fw-bold d-none text-danger " id="nameWarning">
                    Special characters and numbers not allowed!
                  </p>
                </div>
                <div class="col-md-6">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    class="emailInput form-control bg-transparent text-white p-3 border-0 border-bottom"
                  />
                  <p class="mt-1 mb-1 fw-bold d-none text-danger " id="emailWarning">
                    Email not valid! *exemple@yyy.zzz*
                  </p>
                </div>
                <div class="col-md-6">
                  <input
                    type="text"
                    placeholder="Enter Your Phone"
                    class="phoneInput form-control bg-transparent text-white p-3 border-0 border-bottom"
                  />
                  <p class="mt-1 mb-1 fw-bold d-none text-danger " id="phoneWarning">
                    Enter valid Phone Number
                  </p>
                </div>
                <div class="col-md-6">
                  <input
                    type="number"
                    placeholder="Enter Your Age"
                    class="ageInput form-control bg-transparent text-white p-3 border-0 border-bottom"
                  />
                  <p class="mt-1 mb-1 fw-bold d-none text-danger " id="ageWarning">
                    Enter valid age
                  </p>
                </div>
                <div class="col-md-6">
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    class="passwordInput form-control bg-transparent text-white p-3 border-0 border-bottom"
                  />
                  <p class="mt-1 mb-1 fw-bold d-none text-danger " id="passwordWarning">
                    Enter valid password *Minimum 8 characters, at least 1
                    letter and 1 number*
                  </p>
                </div>
                <div class="col-md-6">
                  <input
                    type="password"
                    placeholder="Re-Enter Your Password"
                    class="repasswordInput form-control bg-transparent text-white p-3 border-0 border-bottom"
                  />
                  <p class="mt-1 mb-1 fw-bold d-none text-danger " id="repasswordWarning">
                    Your password doesn't match! please try again
                  </p>
                </div>
              </div>
               <button disabled="true" id="submitBtn" class="btn btn-outline-danger mt-5 px-4">
              Submit
            </button>
            </div>


    
    `
    $('#contactBox').html(`${contactBox}`);



    // ? Validation start 


    const usernameInput = $(".nameInput");
    const emailInput = $(".emailInput");
    const phoneInput = $(".phoneInput");
    const ageInput = $(".ageInput");
    const passwordInput = $(".passwordInput");
    const repasswordInput = $(".repasswordInput");
    const submitBtn = $("#submitBtn");
    const nameWarning = document.getElementById("nameWarning");
    const emailWarning = document.getElementById("emailWarning");
    const phoneWarning = document.getElementById("phoneWarning");
    const ageWarning = document.getElementById("ageWarning");
    const passwordWarning = document.getElementById("passwordWarning");
    const repasswordWarning = document.getElementById("repasswordWarning");




    usernameInput.on("input", function() {
        if (nameValidation(usernameInput.val())) {
            enableBtn();
            usernameInput.classList.add("is-valid");
            nameWarning.classList.add("d-none");
        } else {
            // usernameInput.classList.add('is-invalid')
            nameWarning.classList.remove("d-none");
            submitBtn.attr("disabled", true);
        }
    });

    emailInput.on("input", function() {
        if (emailValidation(emailInput.val())) {
            enableBtn();
            emailWarning.classList.add("d-none");
        } else {
            emailWarning.classList.remove("d-none");
            submitBtn.attr("disabled", true);
        }
    });

    phoneInput.on("input", function() {
        if (phoneValidation(phoneInput.val())) {
            enableBtn();
            phoneWarning.classList.add("d-none");
        } else {
            phoneWarning.classList.remove("d-none");
            submitBtn.attr("disabled", true);
        }
    });

    ageInput.on("input", function() {
        if (ageValidation(ageInput.val())) {
            enableBtn();
            ageWarning.classList.add("d-none");
        } else {
            ageWarning.classList.remove("d-none");
            submitBtn.attr("disabled", true);
        }
    });

    passwordInput.on("input", function() {
        if (passwordValidation(passwordInput.val())) {
            enableBtn();
            passwordWarning.classList.add("d-none");
        } else {
            passwordWarning.classList.remove("d-none");
            submitBtn.attr("disabled", true);
        }
    });

    repasswordInput.on("input", function() {
        if (repasswordValidation(repasswordInput.val())) {
            enableBtn();
            repasswordWarning.classList.add("d-none");
        } else {
            repasswordWarning.classList.remove("d-none");
            submitBtn.attr("disabled", true);
        }
    });




    // ? Validation end


    // ? Regex start 

    function nameValidation(userName) {
        const nameRegex = /^[a-zA-Z ]+$/;
        return nameRegex.test(userName);
    }

    function emailValidation(email) {
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    function phoneValidation(phone) {
        const phoneRegex =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    }

    function ageValidation(age) {
        const ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
        return ageRegex.test(age);
    }

    function passwordValidation(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
        return passwordRegex.test(password);
    }

    function repasswordValidation(repassword) {
        return repassword == passwordInput.val();
    }

    function enableBtn() {
        if (
            nameValidation(usernameInput.val()) &&
            emailValidation(emailInput.val()) &&
            phoneValidation(phoneInput.val()) &&
            ageValidation(ageInput.val()) &&
            passwordValidation(passwordInput.val()) &&
            repasswordValidation(repasswordInput.val())
        ) {
            submitBtn.attr("disabled", false);
        } else {
            submitBtn.attr("disabled", true);
        }
    }




    // ? Regex end 




}



$('.contactPage').on('click', function() {
    $('#searchBox').html("");
    $('#mealData').html("");
    $('#contactBox').html("");

    closeSideBar();
    getInputs();
})



// ! contact end