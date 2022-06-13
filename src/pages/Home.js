import React,{useState,useEffect} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {Alert,Grid} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Leftbar from '../components/Leftbar';


const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate()

  const [emailverify,setEmailverify] = useState(false)
    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user)
          setEmailverify(user.emailVerified)
        } else {
          navigate('/login')
        }
      });
    },[])
  return (

    <>
      {emailverify
        ?
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Leftbar active="home"/>
          </Grid>
          <Grid item xs={4}>
            middle
          </Grid>
          <Grid item xs={3}>
            middle right
          </Grid>
          <Grid item xs={3}>
            right
          </Grid>
        </Grid>
        :
        
        <Grid container spacing={2}>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
                <Alert variant="filled" severity="info">
                  Please Check Your Email For Varification
                </Alert>
            </Grid>
            <Grid item xs={4}>
            </Grid>
      </Grid>
      }
    </>
  )
}

export default Home