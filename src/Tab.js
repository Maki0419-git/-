import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListModule from "./List";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {index === 0 ? (<ListModule
        type="product"
      // data={[
      //   { primary: "iPad", secondary: 20000 },

      //   { primary: "iPhone X", secondary: 30000 }
      // ]}
      ></ListModule>) : (<ListModule
        type="employee"
      // data={[
      //   { primary: "Ben", secondary: "IT" },

      //   { primary: "Rich", secondary: "Marketing" },

      //   { primary: "Ruby", secondary: "Management" },

      //   { primary: "Judy", secondary: "IT" },

      //   { primary: "Rain", secondary: "IT" }
      // ]}
      ></ListModule>)}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <AppBar position="static" sx={{ display: "flex" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Product" {...a11yProps(0)} />
          <Tab label="Employee" {...a11yProps(1)} />
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 2 }}
          >
            <IconButton>
              <LogoutIcon sx={{ color: "white" }} />
            </IconButton>
          </div>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          123
          {/* <ListModule
            data={[
              { primary: "iPad", secondary: 20000 },

              { primary: "iPhone X", secondary: 30000 }
            ]}
          />*}
       }*/}
        </TabPanel>


        <TabPanel value={value} index={1} dir={theme.direction}>
          456
          {/* <ListModule
            data={[
              { primary: "Ben", secondary: "IT" },

              { primary: "Rich", secondary: "Marketing" },

              { primary: "Ruby", secondary: "Management" },

              { primary: "Judy", secondary: "IT" },

              { primary: "Rain", secondary: "IT" }
            ]}
          /> */}
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
