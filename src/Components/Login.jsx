import React, { useEffect, useRef, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { addUser } from '../Store/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSIgnUp] = useState(false)
  const [isMessage, setIsMessage] = useState('')
  // const selector = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)
  const auth = getAuth(app);

  // Handle form submission (sign up or sign in)
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        // Sign-up logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current?.value,
          password.current?.value
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name.current?.value,
        });

        dispatch(
          addUser({
            uid: user.uid,
            displayName: name.current?.value,
            email: user.email,
          })
        );

        navigate("/");

      } else {
        // Sign-in logic
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current?.value,
          password.current?.value
        );
        const user = userCredential.user;

        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );

        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      setIsMessage(error.message);
    }
  };

  const handleSignUp = () => {
    setIsSIgnUp(!isSignUp);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "User",
            photoURL : user.photoURL
          })
        );
        navigate("/profile");
      } else {
        navigate("/login")
      }
    });

    return () => unsubscribe()
  }, [dispatch, navigate, auth]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "User",
          photoURL : user.photoURL
        })
      );

      navigate("/profile");

    } catch (error) {
      console.error("Error during sign-in:", error.message);
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className='w-96 shadow-md mx-auto my-16'>
      <h1 className='font-bold text-center text-2xl m-4'>{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <div>
        <form action="" onSubmit={handleForm}>
          {isSignUp && (
            <div className='mx-8 border'>
              <label htmlFor="" className='mx-4 text-sm font-semibold'>Name</label>
              <input type="text" ref={name} placeholder='Enter name' className='w-full p-2 px-4 outline-none'/>
            </div>
          )}
          <div className='mx-8 border my-2'>
            <label htmlFor="" className='mx-4 text-sm font-semibold'>Email</label>
            <input type="text" ref={email} placeholder='Enter Email' className='w-full p-2 px-4  outline-none'/>
          </div>
          <div className='mx-8 border my-2'>
            <label htmlFor="" className='mx-4 text-sm font-semibold'>Password</label>
            <input type="password" ref={password} placeholder='Enter password' className='w-full p-2 px-4  outline-none'/>
          </div>

          <button className='bg-red-700 text-white font-semibold rounded-md p-2 my-4 border px-24 mx-16' type='submit'>Submit</button>
        </form>
        <p className='text-red-600'>{isMessage}</p>

        <p className='text-red-600 cursor-pointer mx-8 my-8 hover:underline' onClick={handleSignUp}>{isSignUp ? "Sign In" : "Create an account"}</p>
      </div>
      <h1 className='text-center font-bold text-xl mt-4'>OR</h1>
      <div
        className='flex text-center my-8 cursor-pointer mx-8 border bg-gray-100'
        onClick={handleSignIn}
      >
        <img
          className='h-8 w-8 rounded-full mx-4'
          src="https://img.freepik.com/premium-vector/google-logo-icon-set-google-icon-searching-icons-vector_981536-453.jpg"
          alt="Google Logo"
        />
        <h2 className='font-semibold'>Sign In With Google</h2>
      </div>
    </div>
  );
};

export default Login;
