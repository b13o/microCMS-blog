interface StorageMock {
  getItem: ReturnType<typeof vi.fn>;
  setItem: ReturnType<typeof vi.fn>;
  clear: ReturnType<typeof vi.fn>;
}

export const createStorageMock = () => {
  let mockStorage: Record<string, string> = {};
  const localStorageMock: StorageMock = {
    getItem: vi.fn((key: string) => mockStorage[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      mockStorage[key] = value;
    }),
    clear: vi.fn(() => {
      mockStorage = {};
    }),
  };
  return localStorageMock;
};
