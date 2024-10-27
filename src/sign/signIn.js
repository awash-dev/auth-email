import app from "../Firebas"; // Ensure the correct path to your Firebase config
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // If you're using React Router for navigation
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons

const Navbar = () => {
  const auth = getAuth(app); // Initialize Firebase Auth
  const navigate = useNavigate(); // Initialize useNavigate
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleInput = (event) => {
    const newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  const handleSubmit = async () => {
    if (!data.email || !data.password) {
      setError("Email and password are required.");
      toast.warning("Email and password are required."); // Show error toast
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(response.user);
      toast.success("Login successful!"); // Show success toast
      // Redirect after a 5-second delay
      setTimeout(() => {
        navigate("/welcome"); // Change this to your desired route
      }, 5000);
    } catch (err) {
      let errorMessage;

      // Customize error messages based on Firebase error codes
      switch (err.code) {
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        default:
          errorMessage = "An error occurred. Please try again.";
      }

      setError(errorMessage); // Display the custom error message
      toast.error(errorMessage); // Show error toast
    }
  };

  return (
   <div className="container-log" >
      <input
        onChange={handleInput}
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={data.email}
      />
      <div className="password-container">
        <input
          onChange={handleInput}
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Password"
          value={data.password}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="eye-button"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <button
        className="btn"
        onClick={handleSubmit}
        type="button"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
      {error && <p className="error">{error}</p>}
      <a href="/sign-up" className="link">
        Register
      </a>
      <ToastContainer className="tast-css" />{" "}
      {/* Add ToastContainer to your component */}
    </div>
  );
};

export default Navbar;
