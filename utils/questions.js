const questions = [];



function addQuestionToQuiz(qn_id, qz_id, title, answers) {
    const question = { qn_id, qz_id, title, answers };
    questions.push(question);
}

function getQuestionsForQuiz(qz_id) {
    result = questions.find(question => question.qz_id == qz_id);
    if(result === undefined) {
        result = { qn_id: 'null', qz_id: 'null', title: 'This quiz doesn\'t have any questions', answers: 'null' }
    }
    return result;
}

module.exports = { addQuestionToQuiz, getQuestionsForQuiz }