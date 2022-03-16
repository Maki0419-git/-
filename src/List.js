import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModifyDialog from './ModifyDialog';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getListData } from './firebaseFunc/CRUDfunction';



let direction = {
    vertical: 'top',
    horizontal: 'center',
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function ListModule({ type, primary, secondary }) {
    const [item, setItem] = React.useState([]);
    const actionRef = React.useRef("add");
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState({
        primary: "",
        secondary: "",
        id: ""
    });
    const [alert, setAlert] = React.useState({
        open: false,
        message: "",
        severity: "success"
    });

    //alert function

    const handleAlertOpen = (newState) => {
        setAlert({ open: true, ...newState });
    };

    const handleAlertClose = () => {
        setAlert({ ...alert, open: false });
    };
    //dialog function
    const handleDialogOpen = (data, action) => {
        actionRef.current = action;
        setSelected(data);
        setOpen(true);

    }
    const handleItemDelete = () => {

    }

    //get data
    const handleGetData = async () => {
        try {
            await getListData(type, primary, secondary, setItem);
        } catch (e) {
            handleAlertOpen({
                message: e,
                severity: "error"
            })
        }
    }
    React.useEffect(() => {
        handleGetData();
    }, [])
    return (
        <>
            {console.log(item)}
            {item.map((data, index) => {

                return (
                    <List key={index} >
                        <ListItem
                            secondaryAction={
                                <Box sx={{ display: "flex" }}>
                                    <IconButton edge="end" onClick={() => handleItemDelete(data.id, "delete")}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleDialogOpen(data, "update")}>
                                        <ModeEditIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <ListItemText primary={data[primary]} secondary={data[secondary]} />
                        </ListItem>

                    </List>
                )
            })}
            <Fab
                color="primary" aria-label="add"
                sx={{ position: "fixed", bottom: 5, right: 5 }}
                onClick={() => handleDialogOpen({ [primary]: "", [secondary]: "" }, "add")}
            >
                <AddIcon />
            </Fab>
            <ModifyDialog
                {...{ open, type, handleAlertOpen }}
                close={() => setOpen(false)}
                data={selected}
                action={actionRef.current}
            />
            <Snackbar
                anchorOrigin={{ vertical: direction.vertical, horizontal: direction.horizontal }}
                open={alert.open} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alert.variant} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    )
}