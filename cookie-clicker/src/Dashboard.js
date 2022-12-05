import React, { useState, useEffect } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from './firebase'
import { collection, getDocs, getDoc, updateDoc, doc, query, where, setDoc, increment, orderBy, limit } from 'firebase/firestore'

import cookieImg from './assets/cookie.png'
import Leaderboard from './Leaderboard'
import Upgrades from './Upgrades'

export default function Dashboard() {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    const [users, setUsers] = useState([])

    const [cookies, setCookies] = useState()

    const usersCollectionRef = query(collection(db, 'users'), orderBy("cookies", 'desc'), limit(3))

    

    useEffect(() => {

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(data)

        }
        
        /*
        setInterval(() => {

            getUsers()
        }, 1000);
        */
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

    const clickCookie = async () => {

        console.log("cookie clicked!")

        const q = doc(db, "users", currentUser.email)

        await updateDoc(q, {
            cookies: increment(1)

        });

        const docRef = doc(db, "users", currentUser.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().cookies);
            setCookies(docSnap.data().cookies)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

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

            <Button className='text-align-center' size="lg" variant="" onClick={clickCookie}>
                <img src={cookieImg} alt="add item" width="300" />
            </Button>

            <h2>Cookies clicked: </h2> {cookies}

            <br />
            <br />

            <Leaderboard userList={users} />

            <Upgrades currUser={currentUser}/>
        </>
    )
}