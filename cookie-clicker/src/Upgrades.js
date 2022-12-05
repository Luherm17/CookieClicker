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

    //showUpgrades()

    const buyUpgrade = async () => {

        console.log("upgrade bought!")

        const q = doc(db, "users", currUser.email)
        
        /*
        await updateDoc(q, {
            grandma: increment(1)

        });
        */

        showUpgrades()

    }

    
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
                                <p>Count: {upgrades[0]}</p>
                                <Button style={{width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f'}}onClick={buyUpgrade}>Buy</Button>
                            </div>
                            
                        </ListGroup.Item>

                        <ListGroup.Item id='mine' className="upgrade-container">

                            <div className="upgrade-container-cell">
                                <img class='upgrade-img' src={mineImg} ></img>
                                <p>Cookie Mine</p>
                            </div>

                            <div className="upgrade-container-cell"> 
                                <p>Count: {upgrades[1]}</p>
                                <Button style={{width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f'}}onClick={buyUpgrade}>Buy</Button>
                            </div>

                        </ListGroup.Item>

                        <ListGroup.Item id='factory' className="upgrade-container">

                            <div className="upgrade-container-cell">
                                <img class='upgrade-img' src={factoryImg} ></img>
                                <p>Factory</p>
                            </div>

                            <div className="upgrade-container-cell"> 
                                <p>Count: {upgrades[2]}</p>
                                <Button style={{width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f'}}onClick={buyUpgrade}>Buy</Button>
                            </div>

                        </ListGroup.Item>


                        <ListGroup.Item id='temple' className="upgrade-container">

                            <div className="upgrade-container-cell">
                                <img class='upgrade-img' src={templeImg} ></img>
                                <p>Cookie Temple</p>
                            </div>

                            <div className="upgrade-container-cell"> 
                                <p>Count: {upgrades[3]}</p>
                                <Button style={{width: '100%', backgroundColor: '#5bc75f', borderColor: '#5bc75f'}}onClick={buyUpgrade}>Buy</Button>
                            </div>

                        </ListGroup.Item>


                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    )

}