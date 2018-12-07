function main() {
  function getOrderOfSteps(input) {
    const instructions = input.split('\n');
    const dependenciesByStep = new Map();

    instructions.forEach(instruction => {
      const { step, dependency } = instruction.match(
        /^Step (?<step>[A-Z]).*?step (?<dependency>[A-Z])/
      ).groups;
      if (!dependenciesByStep.has(step)) {
        dependenciesByStep.set(step, new Set());
      }
      if (!dependenciesByStep.has(dependency)) {
        dependenciesByStep.set(dependency, new Set());
      }
      dependenciesByStep.get(dependency).add(step);
    });

    const availableSteps = [];
    const stepsDone = [];

    function updateAvailableSteps() {
      dependenciesByStep.forEach((dependencies, step) => {
        let dependencyCount = 0;
        dependencies.forEach(dependency => {
          if (!stepsDone.includes(dependency)) {
            dependencyCount++;
          }
        });
        if (
          dependencyCount === 0 &&
          !stepsDone.includes(step) &&
          !availableSteps.includes(step)
        ) {
          availableSteps.push(step);
        }
      });

      availableSteps.sort((a, b) => a.localeCompare(b));
    }

    function runNextAvailableStep() {
      stepsDone.push(availableSteps.shift());
      updateAvailableSteps();

      if (availableSteps.length > 0) {
        runNextAvailableStep();
      }
    }

    updateAvailableSteps();
    runNextAvailableStep();

    return stepsDone.join('');
  }

  console.clear();
  console.log(
    'Test:',
    getOrderOfSteps(
      `
Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.
    `.trim()
    ) === 'CABDFE'
  );
  console.log('Result:', getOrderOfSteps(givenInput));
}

const givenInput = `
Step A must be finished before step N can begin.
Step P must be finished before step R can begin.
Step O must be finished before step T can begin.
Step J must be finished before step U can begin.
Step M must be finished before step X can begin.
Step E must be finished before step X can begin.
Step N must be finished before step T can begin.
Step W must be finished before step G can begin.
Step Z must be finished before step D can begin.
Step F must be finished before step Q can begin.
Step U must be finished before step L can begin.
Step I must be finished before step X can begin.
Step X must be finished before step Y can begin.
Step D must be finished before step Y can begin.
Step S must be finished before step K can begin.
Step C must be finished before step G can begin.
Step K must be finished before step V can begin.
Step B must be finished before step R can begin.
Step Q must be finished before step L can begin.
Step T must be finished before step H can begin.
Step H must be finished before step G can begin.
Step V must be finished before step L can begin.
Step L must be finished before step R can begin.
Step G must be finished before step Y can begin.
Step R must be finished before step Y can begin.
Step G must be finished before step R can begin.
Step X must be finished before step V can begin.
Step V must be finished before step Y can begin.
Step Z must be finished before step U can begin.
Step U must be finished before step R can begin.
Step J must be finished before step Y can begin.
Step Z must be finished before step C can begin.
Step O must be finished before step L can begin.
Step C must be finished before step H can begin.
Step V must be finished before step G can begin.
Step F must be finished before step K can begin.
Step Q must be finished before step G can begin.
Step S must be finished before step Q can begin.
Step M must be finished before step G can begin.
Step T must be finished before step L can begin.
Step C must be finished before step Q can begin.
Step T must be finished before step V can begin.
Step W must be finished before step Z can begin.
Step C must be finished before step K can begin.
Step I must be finished before step C can begin.
Step X must be finished before step Q can begin.
Step F must be finished before step X can begin.
Step J must be finished before step S can begin.
Step I must be finished before step K can begin.
Step U must be finished before step Q can begin.
Step I must be finished before step Q can begin.
Step N must be finished before step H can begin.
Step A must be finished before step T can begin.
Step T must be finished before step G can begin.
Step D must be finished before step T can begin.
Step A must be finished before step X can begin.
Step D must be finished before step G can begin.
Step C must be finished before step T can begin.
Step W must be finished before step Q can begin.
Step W must be finished before step K can begin.
Step V must be finished before step R can begin.
Step H must be finished before step R can begin.
Step F must be finished before step H can begin.
Step F must be finished before step V can begin.
Step U must be finished before step T can begin.
Step K must be finished before step H can begin.
Step B must be finished before step T can begin.
Step H must be finished before step Y can begin.
Step J must be finished before step Z can begin.
Step B must be finished before step Y can begin.
Step I must be finished before step V can begin.
Step W must be finished before step V can begin.
Step Q must be finished before step R can begin.
Step I must be finished before step S can begin.
Step E must be finished before step H can begin.
Step J must be finished before step B can begin.
Step S must be finished before step G can begin.
Step E must be finished before step S can begin.
Step N must be finished before step I can begin.
Step Z must be finished before step F can begin.
Step E must be finished before step I can begin.
Step S must be finished before step B can begin.
Step D must be finished before step L can begin.
Step Q must be finished before step T can begin.
Step Q must be finished before step H can begin.
Step K must be finished before step Y can begin.
Step M must be finished before step U can begin.
Step U must be finished before step K can begin.
Step W must be finished before step I can begin.
Step J must be finished before step W can begin.
Step K must be finished before step T can begin.
Step P must be finished before step Y can begin.
Step L must be finished before step G can begin.
Step K must be finished before step B can begin.
Step I must be finished before step Y can begin.
Step U must be finished before step B can begin.
Step P must be finished before step O can begin.
Step O must be finished before step W can begin.
Step O must be finished before step J can begin.
Step A must be finished before step J can begin.
Step F must be finished before step G can begin.
`.trim();

main();
