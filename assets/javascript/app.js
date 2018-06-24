
const questionDuration = 5;
const answerDuration = 3 ;
let intervalID;
let questionCounter = 0;
let questionTotal = 2

$('#start').on('click', function() {
  initializeGame();
  showQuestion();
});

function initializeGame () {
  questionCounter = 0;
}

function showQuestion() {
  let countdown = questionDuration;
  $('#countdown').text( countdown );
  intervalID = setInterval( function() {
    countdown--;
    $('#countdown').text( countdown );
    if (countdown==0) {
      clearInterval( intervalID );
      showAnswer();
    }
  }, 1000);
}

function showAnswer() {
  let countdown = answerDuration;
  $('#countdown').text( 'Answer ' + questionCounter );
  intervalID = setInterval( function() {
    countdown--;
    //$('#countdown').text( countdown );
    if (countdown==0) {
      clearInterval( intervalID );
      if (questionCounter < questionTotal) {
        questionCounter++;
        showQuestion();
      }
    }
  }, 1000);
}
