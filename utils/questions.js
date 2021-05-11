const questions = [];

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
    console.log(question);
    questions.push(question);
}

function getQuestionsForQuiz(qz_id) {
    result = questions.find(question => question.qz_id == qz_id);
    if(result === undefined) {
        result = { qn_id: 'null', qz_id: qz_id, title: 'This quiz doesn\'t have any questions', answers: 'null' }
    }
    console.log(result);
    return result;
}

module.exports = { addQuestionToQuiz, getQuestionsForQuiz }