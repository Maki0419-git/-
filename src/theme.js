import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      phone: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  palette: {
    primary: {
      light: "#A0C4E6",
      main: "#245298",
      dark: "#1D3F73"
      // contrastText: '#',
    },
    secondary: {
      light: "#EC8867",
      main: "#F38500",
      dark: "#EA6A47"
      // contrastText: '#',
    },
    // Used by getContrastText() to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});
