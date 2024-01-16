import path from "path";

module.exports = {
  // other configurations...
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  }
};
