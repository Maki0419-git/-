import { db, getDocs, collection, } from "../config";
import { doc, updateDoc, onSnapshot, addDoc, deleteDoc } from "firebase/firestore";

export const getListData = (type, primary, secondary, setItem) => new Promise(async (resolve, reject) => {
    try {
        const q = collection(db, type);
        onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, [primary]: doc.data()[primary], [secondary]: doc.data()[secondary] })

            });
            setItem(items);
            resolve();
        })

    } catch (e) {
        reject(e.message);
    }

    return
})


export const updateListData = ({ id, type, data, action }) => new Promise(async (resolve, reject) => {
    try {
        if (action === "update") {
            const ref = doc(db, type, id);
            await updateDoc(ref, data);
        } else if (action === "add") {
            const ref = collection(db, type);
            await addDoc(ref, data);
        }
        resolve();
    } catch (e) {
        reject(e.message)
    }
})


export const deleteListData = (type, data) => new Promise(async (resolve, reject) => {

    try {
        let promiseArray = [];
        data.forEach(id => {
            promiseArray.push(deleteDoc(doc(db, type, id)));
        })
        await Promise.all(promiseArray);
        resolve();
    } catch (e) {
        reject(e.message)
    }

})

