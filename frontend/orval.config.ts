module.exports = {
  petstore: {
    output: {
      mode: "single",
      target: "types/orvalTypes.ts",
      client: "zod",
      override: true,
    },
    input: {
      target: "http://localhost:8080/v3/api-docs",
    },
  },
};
