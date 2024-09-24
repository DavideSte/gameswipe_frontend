import { delay, http, passthrough } from "msw";

export const handlers = {
  delay: () =>
    http.all("*", async () => {
      console.log("Mocked delay called");
      await delay(500);
      return passthrough();
    }),
};
