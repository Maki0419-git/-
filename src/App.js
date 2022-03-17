import { HashRouter, Route, Switch } from "react-router-dom";
import AllList from "./AllList.js";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";


export default function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={AllList} />
        </Switch>
      </ThemeProvider>
    </HashRouter>
  );
}
