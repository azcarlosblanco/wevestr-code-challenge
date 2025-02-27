// Increase timeout for database operations
jest.setTimeout(10000);

beforeAll(() => {
  process.env.NODE_ENV = 'test';
}); 