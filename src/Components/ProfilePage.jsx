import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../Store/userSlice';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const selector = useSelector((store) => store?.user)
  console.log(selector);
  
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    // console.log(user);
    
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/login");
    }
  }, [auth, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Error during sign out:", error.message);
    }
  }

  if (!currentUser) {
    return <div className="text-center my-16 text-2xl ">Loading user data...</div>;
  }

  return (
    <div className='border t my-16 mx-auto w-[90%] shadow-md md:w-[50%]'>
      <h1 className='font-bold text-2xl text-center'>Profile Info</h1>
      <div className='font-semibold my-4 flex flex-col-reverse ml-16 justify-center md:mx-40'>
        
        <h1 className='font-semibold text-2xl'>
          Email: <span className='text-xl mx-2 '>{currentUser.email || "Null"}</span>
        </h1>
        <h1 className='my-4 text-2xl'>
          Name: <span className='text-xl '>{currentUser.displayName || "User"}</span>
        </h1>

        {currentUser.photoURL && (
          <div className="mx-16 my-4">
            <img
              src={currentUser.photoURL}
              alt="User Profile"
              className='rounded-full w-24 h-24'
            />
          </div>
        )}
      </div>
      <button
        className='border px-12 rounded-md my-4 p-2 mx-20  bg-red-600 text-white font-semibold hover:bg-red-500 md:mx-40 md:px-20'
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
