import React, { useState, useEffect } from 'react'
import { Card, Button, Alert, ListGroup } from 'react-bootstrap'

import { db } from './firebase'
import { collection, getDocs, getDoc, updateDoc, doc, query, where, setDoc, increment } from 'firebase/firestore'

export default function Leaderboard({ userList }) {

    

    const users = userList

    return (
        <>

            <Card>
                <Card.Title className='text-center'>
                    Leaderboard
                </Card.Title>


                <Card.Body>
                    <ListGroup numbered={true}>
                        {users.map((user) => {
                            return (
                                <ListGroup.Item>
                                    {user.name}{": "} {user.cookies}

                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    )

}