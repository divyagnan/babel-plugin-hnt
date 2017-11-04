/**
 * "Sanitize" a string
 * If it has enclosing brackets then get rid of them - otherwise return the string
 * @param {string} s 
 */
export function sanitize(str) {
  return hasBrackets(str) ? stripBrackets(str) : str;
}

/**
 * Check if a given string has enclosing brackets
 * @param {string} str 
 */
export function hasBrackets(str) {
  // regex to check if the string has []
  const re = /^\[|\]/;
  // if the match returns null if the string has no []
  return str.match(re) !== null;
}

/**
 * Remove enclosing brackets from a string (or just remove the first and last characters 🤷🏽‍♂️)
 * @param {string} str 
 */
function stripBrackets(str) {
  // return the string excluding the first and last characters (the brackets)
  return str.substring(1, str.length - 1);
}
