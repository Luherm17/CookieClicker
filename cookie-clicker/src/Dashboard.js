import React, { useState, useEffect } from 'react'
import { Card, Button, Alert, Navbar, Container, Nav } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from './firebase'
import { collection, getDocs, getDoc, updateDoc, doc, query, where, setDoc, increment, orderBy, limit } from 'firebase/firestore'

import cookieImg from './assets/cookie.png'
import Leaderboard from './Leaderboard'
import Upgrades from './Upgrades'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import Alert from '@material-ui/lab/Alert';

import 'animate.css'

import './Dashboard.css'

export default function Dashboard() {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    const [users, setUsers] = useState([])

    const [cookies, setCookies] = useState(0)
    const cookiesStr = ""

    // const [prestigeLevel, setPrestigeLevel] = useState(0)

    const usersCollectionRef = query(collection(db, 'users'), orderBy("prestigeLvl", 'desc'), orderBy("cookies", 'desc'), limit(5))
    // const test = usersCollectionRef.orderBy("cookies", 'desc')


    useEffect(() => {

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)

            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(data)

        }

        const getCookiesFromDB = async () => {

            const docRef = doc(db, "users", currentUser.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data().cookies);
                setCookies(docSnap.data().cookies)
                // setPrestigeLevel(docSnap.data().prestigeLvl)
                setInterval(() => {
                    getUsers();
                }, 5000);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        getUsers();
        getCookiesFromDB();

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

    const animate = (element, animation, duration) => {
        const animationName = `animate__${animation}`;
        const node = document.querySelector(element);

        node.classList.add("animate__animated", animationName);
        node.style.setProperty('--animate-duration', duration)

        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove("animate_animated", animationName);
        }

        node.addEventListener("animationend", handleAnimationEnd, { once: true });
    };

    const onBuyButtonClick = () => {
        animate(".cookie-main-img", "pulse", "50ms");
    };

    function clickCookie() {

        // update cookies on UI here

        setCookies(cookies + 1)

        onBuyButtonClick()

        console.log('Cookie count: ' + cookies)

        //change state in here
        updateCookies();
    }




    const updateCookies = async () => {
        // make API call periodically here

        const q = doc(db, "users", currentUser.email)

        await updateDoc(q, {
            //cookies: increment(1)
            cookies: increment(1)

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

        console.log(cookies)

        // if(cookies > 999_999_999) {
        //     cookiesStr = String(cookies % 1_000_000_000) + "B"
        // }
        // else if(cookies > 999_999) {
        //     cookiesStr = String(cookies % 1_000_000) + "M"
        // }

    }

    // function prestigeUser() {
    //     if (cookies >= 1000000) {
    //         setPrestigeLevel(prestigeLevel + 1)
    //         alert("You prestiged!")
    //         updatePrestige();
    //     } else {
    //         alert("Not enough cookies!")
    //     }
    // }

    // const updatePrestige = async () => {
    //     // make API call periodically here

    //     const q = doc(db, "users", currentUser.email)

    //     await updateDoc(q, {
    //         cookies: 0,
    //         factory: 0,
    //         grandma: 0,
    //         mine: 0,
    //         temple: 0,
    //         prestigeLvl: increment(1)
    //     });

    //     console.log('updated in database!')

    // }

    setCookiesString()

    return (

        <>
            {/* <Alert iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" />, }} onClose={() => { }}>Achievement Unlocked!</Alert> */}
            <Navbar bg='' style={{ backgroundColor: '#f0d7c0' }} variant="light" fixed="">
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

                <div style={{ textAlign: 'center' }}>

                    <Button className='cookie-main-img' style={{border:"solid 1px transparent"}} size="lg" variant="" onClick={clickCookie}>
                        <img className='' src={cookieImg} alt="add item" width="300" />
                    </Button>

                    <div className="cookie-count text-center">
                        <h2>Cookies</h2>
                        <h1>{cookies.toLocaleString()}</h1>
                    </div>
                </div>


                <Upgrades currUser={currentUser} localCookies={cookies} setLocalCookies={setCookies} />
            </div>

            {/* <div className="prestige-container-cell">
                <p>Prestige Level: {prestigeLevel || 0}</p>
                <Button style={{ width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f' }} onClick={prestigeUser}>Prestige</Button>
            </div> */}


        </>
    )
}