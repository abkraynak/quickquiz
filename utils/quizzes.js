const quizzes = [];

function addQuiz(id, title) {
    const quiz = { id, title };
    quizzes.push(quiz);
    
}

function getQuiz(id) {
    res = quizzes.find(quiz => quiz.id === id);
    if(res === undefined) {
        res = {id: 'null', title: 'This room doesn\'t have a quiz'}
    }
    console.log(res);
    return res;
}

module.exports = { addQuiz, getQuiz }