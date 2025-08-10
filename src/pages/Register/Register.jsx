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
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-muted px-6 py-10 gap-10">
      {/* Animation Section */}
      <div className="w-full max-w-md flex justify-center">
        <Lottie
          animationData={registerAnimation}
          loop
          className="w-full max-h-[350px] object-contain"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md bg-background shadow-lg rounded-xl p-8 border">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Input type="text" name="name" placeholder="Full Name" required />
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              name="photoURL"
              placeholder="Profile Photo URL"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button className="w-full" size="lg">
            Register
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
