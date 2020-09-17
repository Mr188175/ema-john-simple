import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';



export const initializeLoginFramework = () => {
   if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
   }
  

}

// google

export const handleGoogleSign = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
  return  firebase.auth().signInWithPopup( googleProvider)
    .then(res => {
      const {displayName,email,photoURL} = res.user;
      const signedIn = {
       isSignedIn:true,
       name:displayName,
       email:email,
       photo:photoURL
        
        
      }
      return signedIn;
    })
    
  }


// fb
  export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
  return  firebase.auth().signInWithPopup(fbProvider)
  .then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      return user;
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



//   sign out

export const handleSignOut = () => {
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

      return signOut;
    })
}

// new user
// export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//       .then(res => {
//         const newUserInfo = {...user};
//         newUserInfo.error = '';
//         newUserInfo.success = true;
//         setUser(newUserInfo);
        
//         updateUserName(user.name)
        
//       })
//       .catch(error => {
//         // Handle Errors here.
//         const newUserInfo = {...user};
//         newUserInfo.error = error.message;
//         newUserInfo.success = false;
//         setUser(newUserInfo)
//         // ...
//       });
// }


// // sign In user

// export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       var newUserInfo = {...user};
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo);
//       history.replace(from); 
//     })
//     .catch(function(error) {
//       // Handle Errors here.
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo)
//       console.log('sign in user info');
//       // ...
//     });
// }

// // update user name

// const updateUserName = name => {
//     const user = firebase.auth().currentUser;

// user.updateProfile({
//   displayName: name
  
// }).then(function() {
//   // Update successful.
//   console.log('user name update successfully')
// }).catch(function(error) {
//   console.log(error);
// });
// }
