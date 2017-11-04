import { buildLogicalExpression, buildMemberExpression } from "./builders";

export default function(babel) {
  const { types: t } = babel;

  return {
    name: "hnt",
    visitor: {
      // remove the import since it is not needed anymore
      ImportDeclaration(path) {
        if (path.node.source.value === "hnt") {
          path.remove();
        }
      },
      CallExpression(path) {
        // we only want to affect hnt function calls
        if (path.node.callee.name === "hnt") {
          // HACK - quick check to see if the requisite arguments exist
          // should the path be removed if the arguments do not exist?
          if (path.node.arguments.length === 3) {
            // get the values from the hnt call
            // arr that the user is trying to access
            const arr = path.node.arguments[0].name;
            // path that the user is trying to access
            const accessPath = path.node.arguments[1].value;
            // user defined fallback
            const fallback = path.node.arguments[2].value;

            // transform the access path to tokens that we can use
            // regex for spliting based on . and []
            const re = /\.|(\[\d+?])/g;
            // use the regex to split the path string
            // filter to get 'rid' of undefined values
            const tokens = accessPath.split(re).filter(t => t);

            // do the replacing of the hnt call with plain js
            path.replaceWith(
              // the outer most call is an 'or' since we need
              // to fallback to the fallback if any of the values
              // in the access path don't exist
              t.LogicalExpression(
                "||",
                // build the replacement
                buildLogicalExpression(t, arr, tokens),
                t.identifier(fallback)
              )
            );
          }
        }
      }
    }
  };
}
