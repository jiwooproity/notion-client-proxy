export function isProduction() {
  const isProd = process.env.NODE_ENV === "production";

  function getMode(choice: string[]) {
    return choice[isProd ? 0 : 1];
  }

  return { getMode };
}
