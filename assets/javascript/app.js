let questions;
// let questions = [
//   {
//     "question" : "Where do kangaroos get their balance from?",
//     "choices" : [ 
//       "Their tails",
//       "Their legs",
//       "Their whole body",
//       "Their tails and legs"
//     ],
//     "hint" : "...",
//     "answer" : 0,
//     "video" : "assets/videos/lion.webm"
//   },
//   {
//     "question" : "What will happen to a goldfish if it's kept in a dark room?",
//     "choices" : [ 
//       "It will go blind",
//       "It will die",
//       "It will turn pale",
//       "It will become depressed"
//     ],
//     "hint" : "...",
//     "answer" : 2,
//     "video" : "..."
//   }
// ];

let correctCounter;
let incorrectCounter;
let unansweredCounter;

let questionIndex;

const questionDuration = 10;
const answerDuration = 3 ;
let intervalID;

$('#root').before( $('<p>Time Remaining: <span id="countdown"></span> Seconds</p>').attr('id','timer').hide() );
//$('#root').after( $('<button>').text('Start').attr('id','start') );

// $.getJSON( "assets/json/questions.json", function( data ) {
//   questions=data;
//   console.log(questions);
//   addButton('Start');
// });

$.ajax({
  url: "assets/json/questions.json"
}).then(function(data) {
  questions=data;
  addButton('Start');
});

$('.container').on('click', '#start', function() {
  $(this).remove();
  initializeGame();
  showQuestion();
});

function initializeGame () {
  correctCounter=0
  incorrectCounter=0;
  unansweredCounter=0;

  questionIndex = 0;
  $('#timer').show();
}

function showQuestion() {
  const question = questions[questionIndex]; // question object

  // reference #root
  const $root = $('#root');
  $root.empty();

  //append question
  $root.append( $('<h3>').text(question.question).attr('id', 'question') );

  //append div for choices
  const $choicesDiv = $('<div>').attr('id','choices');
  let $choice;
  $.each( question.choices, function(key, val) {
    $choice = $('<h3>').text(val).attr('data-id', key).addClass('choice'); // create and display choice
    $choicesDiv.append( $choice );
  });
  $root.append( $choicesDiv );

  let countdown = questionDuration;
  $('#countdown').text( countdown ); // display duration countdown
  intervalID = setInterval( function() {
    countdown--;
    $('#countdown').text( countdown );
    if (countdown==0) {
      //stop timer
      clearInterval( intervalID );

      showAnswer();
    }
  }, 1000);

  $($choicesDiv).on('click', '.choice', function() {
    //stop timer
    clearInterval( intervalID );

    let userChoice = $(this).attr('data-id');
    showAnswer(userChoice);
  });
}

function showAnswer(userChoice) {

  const rightAnswer = questions[questionIndex].answer;

  let msg;
  if (typeof userChoice == 'undefined') { // timeout
    msg = "Out Of Time!";
    unansweredCounter++;
  } else {
    if ( rightAnswer == userChoice ) { // correct
      msg = "Correct!";
      correctCounter++;
    } else { // incorrect
      msg = "Nope!";
      incorrectCounter++;
    }
  }

  const $root = $('#root');
  $root.empty();
  $root.append( $('<h3>').text( msg ).attr('id', 'msg') );
  if (rightAnswer != userChoice) {
    $root.append( $('<h2>')
      .text( 'The correct answer was: ' + questions[questionIndex].choices[rightAnswer])
      .attr('id', 'msg2') 
    );
  }
  $root.append( $('<video>')
    .attr('src', questions[questionIndex].video)
    .attr('autoplay', 'true')
  );


  let countdown = answerDuration;
  intervalID = setInterval( function() {
    countdown--;
    if (countdown==0) {
      // stop timer
      clearInterval( intervalID );
      // reach last question
      if (questionIndex < (questions.length-1)) {
        questionIndex++;
        showQuestion();
      } else {
        showResults();
      }
    }
  }, 1000);
}

function showResults() {
  const $root = $('#root');
  $root.empty();

  $root.append( $('<p>').text("All done, here's how you did!").attr('id','msg') );
  $root.append( $('<p>').text("Correct Answers: " + correctCounter).attr('id','msg2') );
  $root.append( $('<p>').text("Incorrect Answers: " + incorrectCounter).attr('id','msg2'));
  $root.append( $('<p>').text("Unanswered: " + unansweredCounter).attr('id','msg2') );

  //$root.after( $('<button>').text('Start Over').attr('id','start') );
  addButton('Start Over');
}

function addButton(str) {
  $('#root').after( $('<div>').text(str).attr('id','start') );
}