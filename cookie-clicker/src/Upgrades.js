import React, { useState, useEffect } from 'react'
import { Card, Button, Alert, ListGroup } from 'react-bootstrap'

import { db } from './firebase'
import { collection, getDocs, getDoc, updateDoc, doc, query, where, setDoc, increment } from 'firebase/firestore'

import factoryImg from './assets/factory.png'
import templeImg from './assets/temple.png'
import mineImg from './assets/mine.png'

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
                <Card.Title className='text-center'>
                    Upgrades
                </Card.Title>


                <Card.Body>
                    <ListGroup>


                        <ListGroup.Item id='grandma'>
                            <img src="https://www.clipartmax.com/png/small/18-188588_grandmother-clip-art.png" style={{height: 100}} ></img>Grandma
                            <Button onClick={buyUpgrade}>Buy</Button>
                            <p>Count: {upgrades[0]}</p>

                        </ListGroup.Item>

                        <ListGroup.Item id='mine'>
                            <img src={mineImg} style={{height: 100}} ></img>Cookie Mine
                            <Button onClick={buyUpgrade}>Buy</Button>
                            <p>Count: {upgrades[1]}</p>
                        </ListGroup.Item>

                        <ListGroup.Item id='factory'>
                            <img src={factoryImg} style={{height: 100}} ></img>Factory
                            <Button onClick={buyUpgrade}>Buy</Button>
                            <p>Count: {upgrades[2]}</p>
                        </ListGroup.Item>

                        <ListGroup.Item id='temple'>
                        <img src={templeImg} style={{height: 100}} ></img>Temple
                            <Button onClick={buyUpgrade}>Buy</Button>
                            <p>Count: {upgrades[3]}</p>
                        </ListGroup.Item>


                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    )

}