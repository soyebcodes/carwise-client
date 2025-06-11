import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";

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
    <div className="max-w-md mx-auto p-6 mt-24">
      <h2 className="text-2xl font-bold text-center text-primary mb-12">
        Register to Savor Book
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

        <Button>Register</Button>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account?
        <Link to="/login" className="text-blue-600 ml-2">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
