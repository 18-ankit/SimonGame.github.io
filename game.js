
var buttonColours = [ "red", "blue", "green", "yellow" ];

var gamePattern = [];

var userClikedPattern = [];


var started = false;

var level = 0;


$( document ).keypress( function () { 

    if ( !started ) {
        $( "#level-title" ).text( "Level " + level );
        nextSequence();
        started = true;
    }
} );


function animatePress (currentColour) {
    
    $( "#" + currentColour ).addClass( "pressed" );

    setTimeout( function () { 
    $( "#" + currentColour ).removeClass( "pressed" );   
    }, 100 );

}

$( ".btn" ).click( function () {

    var userChosenColour = $( this ).attr( "id" );
    userClikedPattern.push( userChosenColour );

    playSound( userChosenColour );
    animatePress( userChosenColour );
    
    checkAnswer( userClikedPattern.length - 1 );

} );
 

function checkAnswer ( currentLevel ) {
    
    if ( gamePattern[ currentLevel ] === userClikedPattern[ currentLevel ] ) {

        if ( userClikedPattern.length === gamePattern.length ) {

            setTimeout( function () { 
            nextSequence();
            }, 1000 );
            
        }
    }
    else {
        playSound( "wrong" );

        $( "body" ).addClass( "game-over" );
        $( "#level-title" ).text( "Game Over, Press Any Key to Restart" );

        setTimeout( function () {
          $( "body" ).removeClass( "game-over" );  
        }, 200 );
        
        
        
        startOver();
    }

}

function startOver () {

    level = 0;
    gamePattern = [];
    started = false;
}


function nextSequence () {
    
    userClikedPattern = [];

    level++;

    $( "#level-title" ).text( "Level " + level );

    var randomNumber = Math.floor( Math.random() * 4 );
    var randomChosenColour = buttonColours[ randomNumber ];
    gamePattern.push( randomChosenColour );
    
    $( "#" + randomChosenColour ).fadeIn( 100 ).fadeOut( 100 ).fadeIn( 100 );
    playSound( randomChosenColour );

}


function playSound ( name ) {
    var audio = new Audio( "./" + name + ".mp3" );
        audio.play();
}