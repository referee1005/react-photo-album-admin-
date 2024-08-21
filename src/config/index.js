export const ApiUrl =
  process.env.REACT_APP_ENVIRONMENT == 'development'
    ? 'http://localhost:5000'
    : 'https://api.pixtalfocus.com'
