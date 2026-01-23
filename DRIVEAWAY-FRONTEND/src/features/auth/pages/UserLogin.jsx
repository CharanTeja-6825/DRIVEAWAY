import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { login as loginApi } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import {
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  DirectionsCar,
} from "@mui/icons-material";

function UserLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userEmail: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  // Password validation
  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    // Clear general error
    if (error) {
      setError("");
    }
  };

  // Handle blur for inline validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let fieldError = "";

    if (name === "userEmail") {
      fieldError = validateEmail(value);
    } else if (name === "password") {
      fieldError = validatePassword(value);
    }

    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  // Validate all fields
  const validateForm = () => {
    const emailError = validateEmail(credentials.userEmail);
    const passwordError = validatePassword(credentials.password);

    setErrors({
      userEmail: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { data } = await loginApi(credentials);

      login(data);

      switch (data.role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "DEALER":
          navigate("/dealer");
          break;
        default:
          navigate("/customer");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.response?.data || 
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #224C98 0%, #4682B4 100%)",
        position: "relative",
        overflow: "hidden",
        py: 4,
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={8}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #224C98 0%, #4682B4 100%)",
              color: "white",
              p: 4,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                mb: 2,
                backdropFilter: "blur(10px)",
              }}
            >
              <DirectionsCar sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Sign in to access your DriveAway account
            </Typography>
          </Box>

          {/* Form */}
          <Box sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <Stack spacing={3}>
                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Email Address"
                  name="userEmail"
                  type="email"
                  value={credentials.userEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.userEmail}
                  helperText={errors.userEmail}
                  placeholder="Enter your email"
                  disabled={loading}
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.password}
                  helperText={errors.password}
                  placeholder="Enter your password"
                  disabled={loading}
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            disabled={loading}
                            aria-label="toggle password visibility"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    position: "relative",
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        size={24}
                        sx={{
                          position: "absolute",
                          left: "50%",
                          marginLeft: "-12px",
                        }}
                      />
                      <Box sx={{ opacity: 0 }}>Sign In</Box>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Stack>
            </form>

            {/* Links */}
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Don't have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/register"
                    sx={{
                      color: "primary.main",
                      fontWeight: 600,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>

        {/* Footer Text */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.8)",
            mt: 3,
          }}
        >
          © 2024 DriveAway. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default UserLogin;
