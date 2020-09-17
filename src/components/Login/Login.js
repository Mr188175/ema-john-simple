import React, { useState } from 'react';



import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSign, initializeLoginFramework, handleSignOut, handleFbSignIn} from './loginManager';



function Login() {
  const [newUser,setNewUser] = useState(false)
  const [user,setUser] = useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:'',
    photo:''
  })
 
 

  // sign in button handler
  

  
// sign out button handler
  

//   userContext
  initializeLoginFramework();
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

//  submit button
  const handleSubmit = (e) => {
 
    if(newUser && user.email && user.password) {
      
    }

    if(!newUser && user.email && user.password) {
     
    }
    e.preventDefault();
  }
// for getting the value
  const handleBlur = (e) => {
    let isFieldValid = true;
// is email valid
    if (e.target.name === 'email') {
         isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
       
    }
//  for getting the password value
    if (e.target.name === 'password') {
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
       isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if(isFieldValid) {
     const newUserInfo = {...user};
     newUserInfo[e.target.name] = e.target.value;
     setUser(newUserInfo);
    }
  }

  

  // googleSign IN

  const googleSignIn = () => {
    handleGoogleSign()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from)
    })
  }

  // sign out
const signOut  = () => {
  handleSignOut()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
  })

}


// fb

const fbSignIn = () => {
  handleFbSignIn()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
    
  })
}
  return (
    <div style = {{textAlign:'center'}}>
       {
       
       user.isSignedIn ?  <button onClick={signOut}>sign Out</button>:<button onClick={googleSignIn}>sign in</button>
        
        }
        <br/>

        <button onClick = {fbSignIn}>Sign in using facebook</button>
        {
          user.isSignedIn && <div>
            <p>Welcome {user.name}</p>
            <p>Your Email is {user.email}</p>
            <img src={user.photo} alt=""/>
          </div>
        }

        <h1>Our own authentication</h1>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New user sign up</label>
          {/* form */}
        <form onSubmit={handleSubmit}>
        {newUser && <input onBlur={handleBlur} placeholder= "enter your name" type="text" name="name" id=""/>}
        <br/>
        <br/>
        <input onBlur={handleBlur} type="text" placeholder="Enter your email" required name="email" id=""/>
        <br/>
        <br/>
        <input onBlur={handleBlur} type="password" placeholder="Enter your password" name="password" id="" required/>
        <br/>
        <br/>
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
        </form>
        <p style={{color:"red"}}>{user.error}</p> 
        {user.success &&   <p style={{color:"green"}}>user {newUser ? "created" : "logged in" } successfully</p> }
    </div>
  );
}

export default Login;
