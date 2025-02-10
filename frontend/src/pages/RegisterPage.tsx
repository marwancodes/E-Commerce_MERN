import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";



const RegisterPage = () => {
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const [error, setError] = useState("");
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        // Validate the form data
        if (!firstName || !lastName || !email || !password) {
            setError("Please fill all fields.");
            return;
        }

        // Make the call to API to create the new user
        try {
            const response = await fetch("http://localhost:4000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                }),
            });
    
            if (!response.ok) {
                setError("Unable to register user, please try diffrent email!");
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


  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 4 }}>

        <Typography variant="h6">Register New Account</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3, border: 1, padding:  4, borderRadius: 5, borderColor: "#f5f5f5" }}>
            
            <TextField inputRef={firstNameRef} label="First Name" name="firstName" sx={{ width: 400}} />
            <TextField inputRef={lastNameRef} label="Last Name" name="lastName" />
            <TextField inputRef={emailRef} label="Email" name="email" />
            <TextField inputRef={passwordRef} type="password" label="Password" name="password" />
            
            <Button variant='contained' onClick={handleSubmit}>Register</Button>
            {error && <Typography sx={{ color: "red", marginX: "auto" }}>{error}</Typography>}
        </Box>

      </Box>
    </Container>
  );
};

export default RegisterPage;
