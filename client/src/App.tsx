import {
  Container,
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Toaster from "./components/toaster/Toaster";

const darkTheme = createMuiTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Container>
          <Guard>
            <RouterProvider router={router} />
          </Guard>
        </Container>
        <Toaster />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
