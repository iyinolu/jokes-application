export const storageService = {
  get: (name: string) => {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : null;
  },
  set: (name: string, content: unknown) => {
    localStorage.setItem(name, JSON.stringify(content));
  },
  removeData: (name: string) => {
    localStorage.removeItem(name);
  },
};
