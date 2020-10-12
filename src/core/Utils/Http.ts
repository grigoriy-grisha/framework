class Http {
  constructor() {}
  get(url: string) {
    return fetch(url).then((response) => response.json());
  }
}

export const http = new Http()