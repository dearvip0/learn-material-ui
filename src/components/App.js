import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import AppbarUI from "./ui/Appbar/Appbar";
function App() {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppbarUI />
    </ThemeProvider>
  );
}

export default App;
