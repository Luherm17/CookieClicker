import React, { useState, useEffect } from 'react'
import { Card, Button, Alert, Navbar, Container, Nav } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from './firebase'
import { collection, getDocs, getDoc, updateDoc, doc, query, where, setDoc, increment, orderBy, limit } from 'firebase/firestore'

import cookieImg from './assets/cookie.png'
import Leaderboard from './Leaderboard'
import Upgrades from './Upgrades'

import 'animate.css'

import './Dashboard.css'

export default function Dashboard() {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    const [users, setUsers] = useState([])

    const [cookies, setCookies] = useState(0)
    const cookiesStr = ""

    const usersCollectionRef = query(collection(db, 'users'), orderBy("cookies", 'desc'), limit(3))



    useEffect(() => {

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)

            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(data)

        }

        //setInterval(getUsers, 5000)
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

    function clickCookie() {

        // update cookies on UI here

        setCookies(cookies + 1)
        
        console.log('Cookie count: ' + cookies)

        //change state in here

    }

    const getCookiesFromDB = async () => {

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

    


    const updateCookies = async () => {
        // make API call periodically here

        const q = doc(db, "users", currentUser.email)

        await updateDoc(q, {
            //cookies: increment(1)
            cookies: cookies
            
        });

        console.log('updated in database!')
        //take code from state and then push it

    }

    //setInterval(updateCookies, 60 * 1000);

    // make API call every 5 minutes to update cookies for the user 300_000
    //setInterval(updateCookies, 5000)

    const clickCookie2 = async () => {

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


    function setCookiesString() {

        if(cookies > 999_999_999) {
            cookiesStr = String(cookies % 1_000_000_000) + "B"
        }
        else if(cookies > 999_999) {
            cookiesStr = String(cookies % 1_000_000) + "M"
        }
        
    }

    return (

        <>
            <Navbar bg='' style={{backgroundColor: '#f0d7c0'}} variant="light" fixed="">
                <Container>
                    <Navbar.Brand href="/">Cookie Clicker</Navbar.Brand>
                    <Nav className="justify-content-end">

                        <Nav.Link href="">{currentUser.email}</Nav.Link>
                        <Nav.Link href="" onClick={handleLogout}>Sign out</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>


            {error && <Alert variant='danger'>{error}</Alert>}

            <div className='dashboard-container'>

                <Leaderboard userList={users} />

                <div style={{textAlign: 'center'}}>

                    <Button className='animate__animated animate__bounce' size="lg" variant="" onClick={clickCookie}>
                        <img className='animate__animated animate__bounce' src={cookieImg} alt="add item" width="300" />
                    </Button>

                    <div className="cookie-count text-center">
                        <h2>Cookies</h2>
                        <h1>{cookies.toLocaleString()}</h1>
                    </div>
                </div>


                <Upgrades currUser={currentUser} />
            </div>


        </>
    )
}