const quizzes = [];

addQuiz('abc123', 'Client-Server Networking Review');
addQuiz('987xyz', 'SQL Databases');
addQuiz('123abc', 'Python Programming');

function addQuiz(id, title) {
    const quiz = { id, title };
    quizzes.push(quiz);
}

function getQuiz(id) {
    result = quizzes.find(quiz => quiz.id === id);
    if(result === undefined) {
        result = { id: 'null', title: 'This room doesn\'t have a quiz' }
    }
    return result;
}

module.exports = { addQuiz, getQuiz }