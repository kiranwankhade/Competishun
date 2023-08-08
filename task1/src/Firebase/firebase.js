import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";


import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

 const firebaseConfig = {
  apiKey: "AIzaSyBpBpOyx2H6CMZpM4ze3uzKkaNaLHt7Ld0",
  authDomain: "competishun-coding.firebaseapp.com",
  projectId: "competishun-coding",
  storageBucket: "competishun-coding.appspot.com",
  messagingSenderId: "269534109398",
  appId: "1:269534109398:web:ce2fbe1f7cd3df7bc03377",
  measurementId: "G-WNWQLBVD96"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();



const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    console.log('user:', user);

    const userDetails = await fetch('https://glossy-nifty-market.glitch.me/competishunUsers');
    const data = await userDetails.json();

    // const data = JSON.parse(localStorage.getItem("users"));
    console.log('userDetails:', data)

    if(data.length === 0){
      let obj = {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        favorites:[],
        watchList:[]
      } 

      try{
          fetch('https://glossy-nifty-market.glitch.me/competishunUsers', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(obj),
          }).then((response) => {
            return response.json();
          })
      }
      catch(err){
        console.log('err:', err)

      }

      // localStorage.setItem("users",JSON.stringify(obj));
    }else{
      data.map((el) => {
        if(el.email !== user.email){
          let obj = {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
            favorites:[],
            watchList:[]
          } 
  
          try{
            fetch('https://glossy-nifty-market.glitch.me/competishunUsers', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(obj),
          }).then((response) => {
  
            return response.json();
          })
          }catch(err){
            console.log('err:', err)
          }

          // data.push(obj)
          // localStorage.setItem("users",JSON.stringify(data));
        }
      })
      
    }

    // let arr = [];

    // let obj = {
    //   uid: user.uid,
    //   name: user.displayName,
    //   authProvider: "google",
    //   email: user.email,
    //   photoURL:user.photoURL,
    //   favorites: [],
    //   watchList:[]
    // } 

    // // arr.push(obj)

    // localStorage.setItem("userDetails",JSON.stringify(obj));
   
    
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        fav:[]
      });
     
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const userDetails = await fetch('https://glossy-nifty-market.glitch.me/competishunUsers');
    const data = await userDetails.json();

    // const data = JSON.parse(localStorage.getItem("users"));


    // let arr = [];

    // let obj = {
    //   uid: user.uid,
    //   name: name,
    //   authProvider: "local",
    //   email: email,
    //   photoURL:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
    //   favorites:[],
    //   watchList:[]
    // } 

    // arr.push(obj)

    // localStorage.setItem("userDetails",JSON.stringify(arr));
    

    if(data.length === 0){
      let obj = {
        uid: user.uid,
        name: name,
        authProvider: "local",
        email: email,
        photoURL:user.photoURL,
        favorites:[],
        watchList:[]
      } 

        fetch('https://glossy-nifty-market.glitch.me/competishunUsers', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(obj),
      }).then((response) => {
        return response.json();
      }).catch((err)=>{
        console.log('err:', err)

      })

      // localStorage.setItem("users",JSON.stringify(obj));
    }else{
      data.map((el) => {
        if(el.email !== user.email){
          let obj = {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email: email,
            favorites:[],
            watchList:[]
          } 
  
          try{
            fetch('https://glossy-nifty-market.glitch.me/competishunUsers', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(obj),
          }).then((response) => {
  
            return response.json();
          })
          }catch(err){
            console.log('err:', err)
          }

          // data.push(obj)
          // localStorage.setItem("users",JSON.stringify(data));
        }
      })
    }

    

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });

   
  } catch (err) {
    console.error(err);
    // alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  logInWithEmailAndPassword,
  sendPasswordResetEmail,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};