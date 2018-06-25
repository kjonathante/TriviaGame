let questions = [
  {
    "question" : "Where do kangaroos get their balance from?",
    "choices" : [ 
      "Their tails",
      "Their legs",
      "Their whole body",
      "Their tails and legs"
    ],
    "hint" : "...",
    "answer" : 1,
    "video" : "..."
  }
];


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

  const question = questions[questionCounter]; // question object
  const answer = question.answer;

  $('#question').text( question.question);
  const $choicesDiv = $('#choices');
  let $choice;
  $.each( question.choices, function(key, val) {
    $choice = $('<h3>').text(val).attr('data-id', key).addClass('choice');
    $choicesDiv.append( $choice );
    console.log(key, val);
  });

  $('#countdown').text( countdown );
  // intervalID = setInterval( function() {
  //   countdown--;
  //   $('#countdown').text( countdown );
  //   if (countdown==0) {
  //     clearInterval( intervalID );
  //     showAnswer();
  //   }
  // }, 1000);

  $($choicesDiv).on('click', '.choice', function() {
    console.log(this);
    console.log(answer);
  });
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
