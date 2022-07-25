import React, { useEffect, useState } from 'react'
import { getDatabase,set , ref, onValue,push} from "firebase/database";
import { getAuth } from "firebase/auth";
import { BsCheck } from 'react-icons/bs';
const UserList = () => {
    const auth = getAuth();
    const db = getDatabase();
    // console.log(auth.currentUser)
    
let [userlist,setUserlist] = useState([])
let [friendRequest,setFriendRequest] = useState([])
let [friendRequest2,setFriendRequest2] = useState([])
let [change,setChange] = useState(false)

useEffect(()=>{
        let userArr = []
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {

            
            snapshot.forEach((item)=>{
                userArr.push({
                    username: item.val().username,
                    email: item.val().email,
                    id: item.key
                })
                
            })
            setUserlist(userArr)
        });
    },[])

    useEffect(()=>{
        let friendRequestArr = []
        let friendRequestArr2 = []
        const friendRquestRef = ref(db, 'friendrequest/');
        onValue(friendRquestRef, (snapshot) => {
            snapshot.forEach((item)=>{
                console.log("item.receiverid",item.receiverid)
                console.log("auth.currentUser.uid",auth.currentUser.uid)
             
                friendRequestArr.push(item.val().receiverid)
                friendRequestArr2.push(item.val().senderid)
            
                
                
            })
            setFriendRequest(friendRequestArr)
            setFriendRequest2(friendRequestArr2)
        });
    },[change])
    console.log(friendRequest2)


    let handleFriendRequest = (info)=>{
        set(push(ref(db, 'friendrequest')), {
            name: auth.currentUser.displayName,
            receiverid: info.id,
            senderid: auth.currentUser.uid
        });
        setChange(!change)
    }

  return (
    <div className='grouplist friendlist userlist'>
        <h2>User List</h2>

        {userlist.map(item=>(
            auth.currentUser.uid !== item.id &&
            <div className='box'>
                <div className='img'>
                    <img src='assets/images/groupimg.png'/>
                </div>
                <div className='name'>
                    <h1>{item.username}</h1>
                    <h4>{item.email}</h4>
                </div>
                {friendRequest.includes(item.id) && friendRequest2.includes(auth.currentUser.uid) || friendRequest.includes(auth.currentUser.uid) && friendRequest2.includes(item.id) ?
                
                
                <div className='button'>
                    <button><BsCheck/></button>
                </div>
                :
                <div className='button'>
                    <button onClick={()=>handleFriendRequest(item)}>+</button>
                </div>
                }
            </div>
        ))}
        
        
        
    </div>
  )
}

export default UserList