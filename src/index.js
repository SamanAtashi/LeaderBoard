import './style.css';

const urlToCreateGame = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';

// todo: ===========================================> create game
const createGame = async () => {
  const temp = await fetch(urlToCreateGame, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Saman"s game ----->',
    }),
  });
  return temp.json();
};

async function grabId() {
  const temp = await createGame();
  const gameId = temp.result.split(' ')[3];
  return gameId;
}

// todo: ===========================================> send a score + recieve

function sendScore(arg) {
  fetch(arg, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: 'Saman',
      score: 111,
    }),
  });
}

async function giveScoreUrl() {
  const temp = await grabId();
  const urlToScores = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${temp}/scores/`;

  sendScore(urlToScores);
  showScore(urlToScores);

  return urlToScores;
}

giveScoreUrl();
