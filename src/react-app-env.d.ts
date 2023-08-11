/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_SUPABASE_URL: string;
    REACT_APP_SERVICE_KEY: string;
  }
}
