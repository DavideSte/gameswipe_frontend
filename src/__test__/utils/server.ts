import { HttpHandler } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeEach } from "vitest";

export const startServer = (handlers: HttpHandler[] = []) => {
  const server = setupServer(...handlers);

  beforeEach(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  return server;
};

export const updateHandlers = (server: ReturnType<typeof startServer>, handlers: HttpHandler[]) => {
  server.use(...handlers);
};
