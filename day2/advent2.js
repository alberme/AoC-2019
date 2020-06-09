const util = require("../util");

let instructions = util.readPuzzle("./puzzle.txt", ",");
let ip = 0; // instruction pointer
let done = false;
/*
op 1: adds two params
op 2: multiplies two params
*/
let opcodes = {
  1: { // add
    exec: (params) => {
      instructions[params[2]] = instructions[params[0]] + instructions[params[1]]     
    }
  }, 
  2: {
    exec: (params, modes) => { // multiply
      instructions[params[2]] = instructions[params[0]] * instructions[params[1]]
    }
  }, 
  99: {
    exec: (params) => "exit"
  }
}

function reset() {
  ip = 0;
  done = false;
  instructions = util.readPuzzle("./puzzle.txt", ",");
}

function run() {
  while (!done) {
    if (ip > instructions.length) {
      console.warn('warning: went through all instructions without hitting 99, exiting');
      done = true;
    } else {
      let params = instructions.slice(ip + 1, ip + 4);
      done = opcodes[instructions[ip]].exec(params) === "exit" ? true : false;
      ip += !done ? 4 : 0;
    }
  }
}
// part 1
instructions[1] = 12;
instructions[2] = 2;
run();
console.log(instructions[0]);

// part 2
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    reset();
    instructions[1] = i;
    instructions[2] = j;
    run();
    if (instructions[0] === 19690720) {
      console.log(`100 * ${i} + ${j} = ${100 * i + j}`);
      break;
    }
  }
}