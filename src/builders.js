import { sanitize, hasBrackets } from "./utils";

/**
 * Recursively build the needed logical expressions
 * @param {*} t - babel types (needed for building the ast)
 * @param {*} arr - the array the user needs to access
 * @param {array} tokens - the tokens from the access path
 */
export function buildLogicalExpression(t, arr, tokens) {
  // base case
  if (tokens.length === 1) {
    return t.LogicalExpression(
      "&&",
      t.identifier(arr),
      // use the last token for the final expression
      t.memberExpression(
        t.identifier(arr),
        t.identifier(sanitize(tokens[0])),
        // check if the value is 'computed' (array access)
        hasBrackets(tokens[0])
      )
    );
  }

  return t.LogicalExpression(
    "&&",
    // continue building!
    buildLogicalExpression(t, arr, tokens.slice(0, -1)),
    // need to pass all of the tokens since the MemberExpression builder will take care of recursively removing tokens
    buildMemberExpression(t, arr, tokens)
  );
}

/**
 * Recursively build the needed member expressions
 * @param {*} t - babel types (needed for building the ast)
 * @param {*} arr - the array the user needs to access
 * @param {array} tokens - the tokens from the access path
 */
export function buildMemberExpression(t, arr, tokens) {
  // base case
  if (tokens.length === 1) {
    return t.memberExpression(
      t.identifier(arr),
      t.identifier(sanitize(tokens[0])),
      // check if the value is 'computed' (array access)
      hasBrackets(tokens[0])
    );
  }

  return t.memberExpression(
    // continue building!
    buildMemberExpression(t, arr, tokens.slice(0, -1)),
    // need to remove brackets (if they exist) on the last item in the array
    t.identifier(sanitize(tokens[tokens.length - 1])),
    // check if the value is 'computed' (array access)
    hasBrackets(tokens[tokens.length - 1])
  );
}
