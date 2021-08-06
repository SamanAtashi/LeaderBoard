import './style.css';

const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';

// todo: ===========================================> create game
async function postGame() {
  const temp = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: '<----- Saman"s game ----->',
    }),
  });
  return temp.json();
}

async function separateGameId(arg) {
  const temp = arg.result.split(' ')[3];
  return temp;
}

async function whenStart() {
  const gameCreated = await postGame();
  const seperatedIdPromise = separateGameId(gameCreated);
  return seperatedIdPromise;
}

const gameIdPromise = whenStart();

async function getScore() {
  const currentId = await gameIdPromise;
  const temp = await fetch(`${baseUrl}${currentId}/scores/`);
  return temp.json();
}
// todo: ===========================================> get score

const refBtn = document.getElementById('refreshBtn');

function makeDomElement(name, score) {
  const createLi = document.createElement('li');
  const createP = document.createElement('p');
  createP.innerHTML = `${name}:${score}`;
  createLi.appendChild(createP);
  document.getElementById('scoreList').appendChild(createLi);
}

async function iterateList(list) {
  const temp = await list;
  document.getElementById('scoreList').innerHTML = '';
  temp.result.forEach((ele) => {
    makeDomElement(ele.user, ele.score);
  });
}

refBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const listPromise = getScore();
  iterateList(listPromise);
});

// todo: ===========================================> add to score

async function sendScore(userName, userScore) {
  const currentId = await gameIdPromise;
  const temp = await fetch(`${baseUrl}${currentId}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: userName,
      score: userScore,
    }),
  });
  return temp;
}

function submitFunction() {
  const getYourName = document.getElementById('userName').value;
  const getYourScore = document.getElementById('userScore').value;
  sendScore(getYourName, getYourScore);
  document.getElementById('userName').value = '';
  document.getElementById('userScore').value = '';
}

document.querySelector('#submitBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  submitFunction();
});
