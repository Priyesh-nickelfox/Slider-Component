import {
    FormControl,
    TextField,
    Box,
    Typography,
    Button,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import auth from '../Firebase/FirebaseConfig';
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { Link } from "react-router-dom";

  
  const Login = () => {
    const [login, setLogin] = useState({
      email: "",
      password: "",
    });
  
    const [error, setError] = useState({});

    const navigate = useNavigate();
  
    const validate = () => {
      const errors = {};
      if (!login.email) errors.email = "Email is required";
      else if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(login.email))
        errors.email = "Invalid email";
  
      if (!login.password) errors.password = "Password is required";
      else if (!/^[a-zA-Z0-9]{8,20}$/.test(login.password))
        errors.password = "Invalid password";
  
      setError(errors);
      return Object.keys(errors).length === 0;
    };
  
    const handleSubmit = (e) => {      
      e.preventDefault();
  
      if (!validate()) return;

      const { email, password } = login;

      try {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential); 
          navigate("/slider");
        })
        .catch((error) => {
          console.log(error);
        })
      } catch (error) {
        setError( "Login failed!!" );
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setLogin((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#000",
        }}
      >
        <Box
          sx={{
            border: "1px solid #333",
            padding: "30px 50px 50px 50px",
            borderRadius: "20px",
            backgroundColor: "#eee",
            position: "relative",
          }}
        >
          <Typography sx={{ marginBottom: "20px", fontSize: "25px", textAlign: 'center', fontWeight: '900', textTransform: 'none' }}>
            Login Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <FormControl>
                <TextField
                  name="email"
                  label="Email"
                  value={login.email}
                  onChange={handleChange}
                  error={!!error.email}
                  helperText={error.email}
                  sx={{ width: "300px", borderRadius: "20px" }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  value={login.password}
                  onChange={handleChange}
                  error={!!error.password}
                  helperText={error.password}
                  sx={{ width: "300px", borderRadius: "20px" }}
                />
              </FormControl>
              {error.server && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {error.server}
                </Typography>
              )}
              <Box sx={{textAlign: 'center'}}>
              <Button
                type="submit"
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  width: "100px",
                  textAlign: "center",
                  borderRadius: "10px",
                  background: "linear-gradient(to right, #D05DB8, #6E62E5)",
                  "&:hover": {
                    background: "linear-gradient(to right, #D05DB8, #6E62E5)",
                  },
                }}
              >
                Login
              </Button>
             </Box>
            </Box>
          </form>
          <Box sx={{textAlign: 'center', marginTop: '20px'}}>
          <Link to="/register" style={{fontWeight: '900', fontSize: '16px', textDecoration: 'none'}}>Register Here</Link>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default Login;