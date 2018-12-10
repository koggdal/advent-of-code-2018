function main() {
  function getHighScore(input) {
    const matchGroups = input.match(
      /^(?<playerCount>\d+) players;.*?worth (?<lastMarbleScore>.*?) .*?$/
    ).groups;
    const playerCount = parseInt(matchGroups.playerCount, 10);
    const lastMarbleScore = parseInt(matchGroups.lastMarbleScore, 10);

    const circle = [0, 1];
    const scoresByPlayer = {};

    let playerIndex = 2;

    for (let i = 2, current = 1; i <= lastMarbleScore; i++) {
      if (i % 23 === 0) {
        if (!scoresByPlayer[playerIndex]) {
          scoresByPlayer[playerIndex] = 0;
        }
        let index = current - 7;
        if (index < 0) {
          index = circle.length - (Math.abs(index) % circle.length);
        }
        const removedMarble = circle.splice(index, 1);
        scoresByPlayer[playerIndex] += i + removedMarble[0];
        current = index;
      } else {
        let index = current + 2;
        if (index > circle.length) {
          index %= circle.length;
        }
        circle.splice(index, 0, i);
        current = index;
      }

      playerIndex = (playerIndex + 1) % playerCount;
    }

    let maxScore = 0;
    Object.keys(scoresByPlayer).forEach(playerIndex => {
      maxScore = Math.max(maxScore, scoresByPlayer[playerIndex]);
    });

    return maxScore;
  }

  console.clear();
  console.log(
    'Test (9 players):',
    getHighScore('9 players; last marble is worth 25 points') === 32
  );
  console.log(
    'Test (10 players):',
    getHighScore('10 players; last marble is worth 1618 points') === 8317
  );
  console.log(
    'Test (13 players):',
    getHighScore('13 players; last marble is worth 7999 points') === 146373
  );
  console.log(
    'Test (17 players):',
    getHighScore('17 players; last marble is worth 1104 points') === 2764
  );
  console.log(
    'Test (21 players):',
    getHighScore('21 players; last marble is worth 6111 points') === 54718
  );
  console.log(
    'Test (30 players):',
    getHighScore('30 players; last marble is worth 5807 points') === 37305
  );
  console.log('Result:', getHighScore(givenInput));
}

const givenInput = '477 players; last marble is worth 70851 points';

main();
