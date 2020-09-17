import React, { useState } from 'react';


import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser,setNewUser] = useState(false)
  const [user,setUser] = useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:'',
    photo:''
  })
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  // sign in button handler
  const handleSign = () => {
    firebase.auth().signInWithPopup( googleProvider)
    .then(res => {
      const {displayName,email,photoURL} = res.user;
      const signedIn = {
       isSignedIn:true,
       name:displayName,
       email:email,
       photo:photoURL
        
        
      }
      setUser(signedIn);
    })
  }

  const fbHandleChange = () => {
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log('fb change')
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
// sign out button handler
  const handleSignOut = () => {
      firebase.auth().signOut()
      .then(res => {
        const signOut = {
          isSignedIn:false,
          name:'',
          email:'',
          photo: '',
          error:'',
          success:false
        }

        setUser(signOut);
      })
  }

//   userContext

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

//  submit button
  const handleSubmit = (e) => {
 
    if(newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        
        updateUserName(user.name)
        
      })
      .catch(error => {
        // Handle Errors here.
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo)
        // ...
      });
    }

    if(!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        var newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from); 
      })
      .catch(function(error) {
        // Handle Errors here.
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo)
        console.log('sign in user info');
        // ...
      });
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

  const updateUserName = name => {
            const user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name
          
        }).then(function() {
          // Update successful.
          console.log('user name update successfully')
        }).catch(function(error) {
          console.log(error);
        });
  }


  return (
    <div style = {{textAlign:'center'}}>
       {
       
       user.isSignedIn ?  <button onClick={handleSignOut}>sign Out</button>:<button onClick={handleSign}>sign in</button>
        
        }
        <br/>

        <button onClick = {fbHandleChange}>Sign in using facebook</button>
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
