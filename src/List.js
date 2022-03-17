import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModifyDialog from './ModifyDialog';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import Grow from '@mui/material/Grow';
import { getListData, deleteListData } from './firebaseFunc/CRUDfunction';



let direction = {
    vertical: 'bottom',
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
    const [checked, setChecked] = React.useState([]);
    const [deleted, setDeleted] = React.useState(false);


    //更新check array
    const handleToggle = (id) => {
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


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
    //delete function
    const handleDelete = () => {
        setDeleted((prev) => !prev);
    };

    const handleItemDelete = async () => {
        try {
            await deleteListData(type, checked);
            setDeleted(false);
            handleAlertOpen({
                message: `delete successfully`,
                severity: "success"
            });
        } catch (e) {
            handleAlertOpen({
                message: e,
                severity: "error"
            })
        }
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
            <Grow in={deleted} {...(deleted ? { timeout: 1200 } : {})}>
                <Box sx={{ width: "100%" }}>
                    <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />} onClick={handleItemDelete} fullWidth>
                        Delete
                    </Button>
                </Box>
            </Grow>
            {item.map((data, index) => {
                return (
                    <List key={index} >
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" onClick={() => handleDialogOpen(data, "update")}>
                                    <ModeEditIcon />
                                </IconButton>
                            }
                        >
                            <Collapse orientation="horizontal" in={deleted}>

                                <ListItemIcon onClick={() => handleToggle(data.id)} >
                                    <Checkbox
                                        edge="start"
                                        color="secondary"
                                        checked={checked.indexOf(data.id) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>

                            </Collapse>

                            <ListItemText primary={data[primary]} secondary={data[secondary]} />
                        </ListItem>
                    </List>
                )
            })}

            <Fab
                color="primary" aria-label="add"
                sx={{ position: "absolute", bottom: 10, right: 10 }}
                onClick={() => handleDialogOpen({ [primary]: "", [secondary]: "" }, "add")}
            >
                <AddIcon />
            </Fab>
            <Fab
                color="secondary" aria-label="add"
                sx={{ position: "absolute", bottom: 80, right: 10 }}
                onClick={handleDelete}
            >
                <DeleteIcon sx={{ color: "white" }} />
            </Fab>
            <ModifyDialog
                {...{ open, type, handleAlertOpen }}
                close={() => setOpen(false)}
                data={selected}
                action={actionRef.current}
            />
            <Snackbar
                anchorOrigin={{ vertical: direction.vertical, horizontal: direction.horizontal }}
                open={alert.open} autoHideDuration={3000} onClose={handleAlertClose}
                sx={{ position: "absolute", }}
            >
                <Alert onClose={handleAlertClose} severity={alert.severity} sx={{ width: '100%', }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    )
}