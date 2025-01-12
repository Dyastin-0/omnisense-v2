import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SigninForm from "../components/forms/SigninForm";
import useAuth from "../hooks/useAuth";

const Signin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className="flex w-full h-full justify-center bg-primary items-center rounded-md">
      <SigninForm />
    </div>
  );
};

export default Signin;
