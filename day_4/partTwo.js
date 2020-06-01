const range = `108457-562041`.split("-");

const isIncreasing = function (string) {
  const digits = string.split("");
  return digits.every((digit, index) => index === 0 || +digit >= +digits[index - 1]);
}

const hasGroupOfOnlyTwo = function(string) {
  return (string.match(/(\d)\1+/g) || []).map(sequence => sequence.length).includes(2)
}

const isPossiblePassword = function(password){
  const string = password.toString();
  return isIncreasing(string) && hasGroupOfOnlyTwo(string);
}

const getPossiblePasswords = function (lowerLimit, upperLimit) {
  const possiblePasswords = [];
  for (; lowerLimit < upperLimit; lowerLimit++) {
    if (isPossiblePassword(lowerLimit)) {
      possiblePasswords.push(lowerLimit);
    }
  }
  return possiblePasswords;
}

const passwords = getPossiblePasswords(range[0], range[1]);

console.log(passwords.length);