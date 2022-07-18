import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue} from "firebase/database";
import { getAuth } from "firebase/auth";
import {Alert} from '@mui/material'
const FriendRequest = () => {
    const db = getDatabase();
    const auth = getAuth();
    let [friendRequest,setFriendRequest] = useState([])
    
console.log(friendRequest)
    useEffect(()=>{
        let friendRequestArr = []
        const friendRquestRef = ref(db, 'friendrequest/');
        onValue(friendRquestRef, (snapshot) => {
            snapshot.forEach((item)=>{
                console.log("item.receiverid",item.receiverid)
                console.log("auth.currentUser.uid",auth.currentUser.uid)
             if(item.val().receiverid == auth.currentUser.uid){
                friendRequestArr.push({
                    name: item.val().name,
                    receiverid: item.val().receiverid,
                    senderid: item.val().senderid
                })
             }
                
                
            })
            setFriendRequest(friendRequestArr)
        });
    },[])

  return (
    <div className='grouplist'>
        <h2>Friend  Request</h2>
        {friendRequest.map(item=>(
           
            <div className='box'>
                <div className='img'>
                    <img src='assets/images/friendrequest.png'/>
                </div>
                <div className='name'>
                    <h1>{item.name}</h1>
                    <h4>Hi Guys, Wassup!</h4>
                </div>
                <div className='button'>
                    <button>Accept</button>
                </div>
            </div>
           
        ))}   
        {friendRequest.length==0&&
            <Alert style={{marginTop: "50px"}} severity="info">No Friend Request Here</Alert>
        }  
    </div>
  )
}

export default FriendRequest