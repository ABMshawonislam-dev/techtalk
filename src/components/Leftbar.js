import React,{useEffect, useState} from 'react'

import {AiOutlineHome} from 'react-icons/ai'
import {MdSms} from 'react-icons/md'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {RiLogoutBoxRLine} from 'react-icons/ri'
import {FiSettings} from 'react-icons/fi'
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import { Link,useNavigate } from 'react-router-dom'
import {Modal,Box,Typography} from '@mui/material'


const Leftbar = (props) => {
    const navigate = useNavigate()
    const auth = getAuth();

    const [name,setName] = useState('')
    const [open,setOpen] = useState(false)

    let handleModalOpen = ()=>{
        setOpen(true)
    }
    let handleClose = ()=>{
        setOpen(false)
    }

    let handleSignout = ()=>{
        signOut(auth).then(() => {
            console.log("Log Out")
            navigate('/login')
          }).catch((error) => {
            console.log(error)
          });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setName(user.displayName)
          } 
        });
      },[])
  return (
    <div className='leftbar'>
        <img className='profilepic' src="assets/images/loginbg.png"/>
        <h5 onClick={handleModalOpen}>{name}</h5>

        <div className='icons'>
            <ul>
                <li className={props.active == 'home' && 'active'}>
                    <AiOutlineHome className='icon'/>
                </li>
                <li className={props.active == 'msg' && 'active'}>
                    <MdSms className='icon'/>
                </li>
                <li className={props.active == 'notification' && 'active'}>
                    <IoMdNotificationsOutline className='icon'/>
                </li>
                <li className={props.active == 'setting' && 'active'}>
                    <FiSettings className='icon'/>
                </li>
                <li onClick={handleSignout}>
                    <RiLogoutBoxRLine className='icon'/>
                </li>
            </ul>
            
           
            
            
            

        </div>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="leftbarmodal"
        >
        <Box className='leftbarbox'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
        </Box>
        </Modal>

    </div>
  )
}

export default Leftbar