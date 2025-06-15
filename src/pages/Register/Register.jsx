import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import toast from "react-hot-toast";
import registerAnimation from "../../assets/lottie-animations/register-animation.json";
import Lottie from "lottie-react";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Must contain an uppercase letter";
    if (!/[a-z]/.test(password)) return "Must contain a lowercase letter";
    return "";
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    const validationError = validatePassword(password);
    if (validationError) return setError(validationError);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          toast.success("User registration successful!");
          form.reset();
          navigate("/");
        });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-muted p-6 gap-10">
      {/* Lottie animation */}
      <div className="w-full max-w-md">
        <Lottie
          animationData={registerAnimation}
          loop={true}
          className="w-full max-h-[350px] object-contain"
        />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Register to CarWise
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input type="text" name="name" placeholder="Name" required />
          <Input type="email" name="email" placeholder="Email" required />
          <Input type="text" name="photoURL" placeholder="Photo URL" required />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button className="w-full cursor-pointer">Register</Button>
        </form>

        <Button
          variant="secondary"
          className="w-full mt-4 justify-center text-sm"
          asChild
        >
          <Link to="/login" className="w-full text-center">
            Already have an account ?
            <span className="text-blue-600 ml-1 ">Login</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Register;
