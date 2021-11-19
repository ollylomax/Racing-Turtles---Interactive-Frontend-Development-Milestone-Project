// Create consolidated turtles object with some empty key values to append later
let turtles = [
    {
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

});