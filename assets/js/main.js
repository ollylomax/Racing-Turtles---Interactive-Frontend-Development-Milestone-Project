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


console.log(oddsArr);

function updateOddsAgainstTurtle() {
    for (let l in turtles) {
        turtles[l].odds = oddsArr[l]
        console.log(turtles[l].odds)
    };
}



// Function to randomise the sequence of an array passed in as an argument
function randomSeq(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
};







// Add event listener for page load
document.addEventListener('DOMContentLoaded', function () {

    // Array of Turtle images
    var turtleArray = [
        `assets/images/turtle-1.png`,
        'assets/images/turtle-2.png',
        'assets/images/turtle-3.png',
        `assets/images/turtle-4.png`
    ];

    // Define variable as an object for all .start-position divs
    var startPos = $('.start-position');

    // Loop through the start positions object and the turtle array, 
    // appending the images to the divs
    for (let i = 0; i < startPos.length; i++) {
        startPos[i].insertAdjacentHTML('beforeend', `<img src="${turtleArray[i]}">`);
    }

    $('#tokens')[0].innerHTML = 100;

    // $(`#lane-1-odds`).append(`<p>${turtles[0].odds.upper}/${turtles[0].odds.lower}</p>`)
    // $(`#lane-2-odds`).append(`<p>${turtles[1].odds.upper}/${turtles[1].odds.lower}</p>`)
    // $(`#lane-3-odds`).append(`<p>${turtles[2].odds.upper}/${turtles[2].odds.lower}</p>`)
    // $(`#lane-4-odds`).append(`<p>${turtles[3].odds.upper}/${turtles[3].odds.lower}</p>`)

    // Call function to update turtle odds to turtle object
    updateOddsAgainstTurtle()
    // Loop through odds divs and append odds from turtles object
    var loadOdds = $('.odds');
    for (let i = 0; i < loadOdds.length; i++) {
        loadOdds[i].append(turtles[i].odds.upper + '/' + turtles[i].odds.lower);
    }
});