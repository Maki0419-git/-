import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { db, doc, getDocs, collection } from "./firebaseConfig";

export default function ListModule({ type }) {
    const [item, setItem] = React.useState([]);
    React.useEffect(() => {
        const getData = async function () {

            const querySnapshot = await getDocs(collection(db, type));
            let getItem = [];
            querySnapshot.forEach((doc) => getItem.push({ id: doc.id, ...doc.data() }));
            setItem(getItem)



        }

        getData();
    }, [])
    return (
        <>
            {console.log(item)}
            {item.map((i, index) => (
                <List key={index} >

                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        }
                    >

                        <ListItemText
                            primary={type == "product" ? i.desc : i.name}

                        />
                        <ListItemText

                            secondary={type == "product" ? i.price : i.career}
                        />
                    </ListItem>

                </List>
            ))}

        </>
    )
}