import {
    FormControl,
    TextField,
    Box,
    Typography,
    Button,
  } from "@mui/material";
  import React, { useState } from "react";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import auth from '../Firebase/FirebaseConfig';
  import { Link } from "react-router-dom";


  
  const SignUp = () => {
    const [register, setRegister] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    });
  
    const [error, setError] = useState({});
  
    const validate = () => {
      const errors = {};
      if (!register.firstName) errors.firstName = "First name is required";
      if (!register.phone) errors.phone = "Phone is required";
      else if (!/^[0-9]{10}$/.test(register.phone))
        errors.phone = "Phone number must be 10 digits";
      if (!register.email) errors.email = "Email is required";
      else if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(register.email))
        errors.email = "Invalid email";
      if (!register.password) errors.password = "Password is required";
      else if (!/^[a-zA-Z0-9]{8,20}$/.test(register.password))
        errors.password = "Password must be 8-20 characters long";
  
      setError(errors);
      return Object.keys(errors).length === 0;
    };
  
    const handleSubmit = (e) => {     
      e.preventDefault();

      const { email, password } = register;

      if (!validate()) return;

          try {
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential);
          })
          .catch((error) => {
            console.log(error);
          })
          }
          catch(error) {
            console.log(error);
          }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setRegister((prev) => ({
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
            Register Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <FormControl>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={register.firstName}
                  onChange={handleChange}
                  error={!!error.firstName}
                  helperText={error.firstName}
                  sx={{ width: "300px", borderRadius: "20px" }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name="lastName"
                  label="Last Name"
                  value={register.lastName}
                  onChange={handleChange}
                  error={!!error.lastName}
                  helperText={error.lastName}
                  sx={{ width: "300px", borderRadius: "20px" }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name="phone"
                  label="Phone"
                  value={register.phone}
                  onChange={handleChange}
                  error={!!error.phone}
                  helperText={error.phone}
                  sx={{ width: "300px", borderRadius: "20px" }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name="email"
                  label="Email"
                  value={register.email}
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
                  value={register.password}
                  onChange={handleChange}
                  error={!!error.password}
                  helperText={error.password}
                  sx={{ width: "300px", borderRadius: "20px" }}
                />
              </FormControl>
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
                SignUp
              </Button>
             </Box>
            </Box>
          </form>
          <Box sx={{textAlign: 'center', marginTop: '30px'}}>
          <Link to="/login" style={{fontWeight: '900', fontSize: '16px', textDecoration: 'none'}}>Go Back To Login Page</Link>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default SignUp;