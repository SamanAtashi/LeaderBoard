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
