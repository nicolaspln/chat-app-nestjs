import {
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router, { ROUTES } from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Toaster from "./components/toaster/Toaster";
import ChatList from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const { path } = usePath();

  const displayChatList = path === ROUTES.HOME || path.includes(ROUTES.CHAT);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          {displayChatList ? (
            <Grid container>
              <Grid item md={3}>
                <ChatList />
              </Grid>
              <Grid item md={9}>
                <Routes />
              </Grid>
            </Grid>
          ) : (
            <Routes />
          )}
        </Guard>
        <Toaster />
      </ThemeProvider>
    </ApolloProvider>
  );
};

const Routes = () => {
  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
