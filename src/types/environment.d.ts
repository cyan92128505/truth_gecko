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
      SESSION_SECRET: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
