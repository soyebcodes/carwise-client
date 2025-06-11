import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "../context/AuthContext";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loginAnimation from "../assets/lottie-animations/login-animation.json";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        toast.success("Login successful!");
        setUser(result.user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Google Login successful!");
        setUser(result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-muted p-6 gap-6">
      <div className="w-full max-w-md">
        <Lottie animationData={loginAnimation} loop={true} />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Login to CarWise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input ref={emailRef} type="email" placeholder="Email" required />
            <Input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              required
            />
            <div className="text-right text-sm">
              <Link
                to="/forget-password"
                className="hover:underline text-blue-500"
              >
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Separator className="my-6" />

          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </Button>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
