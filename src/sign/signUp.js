import app from "../Firebas"; // Ensure the path to your Firebase config is correct
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import "./Sign-up.css"; // Import the CSS file
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons

const Navbar = () => {
  const auth = getAuth(app); // Initialize Firebase Auth
  const navigate = useNavigate(); // Initialize useNavigate
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleInput = (event) => {
    const newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  const handleSubmit = async () => {
    if (!data.name || !data.email || !data.password) {
      setError("All fields are required.");
      toast.warning("All fields are required !");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(response.user);
      toast.success("Sign up successful!");

      setTimeout(() => {
        navigate("/welcome");
      }, 5000);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-log">
      <input
        onChange={handleInput}
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        value={data.name}
      />
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
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
      {error && <p className="error">{error}</p>}
      <a href="/" className="link">
        Login
      </a>
      <ToastContainer className="tast-css" />
    </div>
  );
};

export default Navbar;
