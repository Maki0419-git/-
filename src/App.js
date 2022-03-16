import { HashRouter, Route, Switch } from "react-router-dom";
import AllList from "./AllList.js";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
// function NoPage() {
//   return (
//     <div>
//       <NavBar />
//       123
//     </div>
//   );
// }

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={AllList} />
          {/* <Route exact path="/List_All" component={List_All} />
        <Route exact path="/EmployeeList" component={EmployeeList} /> */}
          {/* <Route component={NoPage} /> */}
        </Switch>
      </ThemeProvider>
    </HashRouter>
  );
}
