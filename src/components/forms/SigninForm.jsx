import { useState } from "react";
import useToast from "../hooks/useToast";
import Input from "../ui/Input";
import Omnisense from "../Omnisense";
import Button from "../ui/Button";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Separator from "../ui/Separator";
import { signIn, signInWithGoogle } from "../../config/auth";

const SigninForm = () => {
  const { toastInfo } = useToast();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async (e) => {
    e.preventDefault();

    toastInfo("Signing in...");

    if (!email || !password) {
      setIsSigningIn(false);
      toastInfo("Missing required fields.");
      return;
    }
    if (!isSigningIn) {
      setIsSigningIn(true);
      await signIn(email, password)
        .then(() => {
          setIsSigningIn(false);
          toastInfo("Signed in!");
        })
        .catch(() => {
          toastInfo("Incorrect email or password.");
          setIsSigningIn(false);
        });
    }
  };

  return (
    <form
      onSubmit={logIn}
      className="flex flex-col w-[250px] gap-2 p-4 max-w-full text-primary-foreground rounded-md border border-secondary-accent
        text-xs"
    >
      <Omnisense />
      <Input
        type="text"
        onChange={(e) => setEmail(e.currentTarget.value)}
        placeholder="email"
        value={email}
        required={true}
        autoComplete="email"
      />
      <Input
        type="password"
        onChange={(e) => setPassword(e.currentTarget.value)}
        placeholder="password"
        value={password}
        required={true}
        autoComplete="current-password"
      />
      <Button type="submit" className="w-full bg-secondary" text="Sign in" />
      <Separator />
      <span className="text-primary-foreground text-center text-xs w-full">
        or continue with
      </span>
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          if (!isSigningIn) {
            signInWithGoogle();
          }
        }}
        className="w-full bg-secondary"
        icon={faGoogle}
        text="Google"
      />
    </form>
  );
};

export default SigninForm;
