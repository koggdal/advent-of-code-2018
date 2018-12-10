function main() {
  function logCircle(circle) {
    const values = [];
    let item = circle.get(0);
    let i = 0;
    while (true) {
      values.push(item.value);
      item = item.next;
      if (item === circle.get(0)) {
        break;
      }
    }
    console.log(values);
  }
  function getHighScore(input) {
    const matchGroups = input.match(
      /^(?<playerCount>\d+) players;.*?worth (?<lastMarbleScore>.*?) .*?$/
    ).groups;
    const playerCount = parseInt(matchGroups.playerCount, 10);
    const lastMarbleScore = parseInt(matchGroups.lastMarbleScore, 10);

    let circle = new Map();
    const item1 = { value: 0 };
    const item2 = { value: 1 };
    item1.prev = item2;
    item1.next = item2;
    item2.prev = item1;
    item2.next = item1;
    circle.set(0, item1);
    circle.set(1, item2);
    let current = item2;

    const scoresByPlayer = {};
    let playerIndex = 2;

    for (let i = 2; i <= lastMarbleScore; i++) {
      if (i % 23 === 0) {
        if (!scoresByPlayer[playerIndex]) {
          scoresByPlayer[playerIndex] = 0;
        }
        let item = current;
        for (let j = 0; j < 7; j++) {
          item = item.prev;
        }
        circle.delete(item.value);
        item.prev.next = item.next;
        item.next.prev = item.prev;
        scoresByPlayer[playerIndex] += i + item.value;
        current = item.next;
      } else {
        const item = { value: i };
        const prev = current.next;
        const next = current.next.next;
        prev.next = item;
        next.prev = item;
        item.prev = prev;
        item.next = next;
        current = item;
        circle.set(i, item);
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

const givenInput = '477 players; last marble is worth 7085100 points';

main();
