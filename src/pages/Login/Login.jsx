import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "../../context/AuthContext";
import auth from "../../firebase/firebase.config";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/lottie-animations/login-animation.json";
import axios from "axios";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Send email to backend to get JWT and set cookie
      await axios.post(
        "https://carwise-server.onrender.com/jwt",
        { email: result.user.email },
        { withCredentials: true }
      );
      toast.success("Login successful!");
      setUser(result.user);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        toast.success("Google Login successful!");
        setUser(result.user);

        // Send email to backend to receive JWT in cookie
        await axios.post(
          "https://carwise-server.onrender.com/jwt",
          { email: result.user.email },
          { withCredentials: true }
        );
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-muted px-6 py-10 gap-8">
      {/* Animation */}
      <div className="w-full max-w-md flex justify-center">
        <Lottie
          animationData={loginAnimation}
          loop
          className="w-full max-h-[350px] object-contain"
        />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md border shadow-lg rounded-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Login to CarWise</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              ref={emailRef}
              type="email"
              placeholder="Email Address"
              required
            />
            <Input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              required
            />
            <div className="text-right text-sm">
              <Link
                to="/forget-password"
                className="text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              size="lg"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Separator className="my-6" />

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
