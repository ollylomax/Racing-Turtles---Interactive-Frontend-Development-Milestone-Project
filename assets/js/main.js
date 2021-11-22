// Create consolidated turtles object with position and odds key values to append with functions
const turtles = [{
        name: "Terry",
        position: "",
        odds: "",
        racetrack: "lane-1",
        img: "assets/images/turtle-1.png"
    },
    {
        name: "Tamsin",
        position: "",
        odds: "",
        racetrack: "lane-2",
        img: "assets/images/turtle-2.png"

    },
    {
        name: "Tabatha",
        position: "",
        odds: "",
        racetrack: "lane-3",
        img: "assets/images/turtle-3.png"

    },
    {
        name: "Thaddius",
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

/** FUNCTION #5
 * Restrict betting to one input box and prevent
 * certain numbers from being entered
 */
function betRestrict() {
    // Ternary conditional to restrict numbers above user's total tokens
    this.value = (this.value > parseInt($('#tokens')[0].innerHTML)) ? parseInt($('#tokens')[0].innerHTML) : this.value;
    // Ternary conditional to prevent numbers below 1
    this.value = (this.value < Number(1)) ? '' : this.value;

    // Conditional statement to disable the other bet boxes when a value is entered
    // into the chosen bet box
    if ($(".bet")[0].value.length > 0) {
        $(".bet")[1].disabled = true;
        $(".bet")[2].disabled = true;
        $(".bet")[3].disabled = true;
    } else if ($(".bet")[1].value.length > 0) {
        $(".bet")[0].disabled = true;
        $(".bet")[2].disabled = true;
        $(".bet")[3].disabled = true;
    } else if ($(".bet")[2].value.length > 0) {
        $(".bet")[0].disabled = true;
        $(".bet")[1].disabled = true;
        $(".bet")[3].disabled = true;
    } else if ($(".bet")[3].value.length > 0) {
        $(".bet")[0].disabled = true;
        $(".bet")[1].disabled = true;
        $(".bet")[2].disabled = true;
    } else {
        $(".bet")[0].disabled = false;
        $(".bet")[1].disabled = false;
        $(".bet")[2].disabled = false;
        $(".bet")[3].disabled = false;
    }
}

function showResults() {
    // var bets = $(".bet");

    // Clear results div
    $('#results').empty();

    // Loop to declare race winner
    turtles.forEach(function (arrayItem) {

        if (arrayItem.position == 1) {
            $('#results').append(`
        <p>${arrayItem.name} the turtle comes out on top!</p>`);
        }

    });



    turtles.forEach((turtle, index) => {


        var bets = Object.values(document.getElementsByClassName('bet'))[index];

        if (bets.value && turtle.position == 1) {


            var betVal = bets.value;
            var betWinnings = Math.ceil(bets.value / turtle.odds.lower * (turtle.odds.upper));

            $('#tokens')[0].innerHTML = parseInt($('#tokens')[0].innerHTML) + parseInt(betWinnings);
            $('#results').append(`
            <p>YOU WON!!!!!</p>
            <p>You bet ${betVal} Tokens</p>
            <p>You won ${betWinnings} Tokens</p>
            `);
        } else if (bets.value && turtle.position !== 1) {
            var betVal = bets.value;
            $('#tokens')[0].innerHTML = parseInt($('#tokens')[0].innerHTML) - parseInt(betVal);
            $('#results').append(`
            <p>${turtle.name} the turtle didn't win. Better luck next time :(</p>
            <p>Your tokens went down by ${betVal}</p>
            `);
        }
    });


    // // Mammoth conditional
    // if ($(".bet")[0].value && turtles[0].position == 1) {

    //     var betVal = $(".bet")[0].value;
    //     var betWinnings = Math.ceil($(".bet")[0].value / turtles[0].odds.lower * (turtles[0].odds.upper));
    //     $('#tokens')[0].innerHTML = parseInt($('#tokens')[0].innerHTML) + parseInt(betWinnings);
    //     $('#results').append(`
    //     <p>${turtles[0].name} the turtle WON!!!!!</p>
    //     <p>You bet ${betVal} Tokens</p>
    //     <p>You won ${betWinnings} Tokens</p>
    //     `);
    // } else if ($(".bet")[0].value && turtles[0].position !== 1) {
    //     var betVal = $(".bet")[0].value;
    //     $('#tokens')[0].innerHTML = parseInt($('#tokens')[0].innerHTML) - parseInt(betVal);
    //     $('#results').append(`
    //     <p>${turtles[0].name} the turtle didn't win. Better luck next time :(</p>
    //     <p>Your tokens went down by ${betVal}</p>
    //     `);
    // } else if ($(".bet")[1].value && turtles[1].position == 1) {
    //     var betVal = $(".bet")[1].value;
    //     var betWinnings = Math.floor($(".bet")[1].value / turtles[1].odds.lower * (turtles[1].odds.upper));
    //     $('#results').append(`
    //     <p>${turtles[1].name} the turtle WON!!!!!</p>
    //     <p>You bet ${betVal} Tokens</p>
    //     <p>You won ${betWinnings} Tokens</p>
    //     `);
    // } else if ($(".bet")[2].value && turtles[2].position == 1) {
    //     var betVal = $(".bet")[2].value;
    //     var betWinnings = Math.floor($(".bet")[2].value / turtles[2].odds.lower * (turtles[2].odds.upper));
    //     $('#results').append(`
    //     <p>${turtles[2].name} the turtle WON!!!!!</p>
    //     <p>You bet ${betVal} Tokens</p>
    //     <p>You won ${betWinnings} Tokens</p>
    //     `);
    // } else if ($(".bet")[3].value && turtles[3].position == 1) {
    //     var betVal = $(".bet")[3].value;
    //     var betWinnings = Math.floor($(".bet")[3].value / turtles[3].odds.lower * (turtles[3].odds.upper));
    //     $('#results').append(`
    //     <p>${turtles[3].name} the turtle WON!!!!!</p>
    //     <p>You bet ${betVal} Tokens</p>
    //     <p>You won ${betWinnings} Tokens</p>
    //     `);
    // } else {
    //     $('#results').append(`
    //     <p>You didn't win. Better luck next time :(</p>
    //     `);
    // }
}















// Add event listener for page load
document.addEventListener('DOMContentLoaded', function () {

    // Call clear track function
    clearTrack();

    $('#tokens')[0].innerHTML = parseInt(100) + 1;



    // Call function to update turtle odds to turtle object
    setOdds();

});


// Event listener for click start race button
document.getElementById("start-race-button").addEventListener("click", function () {


    // Call set positions function
    setPositions();
    showResults(); // TEMP
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



    // Reset bet boxes ***LOOP THROUGH THIS***
    $(".bet")[0].value = '';
    $(".bet")[0].disabled = false;
    $(".bet")[1].value = '';
    $(".bet")[1].disabled = false;
    $(".bet")[2].value = '';
    $(".bet")[2].disabled = false;
    $(".bet")[3].value = '';
    $(".bet")[3].disabled = false;

    // Clear results div
    $('#results').empty();
    $('#results').append('Place your bet and good luck!');

    // Replace next race button with start race button
    document.getElementById("start-race-button").style.display = '';
    document.getElementById("next-race-button").style.display = 'none';

    setOdds();

});

// Event listener for bet box 1
$(".bet")[0].addEventListener('input', betRestrict); // Call bet restrictions function on input
// Event listener for bet box 2
$(".bet")[1].addEventListener('input', betRestrict); // Call bet restrictions function on input
// Event listener for bet box 3
$(".bet")[2].addEventListener('input', betRestrict); // Call bet restrictions function on input
// Event listener for bet box 4
$(".bet")[3].addEventListener('input', betRestrict); // Call bet restrictions function on input