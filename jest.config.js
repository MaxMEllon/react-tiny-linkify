module.exports = {
  transform: {
    ".(ts|tsx)": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json"
      }
    ]
  },
  testPathIgnorePatterns: ["/node_modules/"],
  testRegex: "(/__test__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  testEnvironment: "node",
};
