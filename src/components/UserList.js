import React, { useEffect, useState } from 'react'
import { getDatabase,set , ref, onValue,push} from "firebase/database";
import { getAuth } from "firebase/auth";
const UserList = () => {
    const auth = getAuth();
    const db = getDatabase();
    // console.log(auth.currentUser)
    
let [userlist,setUserlist] = useState([])

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

    let handleFriendRequest = (info)=>{
        set(push(ref(db, 'friendrequest')), {
            name: auth.currentUser.displayName,
            receiverid: info.id,
            senderid: auth.currentUser.uid
        });
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
                <div className='button'>
                    <button onClick={()=>handleFriendRequest(item)}>+</button>
                </div>
            </div>
        ))}
        
        
        
    </div>
  )
}

export default UserList