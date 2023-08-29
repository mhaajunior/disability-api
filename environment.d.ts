export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      FRONT_END_URL: string;
      MONGO_CLIENT: string;
      JWT_SECRET: string;
      API_HASH: string;
    }
  }
}
