declare namespace NodeJS {
  export interface ProcessEnv {
    HASURA_BASE_URL: string;
    HASURA_GRAPHQL_ADMIN_SECRET: string;
    HASURA_GRAPHQL_JWT_SECRET: string;
    HASURA_GRAPHQL_ACCESS_TOKEN_EXPIRES_IN: string;
    HASURA_GRAPHQL_REFRESH_TOKEN_EXPIRES_IN: string;
    SENDGRID_API_KEY: string;
    SENDGRID_SIGNIN_TEMPLATE_ID: string;
    SENDGRID_SIGNIN_EMAIL_FROM: string;
  }
}
