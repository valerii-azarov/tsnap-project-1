declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API: string;
    }
  }
}

export {};
