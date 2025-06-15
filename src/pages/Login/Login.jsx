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

      // send email backend to get the jwt and set cookie
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

        // send email to backend to recieve jwt in  cookie
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
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loading}
            >
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

          <Button
            variant="secondary"
            className="w-full mt-4 justify-center text-sm"
            asChild
          >
            <Link to="/register" className="w-full text-center">
              Don’t have an account ?
              <span className="text-blue-600 ml-1 ">Sign Up</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
