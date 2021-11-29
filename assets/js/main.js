// Set variable for starting progress bar width
let progressWidth = 10;
// Set variable for inner progress bar
const progress = document.getElementById("progress-inner");
// Create array of bet input boxes from box class
const bets = Object.values(document.getElementsByClassName('bet'));

// Create consolidated turtles object with position and odds key values to append with functions
const turtles = [{
        name: "",
        position: "",
        odds: "",
        racetrack: "lane-1",
        img: "assets/images/turtle-1.png alt='Turtle icon in lane 1'",
    },
    {
        name: "",
        position: "",
        odds: "",
        racetrack: "lane-2",
        img: "assets/images/turtle-2.png alt='Turtle icon in lane 2'"

    },
    {
        name: "",
        position: "",
        odds: "",
        racetrack: "lane-3",
        img: "assets/images/turtle-3.png alt='Turtle icon in lane 3'"

    },
    {
        name: "",
        position: "",
        odds: "",
        racetrack: "lane-4",
        img: "assets/images/turtle-4.png alt='Turtle icon in lane 4'"

    },
];

// Save url for turtle portraits directory in variable
let portrait = 'assets/images/turtle-portraits/turt-port-';
// Create turtle portraits array
let turtPorts = [`${portrait}1.png alt='portrait1'`,
    `${portrait}2.png alt='portrait2'`, `${portrait}3.png alt='portrait3'`, `${portrait}4.png alt='portrait4'`,
    `${portrait}5.png alt='portrait5'`, `${portrait}6.png alt='portrait6'`, `${portrait}7.png alt='portrait7'`,
    `${portrait}8.png alt='portrait8'`, `${portrait}9.png alt='portrait9'`, `${portrait}10.png alt='portrait10'`,
    `${portrait}11.png alt='portrait11'`, `${portrait}12.png alt='portrait12'`, `${portrait}13.png alt='portrait13'`,
    `${portrait}14.png alt='portrait14'`, `${portrait}15.png alt='portrait15'`, `${portrait}16.png alt='portrait16'`,
    `${portrait}17.png alt='portrait17'`, `${portrait}18.png alt='portrait18'`, `${portrait}19.png alt='portrait19'`,
    `${portrait}20.png alt='portrait20'`, `${portrait}21.png alt='portrait21'`, `${portrait}22.png alt='portrait22'`,
    `${portrait}23.png alt='portrait23'`, `${portrait}24.png alt='portrait24'`, `${portrait}25.png alt='portrait25'`,
    `${portrait}26.png alt='portrait26'`, `${portrait}27.png alt='portrait27'`, `${portrait}28.png alt='portrait28'`,
];

// Creates turtle names array
let namesArr = ['Toby', 'Tamsin', 'Tabatha', 'Thaddius', 'Thelma', 'Tim', 'Thelvin', 'Taya',
    'Tammy', 'Trevor', 'Tom', 'Ted', 'Tess', 'Tyler', 'Theo', 'Tallulah', 'Tara', 'Tianna',
    'Travis', 'Tristan', 'Theo', 'Tobias', 'Taye', 'Tayler', 'Teejay', 'Tazmin', 'Thierry', 'Tiara'
];

/** FUNCTION #1
 * Clear bets, results, turtle portraits and all turtle icons
 * from race track if any exist then assign turtles to
 * start positions
 */
