import React, { useState, useEffect } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import {db} from './firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'

import cookieImg from './assets/cookie.png'

export default function Dashboard() {

    const [error, setError] = useState('')
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, 'users')

    useEffect(() => {

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(data)

        }

        getUsers()
    }, [])

    

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to logout')
        }
    }

    const clickCookie = async (id, cookies) => {
        
        const userDoc = doc(db, 'users', id)
        const newFields = {cookies: cookies + 1}

        await updateDoc(userDoc, newFields)
        console.log("cookie clicked!")
    }

    return (

        <>
        
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4>'>Profile</h2>
                    
                    {error && <Alert variant='danger'>{error}</Alert>}

                    <strong>Email:</strong> {currentUser.email}


                </Card.Body>
            </Card>

            <div className='w-100 text-center mt-2'>
                <Button variant='link' onClick={handleLogout}>Log out</Button>
            </div>

            <Button className='text-align-center' size="lg" variant="info" onClick={clickCookie}>
                <img src={cookieImg} alt="add item" width="300" />
            </Button>

            <h2>Cookies clicked: </h2>

            <br/>  
            <br/>  

            <h1> Leaderboard </h1>

             

            <div>
                {users.map((user) => {
                    return (
                        <div>
                            {" "}

                            <h3>User: {user.name}</h3>
                            <h4>Cookies: {user.cookies}</h4>
                        </div>
                    )
                })}
            </div>
        </>
    )
}