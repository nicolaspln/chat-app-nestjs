const { REACT_APP_API_URL: API_URL = "http://localhost:3000" } = process.env;

const env = {
  urls: {
    api: API_URL,
  },
};

export default env;
