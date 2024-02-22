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
          <Container maxWidth="xl" sx={{ marginTop: "1rem" }}>
            {displayChatList ? (
              <Grid container spacing={5}>
                <Grid item xs={12} md={5} lg={4} xl={3}>
                  <ChatList />
                </Grid>
                <Grid xs={12} item md={7} lg={8} xl={9}>
                  <Routes />
                </Grid>
              </Grid>
            ) : (
              <Routes />
            )}
          </Container>
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
