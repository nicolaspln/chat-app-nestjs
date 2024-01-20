import {
  Container,
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
} from "@mui/material";
import Auth from "./components/auth/Auth";

const darkTheme = createMuiTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Auth />
      </Container>
    </ThemeProvider>
  );
};

export default App;
