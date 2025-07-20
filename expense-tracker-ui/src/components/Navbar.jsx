import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // This hook gives us the current URL path
  const [token, setToken] = useState(localStorage.getItem('jwt'));

  // This effect updates the navbar whenever the user navigates to a new page
  useEffect(() => {
    setToken(localStorage.getItem('jwt'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setToken(null);
    toast.info("You have been logged out.");
    navigate('/'); // Redirect to the landing page after logout
  };

  return (
    <AppBar position="static" sx={{ background: '#2E3B55' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
            ExpenseTracker
          </Link>
        </Typography>

        <Box>
          {token ? (
            // If user is logged in, always show Logout button
            <Button color="inherit" onClick={() => {
              localStorage.removeItem('jwt');
              window.location.href = '/login';
            }}>
              Logout
            </Button>

          ) : (
            // If user is logged out, show buttons ONLY if not on the landing page
            location.pathname !== '/' && (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
