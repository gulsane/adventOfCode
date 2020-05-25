class ComputerProgramme {
  constructor (memory) {
    this.memory = memory;
  }

  run() {
    let address = 0;
    let opcode = this.memory[address];
    let firstInputPos, secondInputPos, outputPos;

    while (opcode != 99 && address <= this.memory.length) {
      firstInputPos = this.memory[address + 1];
      secondInputPos = this.memory[address + 2];
      outputPos = this.memory[address + 3];

      switch (opcode) {
        case 1: this.memory[outputPos] = this.memory[firstInputPos] + this.memory[secondInputPos];
          break;
        case 2: this.memory[outputPos] = this.memory[firstInputPos] * this.memory[secondInputPos];
        default:
          break;
      }
      address += 4;
      opcode = this.memory[address];
    }
  }

  getMemoryValue(address) {
    return this.memory[address];
  }
}

module.exports = {ComputerProgramme};