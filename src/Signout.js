import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const navigate = useNavigate();
  signOut(auth).then(() => {
    navigate("/signin");
  }).catch((error)=> {
    navigate("/");
  });
  // return (
  //   <main>
  //     signout
  //   </main>
  // );
};

export default Signout;