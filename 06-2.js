function main() {
  function getSizeOfRegion(input, { maxDistance }) {
    const coordinates = input.split('\n').map(line => {
      const values = line.split(', ');
      return { x: parseInt(values[0], 10), y: parseInt(values[1], 10) };
    });
    const sortedByX = coordinates.slice().sort((a, b) => a.x - b.x);
    const sortedByY = coordinates.slice().sort((a, b) => a.y - b.y);
    const left = sortedByX[0].x;
    const right = sortedByX[sortedByX.length - 1].x;
    const top = sortedByX[0].x;
    const bottom = sortedByY[sortedByY.length - 1].y;

    let areaSize = 0;

    for (let y = top; y <= bottom; y++) {
      for (let x = left; x <= right; x++) {
        const distanceSum = coordinates.reduce((sum, coordinate) => {
          return sum + getManhattanDistance({ x, y }, coordinate);
        }, 0);

        if (distanceSum < maxDistance) {
          areaSize++;
        }
      }
    }

    return areaSize;
  }

  function getManhattanDistance(pointA, pointB) {
    return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y);
  }

  console.clear();
  console.log(
    'Test:',
    getSizeOfRegion(
      `
  1, 1
  1, 6
  8, 3
  3, 4
  5, 5
  8, 9
  `.trim(),
      { maxDistance: 32 }
    ) === 16
  );
  console.log('Result:', getSizeOfRegion(givenInput, { maxDistance: 10000 }));
}

const givenInput = `
292, 73
204, 176
106, 197
155, 265
195, 59
185, 136
54, 82
209, 149
298, 209
274, 157
349, 196
168, 353
193, 129
94, 137
177, 143
196, 357
272, 312
351, 340
253, 115
109, 183
252, 232
193, 258
242, 151
220, 345
336, 348
196, 203
122, 245
265, 189
124, 57
276, 204
309, 125
46, 324
345, 228
251, 134
231, 117
88, 112
256, 229
49, 201
142, 108
150, 337
134, 109
288, 67
297, 231
310, 131
208, 255
246, 132
232, 45
356, 93
356, 207
83, 97
`.trim();

main();
