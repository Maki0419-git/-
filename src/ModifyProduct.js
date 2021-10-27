import React, { useState, useEffect, memo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

function AlertDialog({
  // action,
  // show,
  close,
  data,
  modify,
  insert
}) {
  const [index, setIndex] = useState(0);
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");

  useEffect(() => {
    setPrimary(data.primary);
    setSecondary(data.secondary);
    setIndex(data.index);
  }, [data]);

  return (
    <Dialog
      open={data.show}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      component={"span"}
      onClose={close}
    >
      {console.log("render")}
      <DialogTitle id="alert-dialog-title">
        {data.action === "add" ? "新增" : "修改"}
      </DialogTitle>
      <DialogContent>
        <form>
          <TextField
            id="standard-name"
            label="Product"
            value={primary}
            component={"span"}
            onChange={(text) => setPrimary(text.target.value)}
            sx={{ marginTop: 5 }}
          />
          <TextField
            id="standard-uncontrolled"
            label="Price"
            value={secondary}
            component={"span"}
            onChange={(text) => setSecondary(text.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            data.action === "add"
              ? insert({ primary, secondary })
              : modify({ primary, secondary }, index);
            // modify({ desc, price }, index);
          }}
          color="primary"
        >
          {data.action}
        </Button>
        <Button onClick={close} color="primary" autoFocus>
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function areEqual(prevProps, nextProps) {
  if (prevProps.data !== nextProps.data) {
    console.log(false);
    return false;
  }
  console.log(true);
  return true;
}

export default React.memo(AlertDialog, areEqual);
