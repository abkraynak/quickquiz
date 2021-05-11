var questions = [];
var unseenQuestions = [];

pos = 0;

addQuestionToQuiz('1001', 
    'abc123', 
    'What does HTTP stand for?', 
    [   'Hyper Text Transfer Protocol', 
        'Hyper Text Transport Platform', 
        'Hydro Type Transfer Protocol' ], 
    'Hyper Text Transfer Protocol' );

addQuestionToQuiz('1002', 
    'abc123', 
    'UDP guarentees the delivery of all messages sent.', 
    [   'True', 
        'False' ], 
    'False' );

addQuestionToQuiz('1003', 
    '987xyz', 
    'Which is a valid SQL statment?', 
    [   'True', 
        'False' ], 
    'False' );


function addQuestionToQuiz(qn_id, qz_id, title, choices, answer) {
    const question = { qn_id, qz_id, title, choices, answer };
    questions.push(question);
    unseenQuestions.push(question);
}

function getQuestionsForQuiz(qz_id) {
    const index = unseenQuestions.findIndex(question => question.qz_id == qz_id);
    if(index !== -1) {
        return unseenQuestions.splice(index, 1)[0];
    }
}

function resetQuestions() {
    unseenQuestions = questions.slice(0);
    console.log('reset questions');
}

module.exports = { addQuestionToQuiz, getQuestionsForQuiz, resetQuestions }