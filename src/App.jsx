
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { db } from './firebaseconfig'
import { collection, getDocs, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore'
import AddUsers from './AddUsers'

function App() {

  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")

  useEffect(() => {
    //realtime
    onSnapshot(usersCollectionRef, (snapshot) => {
      const usersData = []
      snapshot.docs.forEach((doc) => {
        usersData.push({...doc.data(), id: doc.id})
        setUsers(usersData)
      })
    })

  /*  async function getUsers() {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => (
        {
          ...doc.data(),
          id: doc.id
        }
      )))
    }
    getUsers()
    console.log(users)*/
  }, [])

  async function increaseAge(id, age) {
    const userDoc = doc(db, "users", id)
    const newFields = { age: age + 1 }
    await updateDoc(userDoc, newFields)
  }

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  const renderUsers = users.map((user) => {
    return (
      <div className='users'
        key={user.id}>
        <h1>{user.name}</h1>
        <span>{user.age}</span>
        <button onClick={() => increaseAge(user.id, user.age)}>Increase Age</button>
        <button onClick={() => deleteUser(user.id)}>Delte User</button>
      </div>
    )
  })


  return (
    <>
      <AddUsers />
      {renderUsers}
    </>
  )
}

export default App
