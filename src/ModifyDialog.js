import React, { useState, useEffect, memo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { updateListData } from './firebaseFunc/CRUDfunction';



function ModifyDialog({ open, close, data, action, type, handleAlertOpen }) {
  const [item, setItem] = React.useState({
    primary: "",
    secondary: "",
    id: ""
  });

  const handleUpdateData = async (data) => {
    //取出要更新的欄位
    const updateData = Object.fromEntries(Object.entries(item).filter(([key]) => key !== "id"));
    try {
      await updateListData({ id: item.id, type, data: updateData, action });
      close();
      handleAlertOpen({
        message: `${action} successfully`,
        severity: "success"
      });

    } catch (e) {
      handleAlertOpen({
        message: e,
        severity: "error"
      })
    }

  }

  useEffect(() => {
    setItem(data);
  }, [open]);

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      component={"span"}
      onClose={close}
    >
      {console.log("render")}
      <DialogTitle id="alert-dialog-title">
        {action === "add" ? "新增" : "修改"}
      </DialogTitle>
      <DialogContent>
        {
          Object.keys(item).map((i, index) =>
            <TextField
              required={i !== "id"}
              disabled={i === "id"}
              error={item[i] === ""}
              key={index}
              label={i}
              value={item[i]}
              component={"div"}
              onChange={(text) => setItem(prev => ({ ...prev, [i]: text.target.value }))}
              sx={{ marginTop: 5, width: "100%" }}
            />)
        }

      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleUpdateData}
          color="primary"
        >
          {action}
        </Button>
        <Button onClick={close} color="primary" autoFocus>
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function areEqual(prevProps, nextProps) {
  if (prevProps.open !== nextProps.open) {
    return false;
  }
  return true;
}

export default React.memo(ModifyDialog, areEqual)
