import {
  Container,
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";

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
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
