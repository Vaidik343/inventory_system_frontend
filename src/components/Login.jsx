import { Box, Button, Container, TextField, Typography , CircularProgress} from '@mui/material'
import React, { useState } from 'react'
import {useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const {login, loading } = useAuth();
    const navigate = useNavigate();
    const [form , setForm] = useState({
        email:"",
        password:"",
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(form);

        if(result){
            setForm("");
            navigate("/");
        }
    }
  return (
    <Container>
    <Box>
        <Typography variant='h6' fontWeight="bold" gutterBottom>User Login</Typography>
        
        <form onSubmit={handleSubmit} style={{width: "100%"}}>
            <TextField  label="Email Address"
                name='email'
                type='email'
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
            
            />
            <TextField  label="Password"
                name='password'
                type='password'
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
            
            />

            <Button 
                type='submit'
                variant='contained'
                fullWidth
                disabled={loading}
            >{loading ? <CircularProgress size={24} /> : "Login"}</Button>

        </form>
<Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
            Register here
          </Link>
        </Typography>
    </Box>
    </Container>
  )
}

export default Login