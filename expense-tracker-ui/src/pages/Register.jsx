import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async e => {
    e.preventDefault();
    const loadingToast = toast.loading("Creating your account...");
    try {
      await axios.post('http://localhost:8080/api/auth/register', form);
      toast.update(loadingToast, { render: "Account created! Please log in.", type: "success", isLoading: false, autoClose: 2000 });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      toast.update(loadingToast, { render: "Username may already be taken.", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const textFieldStyles = {
    '& label.Mui-focused': { color: 'white' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.7)' },
      '&:hover fieldset': { borderColor: 'white' },
      '&.Mui-focused fieldset': { borderColor: 'white' },
    },
    input: { color: 'white' },
    label: { color: 'rgba(255, 255, 255, 0.7)' },
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)', p: 3 }}>
      <Container component="main" maxWidth="xs">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Paper elevation={12} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 4, background: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Typography component="h1" variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>Create Account</Typography>
            <Box component="form" onSubmit={handleRegister} sx={{ mt: 1, width: '100%' }}>
              <TextField label="Username" name="username" fullWidth margin="normal" value={form.username} onChange={handleChange} required sx={textFieldStyles} />
              <TextField label="Email" name="email" type="email" fullWidth margin="normal" value={form.email} onChange={handleChange} required sx={textFieldStyles} />
              <TextField label="Password" name="password" type="password" fullWidth margin="normal" value={form.password} onChange={handleChange} required sx={textFieldStyles} />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, p: '12px', fontSize: '16px', background: 'rgba(255, 255, 255, 0.3)', '&:hover': { background: 'rgba(255, 255, 255, 0.4)' } }}>Sign Up</Button>
              <Box textAlign="center" mt={2}>
                <Link to="/login" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>{"Already have an account? Sign In"}</Link>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;
