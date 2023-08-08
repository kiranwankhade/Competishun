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

        }
      })
      
    }

    
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