// NPM Packages
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  
  // Project file
  import { authentification } from "./firebase.js";
  
  // create user using the builtin function in firebase with email and password,
  export async function createUser(email, password) {
    // define payload which hold the data and error. If it is succesful, it holds data and no error. Otherwise, it holds the error
    let payload = { data: undefined, error: false };
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authentification,
        email,
        password,
      );
      payload.data = userCredential.user.uid;
    } catch (error) {
      payload = { data: error, error: true };
    }
    return payload;
  }
  
  // The logic for create user and login user are the same excpet for the builtin function
  export async function loginUser(email, password) {
    let payload = { data: undefined, error: false };
    try {
      const userCredential = await signInWithEmailAndPassword(
        authentification,
        email,
        password,
      );
      payload.data = userCredential.user.uid;
    } catch (error) {
      payload = { data: error, error: true };
    }
    return payload;
  }
  
  // Logic for logOut is pretty simple
  export async function logOut() {
    let payload = { data: undefined, error: false };
    try {
      await signOut(authentification);
      payload.data = false;
    } catch (error) {
      payload = { data: error, error: true };
    }
    return payload;
  }
  