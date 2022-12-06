import React, { useState, useEffect } from 'react'
import { Card, Button, Alert, ListGroup } from 'react-bootstrap'

import { db } from './firebase'
import { collection, getDocs, getDoc, updateDoc, doc, query, where, setDoc, increment } from 'firebase/firestore'

import factoryImg from './assets/factory.png'
import templeImg from './assets/temple.png'
import mineImg from './assets/mine2.png'
import grandmaImg from './assets/grandma.png'

import './Upgrades.css'

export default function Upgrades({ currUser }) {


    const [upgrades, setUpgrades] = useState([])

    const [grandmas, setGrandmas] = useState()
    const [mines, setMines] = useState()
    const [factories, setFactories] = useState()
    const [temples, setTemples] = useState()


    useEffect(() => {

        const getUpgrades = async () => {

            const docRef = doc(db, "users", currUser.email);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {

                setGrandmas(docSnap.data().grandma)
                setMines(docSnap.data().mine)
                setFactories(docSnap.data().factory)
                setTemples(docSnap.data().temple)
                
                
                console.log('temples: ' + docSnap.data().temple)
            }
            
        }

        getUpgrades()

        console.log("grannies2: " + grandmas)

        //console.log(upgrades)

        //setInterval(updateUpgrades, 5000)

       
    }, [])

    
    // get the current values from the DB

    function buyUpgrade() {

        setGrandmas(grandmas + 1)
        /*
        const q = doc(db, "users", currUser.email)
        
        await updateDoc(q, {
            grandma: increment(1)

        });
        */
        console.log("upgrade bought!")
        //console.log(upgrades)

        console.log('grannies1: ' + grandmas)

       updateUpgrades()

    }

    const updateUpgrades = async () => {

        const q = doc(db, "users", currUser.email)

        console.log(grandmas + " " + mines + " " + factories + " " + temples)

        await updateDoc(q, {
            grandma: grandmas,
            mine: mines,
            factory: factories,
            temple: temples
        }) 

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
                                <Button style={{width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f'}}onClick={buyUpgrade}>Buy</Button>
                            </div>
                            
                        </ListGroup.Item>

                        <ListGroup.Item id='mine' className="upgrade-container">

                            <div className="upgrade-container-cell">
                                <img class='upgrade-img' src={mineImg} ></img>
                                <p>Cookie Mine</p>
                            </div>

                            <div className="upgrade-container-cell"> 
                                <p>Count: {mines || 0}</p>
                                <Button style={{width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f'}}onClick={buyUpgrade}>Buy</Button>
                            </div>

                        </ListGroup.Item>

                        <ListGroup.Item id='factory' className="upgrade-container">

                            <div className="upgrade-container-cell">
                                <img class='upgrade-img' src={factoryImg} ></img>
                                <p>Factory</p>
                            </div>

                            <div className="upgrade-container-cell"> 
                                <p>Count: {factories || 0}</p>
                                <Button style={{width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f'}}onClick={buyUpgrade}>Buy</Button>
                            </div>

                        </ListGroup.Item>


                        <ListGroup.Item id='temple' className="upgrade-container">

                            <div className="upgrade-container-cell">
                                <img class='upgrade-img' src={templeImg} ></img>
                                <p>Cookie Temple</p>
                            </div>

                            <div className="upgrade-container-cell"> 
                                <p>Count: {temples || 0}</p>
                                <Button style={{width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f'}}onClick={buyUpgrade}>Buy</Button>
                            </div>

                        </ListGroup.Item>


                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    )

}