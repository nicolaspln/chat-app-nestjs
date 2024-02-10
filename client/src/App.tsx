import {
  Container,
  CssBaseline,
  Grid,
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
import ChatList from "./components/chat-list/ChatList";

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
        <Grid container>
          <Grid item md={3}>
            <ChatList />
          </Grid>
          <Grid item md={9}>
            <Container>
              <Guard>
                <RouterProvider router={router} />
              </Guard>
            </Container>
          </Grid>
        </Grid>
        <Toaster />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