function clearTrack() {
    // Empty all turtle icons from placer class divs
    var allTurts = $('.placer');
    for (let i = 0; i < allTurts.length; i++) {
        allTurts.empty();
    }

    // Define variable for all odds-box class divs
    var portPos = $('.odds-box');
    // Loop through odds-box divs and delete portraits
    for (let i = 0; i < portPos.length; i++) {
        portPos.find('img:first').remove();
    }

    // Define variable for all start-position class divs
    var startPos = $('.start-position');

    // Loop through turtles object and insert turtle icons to start positions
    for (let i = 0; i < startPos.length; i++) {
        startPos[i].insertAdjacentHTML('beforeend', `<img src=${turtles[i].img}>`);
    }
    // Loop to reset bet boxes
    for (let i = 0; i < bets.length; i++) {
        bets[i].value = '';
        bets[i].disabled = false;
    }

    // Clear results div
    $('#results').empty();
    // Append game instructions to results div
    $('#results').append(`
    <ul>
        <li>Decide which Turtle you want to bet tokens on</li>
        <li>Place the token amount in the corresponding box</li>
        <li>Click on Start Race to see which Turtle wins</li>
        <li>Click on Next Race to reset the track for a new race</li>
        <li>Win the game by reaching 1000 Tokens!</li>
        <li>Be careful not to let your Token reach 0!</li>
    </ul>
    `);

    // Replace next race button with start race button
    document.getElementById("start-race-button").style.display = '';
    document.getElementById("next-race-button").style.display = 'none';

}

/** FUNCTION #2
 * Function to randomise the positions of an
 * array passed in as an argument
 */
 function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/** FUNCTION #3
 * Generate random turtle names and portraits from
 * respective arrays and insert into HTML
 */
function createTurts() {

    // Define variable for all odds-box class divs
    var portPos = $('.odds-box');

    shuffle(turtPorts); // Call shuffle function on turtPorts array

    // Loop through odds-box divs and insert portraits
    for (let i = 0; i < portPos.length; i++) {
        portPos[i].insertAdjacentHTML('afterbegin', `<img src=${turtPorts[i]}>`);
    }

    shuffle(namesArr); // Call shuffle function on names array

    // Loop through turtles object and set turtle names from the shuffled array
    turtles.forEach((turtle, index) => {
        var name = namesArr[index];
        turtle.name = name;
    });

    // Define variable for all paragraphs with turt-name class
    var turtNames = $('.turt-name');
    // Loop through all turt-name paragraphs and insert new names from the updated turtles object
    for (let i = 0; i < turtNames.length; i++) {
        turtNames[i].innerHTML = '';
        turtNames[i].insertAdjacentHTML('beforeend', `<p>${turtles[i].name}</p>`);
    }

}

/** FUNCTION #4
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
        // Conditional statement to prevent divisible odds with exception of 1/1 
        if (upperRandom % lowerRandom == 0 && (upperRandom !== 1 && lowerRandom !== 1)) {
            upperRandom = Math.floor((Math.random() * 20) + 1);
            lowerRandom = Math.floor((Math.random() * 3) + 1);
        } else {
            // Push the odds as objects into the empty oddsArr array
            oddsArr.push({
                upper: upperRandom,
                lower: lowerRandom,
            });
        }
    }
    while (oddsArr.length < 4);

    // Loop to update odds in turtle object from the odds array above
    for (let i in turtles) {
        if (turtles.hasOwnProperty(i)) {
            turtles[i].odds = oddsArr[i];
        }
    }

    // Empty current turtle odds
    let loadOdds = $('.odds').empty();
    // Loop through odds divs and append odds from turtles object
    for (let i = 0; i < loadOdds.length; i++) {
        loadOdds[i].append(turtles[i].odds.upper + '/' + turtles[i].odds.lower);
    }
}

/** FUNCTION #5
 * Calculate turtle weights from the odds generated
 * in the above function and from them, set the turtle
 * icon finishing positions
 */
function setPositions() {
    // Define an empty array to insert weighted odds
    let weightsArr = [];

    // Loop through turtles to calculate odds weights
    for (let i in turtles) {
        if (turtles.hasOwnProperty(i)) {
            let weights = Math.floor((100 / turtles[i].odds.upper) * turtles[i].odds.lower);

            // Loop to push number of turtle names to weights array based on odds weights
            let j = 0;
            while (j < weights) {
                weightsArr.push(turtles[i].name);
                j++;
            }
        }
    }

    shuffle(weightsArr); // Call shuffle function on weights array

    // Define variable for each turtle final position
    let finalPositions = 1;

    // Loop throigh all 4 turtles
    while (finalPositions < 5) {
        // Loop to set final positions of turtles by taking first turtle from weights array
        for (let i in turtles) {
            // Conditional statement to determine turtle positions sequence
            if (weightsArr[0] === turtles[i].name) {
                // Assign turtle position
                turtles[i].position = finalPositions;
                // Filter the assigned turtle from the weights array
                weightsArr = weightsArr.filter(each => each != weightsArr[0]);
                // Repeat for next turtle
                finalPositions++;
            }
        }
    }
}

