// Create consolidated turtles object with some empty key values to append later
let turtles = [{
        name: "Turtle1",
        position: "",
        odds: "",
        racetrack: "lane-1",
    },
    {
        name: "Turtle2",
        position: "",
        odds: "",
        racetrack: "lane-2",

    },
    {
        name: "Turtle3",
        position: "",
        odds: "",
        racetrack: "lane-3",

    },
    {
        name: "Turtle4",
        position: "",
        odds: "",
        racetrack: "lane-4",

    },
]

// Array of Turtle images
let turtleArray = [
    `assets/images/turtle-1.png`,
    'assets/images/turtle-2.png',
    'assets/images/turtle-3.png',
    `assets/images/turtle-4.png`
];

// Define empty array for possible odds
let oddsArr = [];

// Loop until 4 sets of odds objects are pushed into the empty array
do {
    let upperRandom = Math.floor((Math.random() * 20) + 1);
    let lowerRandom = Math.floor((Math.random() * 3) + 1);
    // Conditional argument to omit two even numbers or two 3's
    if (upperRandom % 2 == 0 && lowerRandom % 2 == 0 || upperRandom == 3 && lowerRandom == 3) {
        let upperRandom = Math.floor((Math.random() * 20) + 1);
        let lowerRandom = Math.floor((Math.random() * 3) + 1);
    } else {
        // Push the odds to empty array
        oddsArr.push({
            upper: upperRandom,
            lower: lowerRandom,
        });
    }
}
while (oddsArr.length < 4);

// Function to update odds in turtle object from the odds array above
function updateOddsAgainstTurtle() {
    for (let l in turtles) {
        turtles[l].odds = oddsArr[l]
    };
}

// Function to shuffle an array passed in as an argument
function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
};

// Function to set finishing positions based on weighted odds
function defPositions() {
    // Call update odds function
    updateOddsAgainstTurtle()
    // Define an empty array to insert weighted odds
    let weightsArr = [];

    // Loop through turtles to declare odds weights
    for (let i in turtles) {
        let weights = Math.floor((100 / turtles[i].odds.upper) * turtles[i].odds.lower);

        // Loop to push number of turtle names to weights array based on odds weights
        let j = 0;
        while (j < weights) {
            weightsArr.push(turtles[i].name)
            j++
        }
    }

    // Shuffle the weights array using shuffle array function
    shuffleArr(weightsArr);

    // Define variable for each turtle final position
    let finalPositions = 1;

    // Loop throigh all 4 turtles
    while (finalPositions < 5) {

        // Loop to set final positions of turtles by taking first turtle from weights array
        for (let i in turtles) {
            if (weightsArr[0] === turtles[i].name) {
                // Assign turtle position
                turtles[i].position = finalPositions;
                // Filter turtle from the weights array
                weightsArr = weightsArr.filter(each => each != weightsArr[0])
                finalPositions++;

            }
        }
    }
}
defPositions();

// Add event listener for page load
document.addEventListener('DOMContentLoaded', function () {

    // Define variable as an object for all .start-position divs
    var startPos = $('.start-position');

    // Loop through the start positions object and the turtle array, 
    // inserting the images to the divs
    for (let i = 0; i < startPos.length; i++) {
        startPos[i].insertAdjacentHTML('beforeend', `<img src="${turtleArray[i]}">`);
    }

    $('#tokens')[0].innerHTML = 100;

    // Call function to update turtle odds to turtle object
    updateOddsAgainstTurtle()
    // Loop through odds divs and append odds from turtles object
    var loadOdds = $('.odds');
    for (let i = 0; i < loadOdds.length; i++) {
        loadOdds[i].append(turtles[i].odds.upper + '/' + turtles[i].odds.lower);
    }
});


// Add event listener for click start button
document.getElementById("start-race-button").addEventListener("click", function () {

    // Empty start positions
    $('#start-position-1').empty();
    $('#start-position-2').empty();
    $('#start-position-3').empty();
    $('#start-position-4').empty();

    // Append turtle positions to html
    $(`#lane-1-position-${turtles[0].position}`).append(`<img src="assets/images/turtle-1.png">`);
    $(`#lane-2-position-${turtles[1].position}`).append(`<img src="assets/images/turtle-2.png">`);
    $(`#lane-3-position-${turtles[2].position}`).append(`<img src="assets/images/turtle-3.png">`);
    $(`#lane-4-position-${turtles[3].position}`).append(`<img src="assets/images/turtle-4.png">`);

    // Remove start button after click
    document.getElementById("start-race-button").style.display = 'none';
    document.getElementById("next-race-button").style.display = '';



});

document.getElementById("next-race-button").addEventListener("click", function () {
    
    // Empty all turtles
    var allTurts = $('.placer');
    for (i = 0; i < allTurts.length; i++) {
        allTurts.empty();
    }

    // Define variable as an object for all .start-position divs
    var startPos = $('.start-position');

    // Loop through the start positions object and the turtle array, 
    // inserting the images to the divs
    for (let i = 0; i < startPos.length; i++) {
        startPos[i].insertAdjacentHTML('beforeend', `<img src="${turtleArray[i]}">`);
    }

    document.getElementById("start-race-button").style.display = '';
    document.getElementById("next-race-button").style.display = 'none';









    // Define empty array for possible odds
let oddsArr = [];

// Loop until 4 sets of odds objects are pushed into the empty array
do {
    let upperRandom = Math.floor((Math.random() * 20) + 1);
    let lowerRandom = Math.floor((Math.random() * 3) + 1);
    // Conditional argument to omit two even numbers or two 3's
    if (upperRandom % 2 == 0 && lowerRandom % 2 == 0 || upperRandom == 3 && lowerRandom == 3) {
        let upperRandom = Math.floor((Math.random() * 20) + 1);
        let lowerRandom = Math.floor((Math.random() * 3) + 1);
    } else {
        // Push the odds to empty array
        oddsArr.push({
            upper: upperRandom,
            lower: lowerRandom,
        });
    }
}
while (oddsArr.length < 4);

// Function to update odds in turtle object from the odds array above
function updateOddsAgainstTurtle() {
    for (let l in turtles) {
        turtles[l].odds = oddsArr[l]
    };
}

// Function to shuffle an array passed in as an argument
function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
};

// Function to set finishing positions based on weighted odds
function defPositions() {
    // Call update odds function
    updateOddsAgainstTurtle()
    // Define an empty array to insert weighted odds
    let weightsArr = [];

    // Loop through turtles to declare odds weights
    for (let i in turtles) {
        let weights = Math.floor((100 / turtles[i].odds.upper) * turtles[i].odds.lower);

        // Loop to push number of turtle names to weights array based on odds weights
        let j = 0;
        while (j < weights) {
            weightsArr.push(turtles[i].name)
            j++
        }
    }

    // Shuffle the weights array using shuffle array function
    shuffleArr(weightsArr);

    // Define variable for each turtle final position
    let finalPositions = 1;

    // Loop throigh all 4 turtles
    while (finalPositions < 5) {

        // Loop to set final positions of turtles by taking first turtle from weights array
        for (let i in turtles) {
            if (weightsArr[0] === turtles[i].name) {
                // Assign turtle position
                turtles[i].position = finalPositions;
                // Filter turtle from the weights array
                weightsArr = weightsArr.filter(each => each != weightsArr[0])
                finalPositions++;

            }
        }
    }
}
defPositions();
    // Call function to update turtle odds to turtle object
    updateOddsAgainstTurtle()

});