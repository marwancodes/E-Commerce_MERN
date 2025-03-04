import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const [error, setError] = useState("");

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        // Validate the form data
        if (!email || !password) {
            setError("Please fill all fields.");
            return;
        }

        // Make the call to API to create the new user
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
    
            if (!response.ok) {
                setError("Email or Password Inccorect, Please try again!");
                return;
            }
    
            const token = await response.json();
            // console.log(token);
            if (!token) {
                setError("Incorrect token");
                return;
              }

            login(email,token);
            navigate('/');
        } catch (err) {
            console.error("Error creating item:", err);
        }

    }

    const goToCreate = () => {
      navigate('/register')
    }

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 4 }}>

        <Typography variant="h6">Login to your account</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3, border: 1, padding:  4, borderRadius: 5, borderColor: "#f5f5f5" }}>
            
            <TextField inputRef={emailRef} label="Email" name="email" sx={{ width: 400}}/>
            <TextField inputRef={passwordRef} type="password" label="Password" name="password" />
            
            <Button variant='contained' onClick={handleSubmit}>Login</Button>
            {error && <Typography sx={{ color: "red", marginX: "auto" }}>{error}</Typography>}
        </Box>

        <Button onClick={goToCreate}>Create New Account</Button>

      </Box>
    </Container>
  );
};

export default LoginPage;