/** FUNCTION #6
 * Disable bet inputs and empty the turtle start positions
 * then append turtle icons to their final positions determined
 * by the previous function
 */
function startRace() {
    // Empty start positions
    $('#start-position-1').empty();
    $('#start-position-2').empty();
    $('#start-position-3').empty();
    $('#start-position-4').empty();

    // Append turtle icon positions to html
    $(`#lane-1-position-${turtles[0].position}`).append(`<img src=${turtles[0].img}>`);
    $(`#lane-2-position-${turtles[1].position}`).append(`<img src=${turtles[1].img}>`);
    $(`#lane-3-position-${turtles[2].position}`).append(`<img src=${turtles[2].img}>`);
    $(`#lane-4-position-${turtles[3].position}`).append(`<img src=${turtles[3].img}>`);

    // Replace start race button with next race button
    document.getElementById("start-race-button").style.display = 'none';
    document.getElementById("next-race-button").style.display = '';

    // Loop to disable all bet inputs
    for (let i = 0; i < $(".bet").length; i++) {
        $(".bet")[i].disabled = true;
    }
}

/** FUNCTION #7
 * Restrict betting to one input box and prevent
 * certain values from being entered
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

/** FUNCTION #8
 * Declare results of race in results box and
 * inform user of tokens gained/lost, then update token values
 */
function showResults() {

    // Clear results div
    $('#results').empty();

    // Loop to declare race winner
    turtles.forEach(function (arrayItem) {
        // Conditional to find position 1 from turtles object
        if (arrayItem.position == 1) {
            $('#results').append(`
        <p style="font-size: 2em;">${arrayItem.name} won the race!</p>`);
        }
    });
    // Loop to iterate through both bet values and turtle positions
    // then insert template literal informing user of token gains/losses 
    turtles.forEach((turtle, index) => {

        // Create an array of values from bet class object and save in variable
        var bets = Object.values(document.getElementsByClassName('bet'))[index];
        // Variable for user bet input
        var betVal = bets.value;
        // Variable for holding bet winnings calculation
        var betWinnings = Math.ceil(bets.value / turtle.odds.lower * (turtle.odds.upper));
        // Variable containing the tokens value paragraph which will be used with shake effect
        var wrapper = document.querySelector('#tokens-wrapper');

        // Conditional statement to find winner and insert relevant template literal
        if (bets.value && turtle.position == 1) {

            // Update tokens span with winnings
            $('#tokens')[0].innerHTML = parseInt($('#tokens')[0].innerHTML) + parseInt(betWinnings);
            // Update variable for progress bar width
            progressWidth = progressWidth + (betWinnings / 10);
            // Apply new progress bar width to progress css style
            progress.style.width = progressWidth + '%';
            // Add/remove class to tokens wrapper to simulate shake effect within css
            wrapper.classList.add('shake', 'green');
            setTimeout(function () {
                wrapper.classList.remove('shake', 'green');
            }, 1000);
            // Update results box with race result and tokens won/lost
            $('#results').append(`
            <p>YOU WON!!!!!</p>
            <p>You bet ${betVal} Tokens and won ${betWinnings} Tokens</p>
            `);
            // Conditional statement to find losers and insert relevant template literal
        } else if (bets.value && turtle.position !== 1) {
            // Update tokens span with tokens lost
            $('#tokens')[0].innerHTML = parseInt($('#tokens')[0].innerHTML) - parseInt(betVal);
            // Update variable for progress bar width
            progressWidth = progressWidth - (betVal / 10);
            // Apply new progress bar width to progress css style
            progress.style.width = progressWidth + '%';
            // Add/remove class to tokens wrapper to simulate shake effect within css
            wrapper.classList.add('shake', 'red');
            setTimeout(function () {
                wrapper.classList.remove('shake', 'red');
            }, 1000);
            $('#results').append(`
            <p>${turtle.name} the turtle didn't win. Better luck next time!</p>
            <p>Your tokens went down by ${betVal}</p>
            `);
        }

        // Update progress tokens span
        $('#tokens-dup')[0].innerHTML = $('#tokens')[0].innerHTML;

        // Conditional statement for grammar correction (Race/s plural)
        if ($('#counter')[0].innerHTML == 1) {
            $('#races')[0].innerHTML = ' Race';
        } else {
            $('#races')[0].innerHTML = ' Races';
        }
    });
}

