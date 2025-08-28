import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string;
    username: string;
    // Add any other properties you want to store in the session
  }
}