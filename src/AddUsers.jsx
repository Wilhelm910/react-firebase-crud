import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db, storage } from './firebaseconfig'
import { ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"

const AddUsers = () => {

    const [newUser, setNewUser] = useState({
        name: "",
        age: ""
    })
    const [imgUpload, setImgUpload] = useState(null)

    const usersCollectionRef = collection(db, "users")

    function updateInput(event) {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value
        })
        console.log(newUser)
    }



    async function addUser(event) {
        event.preventDefault()

        try {
            await addDoc(usersCollectionRef, { name: newUser.name, age: Number(newUser.age) })
        }
        catch (error) {

        }
    }

    function updateImg(event) {
        setImgUpload(event.target.files[0])
        console.log(newUser)
    }

    async function uploadImg(event) {
        event.preventDefault()
        if (imgUpload == null) return
        const imageRef = ref(storage, `images/${imgUpload.name + v4()}`)
        uploadBytes(imageRef, imgUpload).then(() => {
            alert("image Uploaded")
        })
    }


    return (
        <>
            <form onSubmit={addUser}>
                <input
                    placeholder='name'
                    type="text"
                    className="text"
                    name='name'
                    value={newUser.name}
                    onChange={updateInput}
                />
                <input
                    placeholder='age'
                    type="number"
                    className="text"
                    name='age'
                    value={newUser.age}
                    onChange={updateInput}
                />
                <button type='submit'>Add</button>
            </form>
            <form onSubmit={uploadImg}>
                <input
                    type="file"
                    className="file"
                    name='img'
                    onChange={updateImg} />
                <button type='submit'>Upload Img</button>
            </form>
        </>
    )
}

export default AddUsers