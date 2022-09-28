export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SENDGRID_API_KEY: string;
      EMAIL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      FACEBOOK_CLIENT_ID: string;
      FACEBOOK_CLIENT_SECRET: string;
      REMOTE_DB: string;
      LOCAL_DB: string;
      CI_DB_USERNAME: string;
      CI_DB_PASSWORD: string;
      CI_DB_NAME: string;
      CI_DB_HOSTNAME: string;
      CI_DB_PORT: string;
      SESSION_SECRET: string;
      JWT_SECRET: string;
      JWT_EXPIRATION_TIME: number;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
