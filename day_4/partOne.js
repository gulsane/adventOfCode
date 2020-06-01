const range = `108457-562041`.split("-");

const isIncreasing = function (string) {
  const digits = string.split("");
  return digits.every((digit, index) => index === 0 || +digit >= +digits[index - 1]);
}

const hasSameAdjacent = function (string) {
  return /(\d)\1/.test(string);
}

const isPossiblePassword = function(password){
  const string = password.toString();
  return isIncreasing(string) && hasSameAdjacent(string);
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