// Create consolidated turtles object with position and odds key values to append with functions
let turtles = [{
        name: "Turtle1",
        position: "",
        odds: "",
        racetrack: "lane-1",
        img: "assets/images/turtle-1.png"
    },
    {
        name: "Turtle2",
        position: "",
        odds: "",
        racetrack: "lane-2",
        img: "assets/images/turtle-2.png"

    },
    {
        name: "Turtle3",
        position: "",
        odds: "",
        racetrack: "lane-3",
        img: "assets/images/turtle-3.png"

    },
    {
        name: "Turtle4",
        position: "",
        odds: "",
        racetrack: "lane-4",
        img: "assets/images/turtle-4.png"

    },
]

/** FUNCTION #1
 * Clear all turtles from race track if any exist
 * then assign turtles to start positions
 */
function clearTrack() {
    // Empty all turtles
    var allTurts = $('.placer');
    for (i = 0; i < allTurts.length; i++) {
        allTurts.empty();
    }
    // Define variable for all .start-position divs
    var startPos = $('.start-position');

    // Loop through turtles object and insert turtle images to start positions
    for (let i = 0; i < startPos.length; i++) {
        startPos[i].insertAdjacentHTML('beforeend', `<img src=${turtles[i].img}>`);
    }
}

/** FUNCTION #2
 * Generate odds for each turtle in correct format
 * then push to turtles object and append to html
 */
function setOdds() {
    // Define empty array for possible odds
    let oddsArr = [];

    // Loop until 4 sets of odds objects are pushed into the empty array
    do {
        let upperRandom = Math.floor((Math.random() * 20) + 1);
        let lowerRandom = Math.floor((Math.random() * 3) + 1);
        // Conditional argument to omit two even numbers or two 3's
        if (upperRandom % lowerRandom == 0 && (upperRandom !== 1 && lowerRandom !== 1)) {
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

    // Loop to update odds in turtle object from the odds array above
    for (let l in turtles) {
        turtles[l].odds = oddsArr[l]
    };

    // Empty current turtle odds
    loadOdds = $('.odds').empty();
    // Loop through odds divs and append odds from turtles object
    for (let i = 0; i < loadOdds.length; i++) {
        loadOdds[i].append(turtles[i].odds.upper + '/' + turtles[i].odds.lower);
    }
}

/** FUNCTION #3
 * Shuffle an array passed in as an argument
 */
function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
};

/** FUNCTION #4
 * Set turtle weights from the odds generated
 * and from weights set finishing positions
 */
// Function to set finishing positions based on weighted odds
function setPositions() {
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

// Add event listener for page load
document.addEventListener('DOMContentLoaded', function () {

    // Call clear track function
    clearTrack();

    $('#tokens')[0].innerHTML = 100;

    // Call function to update turtle odds to turtle object
    setOdds();

});


// Event listener for click start race button
document.getElementById("start-race-button").addEventListener("click", function () {

    // Call set positions function
    setPositions();

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

    // Replace start race button with next race button
    document.getElementById("start-race-button").style.display = 'none';
    document.getElementById("next-race-button").style.display = '';

});

// Event listener for click next race button
document.getElementById("next-race-button").addEventListener("click", function () {

    // Call clear track function
    clearTrack()

    // Replace next race button with start race button
    document.getElementById("start-race-button").style.display = '';
    document.getElementById("next-race-button").style.display = 'none';

    setOdds();


});

let field1 = $(".bet")[0];
let field2 = $(".bet")[1];
let field3 = $(".bet")[2];
let field4 = $(".bet")[3];

function inputfunction() {
    if (field1.value.length > 0) {
        field2.disabled = true;
        field3.disabled = true;
        field4.disabled = true;
    } else if (field2.value.length > 0) {
        field1.disabled = true;
        field3.disabled = true;
        field4.disabled = true;
    } else if (field3.value.length > 0) {
        field1.disabled = true;
        field2.disabled = true;
        field4.disabled = true;
    } else if (field4.value.length > 0) {
        field1.disabled = true;
        field2.disabled = true;
        field3.disabled = true;
    } else { 
        field1.disabled = false;
        field2.disabled = false;
        field3.disabled = false;
        field4.disabled = false;
      }
}


field1.addEventListener('input', inputfunction);
field2.addEventListener('input', inputfunction);
field3.addEventListener('input', inputfunction);
field4.addEventListener('input', inputfunction);