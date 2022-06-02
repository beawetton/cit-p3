/*
    CIT 281 Project 3
    Name: Beatrice Wetton
*/

const coinValues = [1, 5, 10, 25, 50, 100]

//Returns true if parameters is equal to a coin value
function validDenomination(coin){
    return [1,5,10,25,50,100].indexOf(coin) !== -1;
}

//Returns value of coin object
function valueFromCoinObject(obj){
    const {
        denom = 0,
        count = 0,
    } = obj;
    return denom * count;

}

module.exports = {
    coinCount,
}
//Returns calculated value of all coin objects
function valueFromArray(arr) {
    if (Array.isArray(arr[0])) {
      arr = arr[0];
    }
    return arr.reduce(
      (accumulator, currentObj) =>
      accumulator + valueFromCoinObject(currentObj),
      0);
  }
//Returns the result of valueFromArray() function
function coinCount(...coinage) {
    return valueFromArray(coinage);
}