/** FUNCTION #9
 * Display modal dialogs if user runs out of tokens (loses game)
 * or reaches 1000 or more tokens (wins game)
 */
function checkWinLose() {
    // Conditional logic to show Win and Lose game modals
    if ($('#tokens')[0].innerHTML >= 1000) {
        // Show winning modal dialog
        $('#myModal').modal('show');
        $('#game-modal-title')[0].innerHTML = "Reached 1000+ Tokens!";
        $('#game-modal-body')[0].innerHTML = "YOU WON THE GAME!!!";
    } else if ($('#tokens')[0].innerHTML < 1) {
        // Show losing modal dialog
        $('#myModal').modal('show');
        $('#game-modal-title')[0].innerHTML = "You ran out of Tokens";
        $('#game-modal-body')[0].innerHTML = "Restart the game and try again!";
    }
}

/** FUNCTION #10
 * Initiate game after conditional input
 * check in bet boxes with alert
 */
function triggerGame() {
    // Conditional statement to prevent starting race without input from user
    if (((bets[0].value.length < 1) &&
            (bets[1].value.length < 1) &&
            (bets[2].value.length < 1) &&
            (bets[3].value.length < 1))) {
        alert('YOU MUST PLACE A BET BEFORE THE RACE CAN START!');
    } else {
        // Initiate game
        $('#counter')[0].innerHTML++; // Increment race counter
        setPositions(); // Call set positions function
        startRace(); // Call start race function
        showResults(); // Call show results function
        checkWinLose(); // Call check win/lose function
    }
}

// Add event listener for page load
document.addEventListener('DOMContentLoaded', function () {

    clearTrack(); // Call clear track function

    createTurts(); // Call create turtles function

    setOdds(); // Call set odds function

});

// Event listener for click start race button
document.getElementById("start-race-button").addEventListener("click", function () {
    triggerGame(); // Initiate game with trigger game function
});

// Loop to add keydown enter event listener to all bet input boxes
for (let i = 0; i < document.getElementsByClassName("bet").length; i++) {
    document.getElementsByClassName("bet")[i].addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            triggerGame(); // Initiate game with trigger game function
        }
    });
}

// Event listener for click next race button
document.getElementById("next-race-button").addEventListener("click", function () {

    clearTrack(); // Call clear track function

    createTurts(); // Call create turtles function

    setOdds(); // Call set odds function

});

// Event listener loop for bet boxes
for (let i = 0; i < bets.length; i++) {
    bets[i].addEventListener('input', betRestrict); // Call bet restrictions function on input
}

// Event listener for restart button on modal
document.getElementById("restart").addEventListener("click", function () {
    // Close modal on restart button click
    $('#myModal').modal('hide');
});

// Close modal event handler to reset game
$('#myModal').on('hide.bs.modal', function () {

    clearTrack(); // Call clear track function

    createTurts(); // Call create turtles function

    // Reset tokens
    $('#tokens')[0].innerHTML = 100;
    $('#tokens-dup')[0].innerHTML = $('#tokens')[0].innerHTML;

    // Reset counter
    $('#counter')[0].innerHTML = 0;

    // Reset progress bar
    progressWidth = 10;
    progress.style.width = progressWidth + '%';

    setOdds(); // Call set odds function
});