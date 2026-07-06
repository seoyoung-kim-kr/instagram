import type { Metadata } from "next";
import SignInClient from "./sign-in-client";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Signup or Login to Instantgram",
};

export default function SignInPage() {
  return <SignInClient />;
}
