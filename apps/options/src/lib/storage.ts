export const storage = {
  get: (key: string) => {
    return new Promise((resolve, reject) => {
      browser.storage.local.get(key).then(
        (result) => resolve(result[key]),
        (error) => reject(error),
      );
    });
  },
  set: (key: string | number, value: unknown) => {
    return new Promise<void>((resolve, reject) => {
      browser.storage.local.set({ [key]: value }).then(
        () => resolve(),
        (error) => reject(error),
      );
    });
  },
  remove: (key: string) => {
    return new Promise<void>((resolve, reject) => {
      browser.storage.local.remove(key).then(
        () => resolve(),
        (error) => reject(error),
      );
    });
  },
};
