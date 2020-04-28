const sum = (num1, num2) => num1 + num2;

const mul = (num1, num2) => num1 * num2;

const halt = (num1, num2) => NaN;

const skip = (num1, num2) => {
  return undefined;
}

const decideOperator = function (opcode) {
  const operatorLookup = {
    "1": sum,
    "2": mul,
    "99": halt
  }

  const operator = operatorLookup[opcode];
  if (operator === undefined) {
    return skip;
  }
  return operator;
}

const getInstruction = function (memory, address, instructionLength) {
  const instruction = {opcode: NaN, parameters: []};
  let instructionPointer = 0;
  instruction.opcode = +memory[address + instructionPointer];
  instructionPointer++;
  if (instruction.opcode == 99) {
    instruction.parameters = [];
    return instruction;
  }
  while (instructionPointer < instructionLength) {
    instruction.parameters.push(+memory[address + instructionPointer]);
    instructionPointer++;
  }
  return instruction;
}

const completeInstruction = function (instruction, memory) {
  const firstInput = +memory[instruction.parameters[0]];
  const secondInput = +memory[instruction.parameters[1]];
  const outputPos = +instruction.parameters[2];
  const operator = decideOperator(instruction.opcode);
  const result = operator(firstInput, secondInput);
  if (!result) {
    return true;
  }
  if (result != undefined || result != NaN) {
    memory[outputPos] = result;
  }
  return false;
}

const solveCode = function (memory) {
  const instructionLength = 4;
  const numOfInstructions = Math.floor(memory.length / instructionLength);
  let instructionNum = 0;
  let instruction;
  let address;
  while (instructionNum <= numOfInstructions) {
    address = instructionNum * instructionLength;
    instruction = getInstruction(memory.join(",").split(","), address, instructionLength);
    const isHalt = completeInstruction(instruction, memory);
    if (isHalt) {
      return memory;
    }
    instructionNum++;
  }
  return memory;
}

module.exports = {solveCode};