console.log("hello");

window.addEventListener("load", init)

let BaseAPI = "https://api.openweathermap.org/data/2.5/weather?";
let APIKey = "7b9ef6d5a3c36d00b45d1c53aa1413c9";

function FtoC(degree) {
    let ret = degree - 32;
    ret = ret * 5 / 9;
    return Math.round(ret);
}

function CtoF(degree) {
    let ret = degree * 9 / 5;
    ret = ret + 32;
    return Math.round(ret);
}

function init() {
    let buttonC = document.getElementById("C");
    let buttonF = document.getElementById("F");
    buttonC.disabled = true;

    buttonC.addEventListener("click", function(){
        let temp = document.querySelector("h1");
        let temp_num = parseInt(temp.innerText);
        temp.innerText = FtoC(temp_num) + decodeURI("%C2%B0");
        buttonC.disabled = true;
        buttonF.disabled = false;
    })

    buttonF.addEventListener("click", function(){
        let temp = document.querySelector("h1");
        let temp_num = parseInt(temp.innerText);
        temp.innerText = CtoF(temp_num) + decodeURI("%C2%B0");
        buttonF.disabled = true;
        buttonC.disabled = false;

    })


    function changeImage(new_img) {
        let image = document.getElementById("img");
        console.log(image);
        let imgs = ["cloudy", "rain", "semi_cloudy", "snowflake", "storm","sunny"];
        
        if (!imgs.includes(new_img.toLowerCase())) {
            image.src = "images/cloudy.svg";
        } else {
            image.src = "images/" + new_img.toLowerCase() + ".svg";
        }
    }

    changeLocation();
    let buttonZip = document.getElementById("zip_btn");
    let buttonCity = document.getElementById("city_btn");

    buttonZip.addEventListener("click", function(){changeLocation("zip")});

    buttonCity.addEventListener("click", function(){changeLocation("city")});

    // new function created for updating the app!
    function changeLocation(mode) {
        // units system for having a proper temperature unit
        let units = "metric";
        if (buttonF.disabled) {
            units = "imperial";
        }

        let key = "q=Seattle";
        if(mode == "zip") {
            let input = document.getElementById("get_zip");
            key = "zip=" + input.value;
        } else if (mode == "city") {
            let input = document.getElementById("get_city")
            key = "q=" + input.value;
        }

        console.log(key);

        // main url from which you basically get the data
        let url = BaseAPI + key + "&units=" + units + "&appid=" + APIKey;

        // using the console to check what things to add
        console.log(url);

        // getting data from the url
        fetch(url)
            .then(function(data){
                if (data.status >= 200 && data.status < 300) {
                    return data.text();
                } else {
                    return 0;
                }
            })
            .then(JSON.parse)
            .then(function(data){
                console.log(data);
                let temp = document.querySelector("h1");
                temp.innerText = Math.round(data.main.temp) + decodeURI("%C2%B0");

                changeImage(data.weather[0].main);

                let cast = document.querySelector("h4");
                cast.innerText = data.weather[0].main;

                let place = document.querySelector("h3");
                place.innerText = data.name;

                let country = document.querySelector("h5");
                country.innerText = data.sys.country;
            })
            .catch(function(){
                alert("Wrong Request!");
            })
    }
}

