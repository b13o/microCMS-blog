import "@testing-library/jest-dom/vitest";
import { handlers } from "../mocks/handlers";
import { setupServer } from "msw/node";

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
