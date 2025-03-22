import { SignUp } from "@clerk/clerk-react";
import React from "react";

function Signup() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 mt-5">
      <SignUp />
    </div>
  );
}

export default Signup;
