import React, { useState } from 'react'
import { Grid,TextField,Button,Collapse,Alert,IconButton, } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Link,useNavigate  } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification  } from "firebase/auth";

const Registration = () => {

    const auth = getAuth();
    const [open, setOpen] = React.useState(false);
    let navigate = useNavigate();
    let [name,setName] = useState('')
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')
    let [confirmpassword,setConfirmpassword] = useState('')

    let [nameerr,setNameerr] = useState('')
    let [emailerr,setEmailerr] = useState('')
    let [passworderr,setPassworderr] = useState('')
    let [confirmpassworderr,setConfirmpassworderr] = useState('')
    let [passwordlengtherr,setPasswordlengtherr] = useState('')
    let [matchPassword,setMatchPassword] = useState('')
    let [exitsemailerr,setExitsemailerr] = useState('')

   
    let handleSubmit = ()=>{
        console.log('passweord',password.length)
        if(!name){
            setNameerr('Please Enter A Name')
        }else if(!email){
            setEmailerr('Please Enter An Email')
            setNameerr('')
            
        }else if(!password){
            setPassworderr('Please Enter A Password')
            setEmailerr('')
            
        }else if(password.length < 8){
            setPasswordlengtherr('Password Must Greater that or Equal to 8')
            setPassworderr('')
        }else if(!confirmpassword){
            setConfirmpassworderr('Please Confirm Your Password')
            setPasswordlengtherr('')
        }else if (password !== confirmpassword){
            
                setConfirmpassworderr('')
                setMatchPassword('Password not matched')
            
        }else{
            setMatchPassword('')
            createUserWithEmailAndPassword(auth,email,password).then((user)=>{
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    console.log('Email Send')
                });
                navigate('/login')
            }).catch((error)=>{
                const errorCode = error.code;
                if(errorCode.includes('email')){
                    setExitsemailerr('Email Already in Use. Please Try Another Email')
                    setOpen(true)
                }
            })
        }
    }


  return (
      <section className='registration-part'>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div className='box'>
                        <div className='left'>
                            <h2>Get started with easily register</h2>
                            <p style={{marginBottom:'20px'}}>Free register and you can enjoy it</p>

                            <Collapse in={open}>
                                <Alert
                                variant="filled"
                                severity="error"
                                action={
                                    <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                    >
                                    <CloseIcon fontSize="inherit" />
                                    
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                                >
                                    {exitsemailerr}
                                </Alert>
                            </Collapse>
                            <TextField
                                helperText={nameerr}
                                id="demo-helper-text-misaligned"
                                label="Full Name"
                                style={{width: '355px',marginTop: '40px'}}
                                type="text"
                                onChange={(e)=> setName(e.target.value)}
                            /> <br/>
                            <TextField
                                helperText={emailerr}
                                id="demo-helper-text-misaligned"
                                label="Enter Email"
                                style={{width: '355px',marginTop: '40px'}}
                                type="email"
                                onChange={(e)=> setEmail(e.target.value)}
                            /><br/>
                            <TextField
                                 helperText={passworderr ? passworderr : passwordlengtherr ? passwordlengtherr : "" }
                                id="demo-helper-text-misaligned"
                                label="Password"
                                style={{width: '355px',marginTop: '40px'}}
                                type="password"
                                onChange={(e)=> setPassword(e.target.value)}
                            /><br/>
                            <TextField
                                helperText={confirmpassworderr?confirmpassworderr:matchPassword?matchPassword:""}
                                id="demo-helper-text-misaligned"
                                label="Confirm Password"
                                style={{width: '355px',marginTop: '40px'}}
                                type="password"
                                onChange={(e)=> setConfirmpassword(e.target.value)}
                            /><br/>
                            <Button style={{width: '368px',padding: '10px 0',borderRadius:'86px',background: '#5F35F5',marginTop:'40px'}} variant="contained" onClick={handleSubmit}>Sign up</Button>

                            <p className='msg'>Already have an account ? <Link to="/login">Login</Link> </p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <img style={{width: '100%',height: '100vh'}} src="./assets/images/registrationbg.png"/>
                </Grid>

 
            </Grid>
      </section>
    
  )
}

export default Registration