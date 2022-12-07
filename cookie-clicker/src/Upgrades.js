import React, { useState, useEffect } from 'react'
import { Card, Button, Alert, ListGroup } from 'react-bootstrap'

import { db } from './firebase'
import { collection, getDocs, getDoc, updateDoc, doc, query, where, setDoc, increment } from 'firebase/firestore'

import factoryImg from './assets/factory.png'
import templeImg from './assets/temple.png'
import mineImg from './assets/mine2.png'
import grandmaImg from './assets/grandma.png'
import privateImg from './assets/private.png'
import prestigeOne from './assets/prestigeOne.png'
import prestigeTwo from './assets/prestigeTwo.png'
import prestigeThree from './assets/prestigeThree.png'
import prestigeFour from './assets/prestigeFour.png'
import prestigeFive from './assets/prestigeFive.png'
import prestigeSix from './assets/prestigeSix.png'
import prestigeSeven from './assets/prestigeSeven.png'
import prestigeEight from './assets/prestigeEight.png'
import prestigeNine from './assets/prestigeNine.png'
import prestigeTen from './assets/prestigeTen.png'

import './Upgrades.css'

export default function Upgrades({ currUser, localCookies, setLocalCookies }) {


    const [upgrades, setUpgrades] = useState([])

    const [grandmas, setGrandmas] = useState()
    const [mines, setMines] = useState()
    const [factories, setFactories] = useState()
    const [temples, setTemples] = useState()
    const [tempCookies, setTempCookies] = useState(localCookies)
    const [prestigeLevel, setPrestigeLevel] = useState(0)
    const [prestigeImg, setPrestigeImg] = useState(privateImg)

    // const [localCookies, setLocalCookies] = useState()


    useEffect(() => {

        const getUpgrades = async () => {

            const docRef = doc(db, "users", currUser.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                setGrandmas(docSnap.data().grandma)
                setMines(docSnap.data().mine)
                setFactories(docSnap.data().factory)
                setTemples(docSnap.data().temple)
                setLocalCookies(docSnap.data().cookies)
                setPrestigeLevel(docSnap.data().prestigeLvl)

                // (async () => {
                //     async function tick() {
                //         await docSnap.current()
                //     }
                // })
                setInterval(() => {
                    cookieCalc()
                }, 5000);

                console.log('temples: ' + docSnap.data().temple)
            }

        }



        getUpgrades()
        changePrestigeImg()

        console.log("grannies2: " + grandmas)

        //console.log(upgrades)

        //setInterval(updateUpgrades, 5000)


    }, [])

    let inc = 0

    const cookieCalc = async () => {

        const docRef = doc(db, "users", currUser.email);
        const docSnap = await getDoc(docRef);
        let grandmaCount = docSnap.data().grandma
        let mineCount = docSnap.data().mine
        let factoryCount = docSnap.data().factory
        let templeCount = docSnap.data().temple
        let cookieCount = docSnap.data().cookies
        console.log("GILFS: " + grandmaCount)
        console.log("COOKIES: " + tempCookies)
        // checkGrandmas()

        if (grandmaCount < 1 && mineCount < 1 && factoryCount < 1 && templeCount < 1) {
            console.log("No upgrades")
        } else {
            if (localCookies) {
                let temp = localCookies +
                    (grandmaCount * 15) +
                    (mineCount * 100) +
                    (factoryCount * 1000) +
                    (templeCount * 10000)
                setLocalCookies(temp)
                await updateDoc(docRef, {
                    //cookies: increment(1)
                    cookies: temp

                });
                console.log("here")
            } else {
                let temp = cookieCount +
                    (grandmaCount * 15) +
                    (mineCount * 100) +
                    (factoryCount * 1000) +
                    (templeCount * 10000)
                setLocalCookies(temp)
                await updateDoc(docRef, {
                    //cookies: increment(1)
                    cookies: temp

                });
                console.log("fuck")
            }
            // setLocalCookies(tempCookies + granny * 15)

            // console.log("COOKIE NUM " + tempCookies)
            // setLocalCookies(localCookies + granny * 15)
            // console.log("Inc: " + localCookies)
            // setCookies += granny * 15
            // console.log("Inc: " + setCookies)
        }

    }

    // function cookieCalc() {

    //     // const docRef = doc(db, "users", currUser.email);
    //     // const docSnap = await getDoc(docRef);
    //     // let granny = docSnap.data().grandma
    //     // setGrandmas(grandmas => (grandmas))
    //     console.log("GILFS: " + grandmas)

    //     if (grandmas < 1) {
    //         console.log("No GILF upgrade " + grandmas)
    //     } else {
    //         updateLocalCookies(grandmas)
    //         // console.log("COOKIE NUM " + tempCookies)
    //         // setLocalCookies(localCookies + granny * 15)
    //         // console.log("Inc: " + localCookies)
    //         // setCookies += granny * 15
    //         // console.log("Inc: " + setCookies)
    //     }

    // }

    // function checkGrandmas(input, i) {
    //     console.log("GRANDMA NUM " + input)
    //     if (input < 1) {
    //         console.log("No GILF upgrade " + input)
    //     } else {
    //         updateLocalCookies(input, i)
    //     }
    // }

    // function updateLocalCookies(input, i) {
    //     console.log("FUCK " + input)
    //     console.log("COOKIE NUM " + i)
    //     setLocalCookies(i + input * 15)
    //     console.log("Inc: " + i)
    // }

    // get the current values from the DB

    function buyGrandma() {
        if (localCookies >= 20) {
            setGrandmas(1 + grandmas)
            setLocalCookies(localCookies - 20)
            removeCookies("grandma")
            updateUpgrades("grandma")
        } else {
            alert("Not enough money!")
        }
        // console.log("upgrade bought!")
        // console.log(localCookies + " FUCK")
    }
    function buyMine() {
        if (localCookies >= 100) {
            setMines(mines + 1)
            setLocalCookies(localCookies - 100)
            removeCookies("mine")
            updateUpgrades("mine")
        } else {
            alert("Not enough money!")
        }
        // console.log("upgrade bought!")
    }
    function buyFactory() {
        if (localCookies >= 1000) {
            setFactories(factories + 1)
            setLocalCookies(localCookies - 1000)
            removeCookies("factory")
            updateUpgrades("factory")
        } else {
            alert("Not enough money!")
        }
        // console.log("upgrade bought!")
    }
    function buyTemple() {
        if (localCookies >= 15000) {
            setTemples(temples + 1)
            setLocalCookies(localCookies - 15000)
            removeCookies("temple")
            updateUpgrades("temple")
        } else {
            alert("Not enough money!")
        }
    }

    const removeCookies = async (name) => {
        const q = doc(db, "users", currUser.email)

        if (name == "grandma") {
            await updateDoc(q, {
                cookies: increment(-20)
            });
        } else if (name == "mine") {
            await updateDoc(q, {
                cookies: increment(-100)
            });
        } else if (name == "factory") {
            await updateDoc(q, {
                cookies: increment(-1000)
            });
        } else if (name == "temple") {
            await updateDoc(q, {
                cookies: increment(-15000)
            });
        }
    }

    const updateUpgrades = async (name) => {

        const q = doc(db, "users", currUser.email)

        console.log("NAME: " + name)

        if (name == "grandma") {
            await updateDoc(q, {
                grandma: increment(1),
            })
        } else if (name == "mine") {
            await updateDoc(q, {
                mine: increment(1),
            })
        } else if (name == "factory") {
            await updateDoc(q, {
                factory: increment(1),
            })
        } else if (name == "temple") {
            await updateDoc(q, {
                temple: increment(1),
            })
        }

        // console.log(grandmas + " " + mines + " " + factories + " " + temples)
        // await updateDoc(q, {
        //     grandma: grandmas,
        //     mine: mines,
        //     factory: factories,
        //     temple: temples
        //     // grandma: increment(1),
        //     // mine: increment(1),
        //     // factory: increment(1),
        //     // temple: increment(1)
        // })

    }

    function prestigeUser() {
        console.log("Local cookies: " + localCookies)
        if (localCookies >= 1000000) {
            setPrestigeLevel(prestigeLevel + 1)
            setLocalCookies(0)
            setGrandmas(0)
            setMines(0)
            setFactories(0)
            setTemples(0)
            // setPrestigeLevel(prestigeLevel + 1)
            // changePrestigeImg()
            updatePrestige();
            alert("You prestiged!")
        } else {
            alert("Not enough cookies!")
        }
    }

    const updatePrestige = async () => {
        // make API call periodically here

        const q = doc(db, "users", currUser.email)

        await updateDoc(q, {
            cookies: 0,
            factory: 0,
            grandma: 0,
            mine: 0,
            temple: 0,
            prestigeLvl: increment(1)
        });

        changePrestigeImg()

        console.log('updated in database!')

    }

    const changePrestigeImg = async () => {
        const docRef = doc(db, "users", currUser.email);
        const docSnap = await getDoc(docRef);
        let prestigeLevelCheck = docSnap.data().prestigeLvl
        console.log("Prestige lvl: " + prestigeLevelCheck)
        switch (prestigeLevelCheck) {
            case 0:
                setPrestigeImg(privateImg)
                break
            case 1:
                setPrestigeImg(prestigeOne)
                break
            case 2:
                setPrestigeImg(prestigeTwo)
                break
            case 3:
                setPrestigeImg(prestigeThree)
                break
            case 4:
                setPrestigeImg(prestigeFour)
                break
            case 5:
                setPrestigeImg(prestigeFive)
                break
            case 6:
                setPrestigeImg(prestigeSix)
                break
            case 7:
                setPrestigeImg(prestigeSeven)
                break
            case 8:
                setPrestigeImg(prestigeEight)
                break
            case 9:
                setPrestigeImg(prestigeNine)
                break
            case 10:
                setPrestigeImg(prestigeTen)
                break
            default:
                setPrestigeImg(prestigeTen)
                break
        }
    }

    /*
    const showUpgrades = async () => {

        const docRef = doc(db, "users", currUser.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            
            setUpgrades([docSnap.data().grandma, 
                        docSnap.data().mine,
                        docSnap.data().factory,
                        docSnap.data().temple])
        } 
        
        console.log(upgrades)

    }
    */
    //showUpgrades()





    return (
        <>

            <Card>
                <Card.Title className='text-center mt-3'>
                    Upgrades
                </Card.Title>


                <Card.Body>
                    <ListGroup>

                        <ListGroup.Item id='grandma' className="upgrade-container">

                            <div className="upgrade-container-cell">
                                <img class='upgrade-img' src={grandmaImg} ></img>
                                <p>Grandma</p>
                            </div>

                            <div className="upgrade-container-cell">
                                <p>Count: {grandmas || 0}</p>
                                <Button style={{ width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f' }} onClick={buyGrandma}>Buy (-20)</Button>
                            </div>

                        </ListGroup.Item>

                        <ListGroup.Item id='mine' className="upgrade-container">

                            <div className="upgrade-container-cell">
                                <img class='upgrade-img' src={mineImg} ></img>
                                <p>Cookie Mine</p>
                            </div>

                            <div className="upgrade-container-cell">
                                <p>Count: {mines || 0}</p>
                                <Button style={{ width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f' }} onClick={buyMine}>Buy (-100)</Button>
                            </div>

                        </ListGroup.Item>

                        <ListGroup.Item id='factory' className="upgrade-container">

                            <div className="upgrade-container-cell">
                                <img class='upgrade-img' src={factoryImg} ></img>
                                <p>Factory</p>
                            </div>

                            <div className="upgrade-container-cell">
                                <p>Count: {factories || 0}</p>
                                <Button style={{ width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f' }} onClick={buyFactory}>Buy (-1,000)</Button>
                            </div>

                        </ListGroup.Item>


                        <ListGroup.Item id='temple' className="upgrade-container">

                            <div className="upgrade-container-cell">
                                <img class='upgrade-img' src={templeImg} ></img>
                                <p>Cookie Temple</p>
                            </div>

                            <div className="upgrade-container-cell">
                                <p>Count: {temples || 0}</p>
                                <Button style={{ width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f' }} onClick={buyTemple}>Buy (-15,000)</Button>
                            </div>

                        </ListGroup.Item>

                        <ListGroup.Item id='prestige' className="upgrade-container">

                            <div className="upgrade-container-cell">
                                <img class='upgrade-img' src={prestigeImg} ></img>
                                <p>Prestige</p>
                            </div>

                            <div className="upgrade-container-cell">
                                <p>Level: {prestigeLevel || 0}</p>
                                <Button style={{ width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f' }} onClick={prestigeUser}>Prestige</Button>
                            </div>

                        </ListGroup.Item>


                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    )

}