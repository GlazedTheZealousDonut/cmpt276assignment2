// Global Variables
var inputArray = document.querySelectorAll(".inputs");

/*
    Getters for Attributes
*/
function getName() {
    return document.querySelector("#inputName").value;
}

function getHeight() {
    return parseInt(document.querySelector("#inputHeight").value);
}

function getWeight() {
    return parseInt(document.querySelector("#inputWeight").value);
}

function getFlying() {
    return parseInt(document.querySelector("#inputFlying").value);
}

function getFighting() {
    return parseInt(document.querySelector("#inputFighting").value);
}

function getFire() {
    return parseInt(document.querySelector("#inputFire").value);
}

function getWater() {
    return parseInt(document.querySelector("#inputWater").value);
}

function getElectric() {
    return parseInt(document.querySelector("#inputElectric").value);
}

function getIce() {
    return parseInt(document.querySelector("#inputIce").value);
}

function getTotal() {
    return parseInt(document.querySelector("#inputTotal").value);
}

function getTrainerName() {
    return document.querySelector("#inputTrainerName").value;
}

/*
    Setters for Attributes
*/
function setName(name) {
    document.querySelector("#inputName").value = name;
}

function setHeight(height) {
    document.querySelector("#inputHeight").value = parseInt(height);
}

function setWeight(weight) {
    document.querySelector("#inputWeight").value = parseInt(weight);
}

function setFlying(flying) {
    document.querySelector("#inputFlying").value = parseInt(flying);
}

function setFighting(fighting) {
    document.querySelector("#inputFighting").value = parseInt(fighting);
}

function setFire(fire) {
    document.querySelector("#inputFire").value = parseInt(fire);
}

function setWater(water) {
    document.querySelector("#inputWater").value = parseInt(water);
}

function setElectric(electric) {
    document.querySelector("#inputElectric").value = parseInt(electric);
}

function setIce(ice) {
    document.querySelector("#inputIce").value = parseInt(ice);
}

function setTotal(total) {
    document.querySelector("#inputTotal").value = parseInt(total);
}

function setTrainerName(trainerName) {
    document.querySelector("#inputTrainerName").value = trainerName;
}

/*
    Function to create tokimon objects in JSON format
*/
function createTokimon() {
    let sum = (getFlying() + getFighting() + getFire() + getWater() + getElectric() + getIce())
    var tokimon = {
        [name] : getName(),
        [height] : getHeight(),
        [weight] : getWeight(),
        [flying] : getFlying(),
        [fighting] : getFighting(),
        [fire] : getFire(),
        [water] : getWater(),
        [electric] : getElectric(),
        [ice] : getIce(),
        [total] : sum
    }
}

/*  
    Random Number Generator
    @max - enter the maximum number that should be generated
    @return - returns a random number less than max
*/
function getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  }

/*
    Function to Calculate Total
    @return - return the total of the 6 other battle attributes
*/
function sumTotal() {
    return (getFlying() + getFighting() + getFire() + getWater() + getElectric() + getIce());
}

/*
    Automatically Update Total Number on KeyPress/Click
*/
inputArray.forEach(function(element) {
    element.addEventListener("keyup", function() {
        setTotal(sumTotal());
    }
)});

inputArray.forEach(function(element) {
    element.addEventListener("click", function() {
        setTotal(sumTotal());
    }
)});


/*
    Randomize All Tokimon Attributes in Form
*/
// *note: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function randomize() {
    setName(Math.random().toString(36).substr(2, 5));
    setHeight(getRandom(200));
    setWeight(getRandom(200));
    setFlying(getRandom(100));
    setFighting(getRandom(100));
    setFire(getRandom(100));
    setWater(getRandom(100));
    setElectric(getRandom(100));
    setIce(getRandom(100));
    setTotal(sumTotal());
    setTrainerName(Math.random().toString(36).substr(2, 7));
}

// Event Listeners
document.querySelector("#randomizeButton").addEventListener("click", randomize);
