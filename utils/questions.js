var questions = [];
var unseenQuestions = [];

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

addQuestionToQuiz('1004', 
    'abc123', 
    'A server can communicate to multiple clients at once using TCP.', 
    [   'True', 
        'False' ], 
    'False' );

addQuestionToQuiz('1005', 
    'abc123', 
    'IPv6 src and dst addresses are how long?', 
    [   '32 bits', 
        '32 bytes',
        '64 bytes',
        '128 bits' ], 
    '128 bites' );

addQuestionToQuiz('1006', 
    '987xyz', 
    'How do you delete a table?', 
    [   'DELETE TABLE TableName;', 
        'DROP TABLE TableName;',
        'DELETE FROM TableName;',
        'REMOVE ALL DATA FROM TableName' ], 
    'DROP TABLE TableName;' );

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
}

module.exports = { addQuestionToQuiz, getQuestionsForQuiz, resetQuestions }