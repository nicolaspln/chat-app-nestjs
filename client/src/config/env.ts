const {
  REACT_APP_API_URL: API_URL = "http://localhost:3000",
  REACT_APP_WS_URL: WS_URL = "ws://localhost:3001",
} = process.env;

const env = {
  urls: {
    api: API_URL,
    ws: WS_URL,
  },
};

export default env;
