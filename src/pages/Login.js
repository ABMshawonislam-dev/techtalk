import React, {useState,useRef} from 'react'
import { Grid,TextField,Button,Collapse,Alert,IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Link,useNavigate } from 'react-router-dom'
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai';
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider,FacebookAuthProvider  } from "firebase/auth";
const Login = () => {
    const auth = getAuth();
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')

    let [emailerr,setEmailerr] = useState('')
    let [passworderr,setPassworderr] = useState('')
    let [passwordlengtherr,setPasswordlengtherr] = useState('')

    let [checkpassword, setCheckpassword] = useState(false)
    let [wrongemailerr, setWrongemailerr] = useState('')
    let [wrongpassworderr, setWrongpassworderr] = useState('')
   
    let handleSubmit = ()=>{
        console.log('passweord',password.length)
        if(!email){
            setEmailerr('Please Enter An Email')
            
        }else if(!password){
            setPassworderr('Please Enter A Password')
            setEmailerr('')
            
        }else if(password.length < 8){
            setPasswordlengtherr('Password Must Greater that or Equal to 8')
            setPassworderr('')
        }else{
            setPasswordlengtherr('')
            signInWithEmailAndPassword(auth,email,password).then((user)=>{
                navigate('/home')
            }).catch((error)=>{
                const errorCode = error.code;
                console.log(errorCode)
                if(errorCode.includes('user')){
                    setWrongemailerr('Email Not Found, Try Again')
                    setOpen(true)
                    setWrongpassworderr('')
                }else if(errorCode.includes('password')){
                    setWrongpassworderr('Wrong Password')
                    setOpen(true)
                    setWrongemailerr('')
                }
            })
        }
    }

    let handleEye = ()=>{
        setCheckpassword(!checkpassword)
    }

    let handleGoogleSigin = () => {
        console.log("ami Click Hoici")
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                navigate('/home')
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });

    }

    let handleFbSigin = ()=>{
        console.log('fb sign in')
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                navigate('/home')
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                console.log(errorCode)
                // ...
            });
    }
  return (
    <section className='registration-part login-part'>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div className='box'>
                        <div className='left'>
                            <h2>Login to your account! </h2>
                            
                            <div className='loginoption'>
                                <div onClick={handleGoogleSigin} className='option'> <img src="./assets/images/google.png"/> Login with Google</div>
                                <div onClick={handleFbSigin} className='option'> <img src="./assets/images/facebook.png"/> Login with Facebook</div>
                            </div>

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
                                    {wrongemailerr?wrongemailerr:wrongpassworderr&&wrongpassworderr}
                                </Alert>
                            </Collapse>
                           
                            <TextField
                                helperText={emailerr}
                                id="demo-helper-text-misaligned"
                                label="Enter Email"
                                style={{width: '355px',marginTop: '40px'}}
                                type="email"
                                onChange={(e)=> setEmail(e.target.value)}
                            /><br/>
                           <div className='eye'>
                                <TextField
                                        helperText={passworderr ? passworderr : passwordlengtherr ? passwordlengtherr : "" }
                                        id="demo-helper-text-misaligned"
                                        label="Password"
                                        style={{width: '355px',marginTop: '40px'}}
                                        type={checkpassword? 'text': 'password'}
                                        onChange={(e)=> setPassword(e.target.value)}

                                />

                                {checkpassword
                                ?
                                <AiFillEye onClick={handleEye} className='eyeicon' />
                                :
                                <AiFillEyeInvisible onClick={handleEye} className='eyeicon' />
                                }
                           </div>
                            <br/>
                           
                            <Button style={{width: '368px',padding: '25px 0',borderRadius:'8px',background: '#5F35F5'}} variant="contained" onClick={handleSubmit}>Login to Continue</Button>

                            <p className='msg'>Don’t have an account ? <Link to="/">Sign up</Link> </p>
                       
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <img style={{width: '100%',height: '100vh'}} src="./assets/images/loginbg.png"/>
                </Grid>

 
            </Grid>
      </section>
  )
}

export default Login