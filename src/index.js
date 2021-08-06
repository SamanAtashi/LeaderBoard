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
