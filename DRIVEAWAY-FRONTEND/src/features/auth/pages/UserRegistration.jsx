import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { register } from "../services";
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
  MenuItem,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  DirectionsCar,
  Cake,
} from "@mui/icons-material";

function UserRegistration() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    userPhone: "",
    userAge: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    userPhone: "",
    userAge: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation functions
  const validateName = (name) => {
    if (!name || !name.trim()) {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (name.trim().length > 50) {
      return "Name must not exceed 50 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return "Name can only contain letters and spaces";
    }
    return "";
  };

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

  const validateAge = (age) => {
    if (!age) {
      return "Age is required";
    }
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) {
      return "Please enter a valid age";
    }
    if (ageNum < 18) {
      return "You must be at least 18 years old";
    }
    if (ageNum > 100) {
      return "Please enter a valid age";
    }
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone) {
      return "Phone number is required";
    }
    // Remove spaces and dashes for validation
    const cleanPhone = phone.replace(/[\s-]/g, "");
    if (!/^\d{10}$/.test(cleanPhone)) {
      return "Please enter a valid 10-digit phone number";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (password.length > 50) {
      return "Password must not exceed 50 characters";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      return "Please confirm your password";
    }
    if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear general messages
    if (error) setError("");
    if (message) setMessage("");
  };

  // Handle blur for inline validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let fieldError = "";

    switch (name) {
      case "userName":
        fieldError = validateName(value);
        break;
      case "userEmail":
        fieldError = validateEmail(value);
        break;
      case "userAge":
        fieldError = validateAge(value);
        break;
      case "userPhone":
        fieldError = validatePhone(value);
        break;
      case "password":
        fieldError = validatePassword(value);
        // Also revalidate confirm password if it has a value
        if (user.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: validateConfirmPassword(user.confirmPassword, value),
          }));
        }
        break;
      case "confirmPassword":
        fieldError = validateConfirmPassword(value, user.password);
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  // Validate all fields
  const validateForm = () => {
    const nameError = validateName(user.userName);
    const emailError = validateEmail(user.userEmail);
    const ageError = validateAge(user.userAge);
    const phoneError = validatePhone(user.userPhone);
    const passwordError = validatePassword(user.password);
    const confirmPasswordError = validateConfirmPassword(
      user.confirmPassword,
      user.password
    );

    setErrors({
      userName: nameError,
      userEmail: emailError,
      userAge: ageError,
      userPhone: phoneError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    return (
      !nameError &&
      !emailError &&
      !ageError &&
      !phoneError &&
      !passwordError &&
      !confirmPasswordError
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setMessage("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = user;
      // Convert userAge to number
      const registrationData = {
        ...userData,
        userAge: parseInt(userData.userAge),
      };

      const response = await register(registrationData);
      
      if (response.data) {
        setMessage("Registration successful! Redirecting to login...");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Registration failed. Please try again."
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
              Create Account
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Join DriveAway and start your journey
            </Typography>
          </Box>

          {/* Form */}
          <Box sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {message && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {message}
              </Alert>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <Stack spacing={3}>
                {/* Name Field */}
                <TextField
                  fullWidth
                  label="Full Name"
                  name="userName"
                  type="text"
                  value={user.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.userName}
                  helperText={errors.userName}
                  placeholder="Enter your full name"
                  disabled={loading}
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Email Address"
                  name="userEmail"
                  type="email"
                  value={user.userEmail}
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

                {/* Age and Phone in a row on larger screens */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  {/* Age Field */}
                  <TextField
                    fullWidth
                    label="Age"
                    name="userAge"
                    type="number"
                    value={user.userAge}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.userAge}
                    helperText={errors.userAge}
                    placeholder="18"
                    disabled={loading}
                    required
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Cake sx={{ color: "text.secondary" }} />
                          </InputAdornment>
                        ),
                        inputProps: { min: 18, max: 100 },
                      },
                    }}
                  />

                  {/* Phone Field */}
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="userPhone"
                    type="tel"
                    value={user.userPhone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.userPhone}
                    helperText={errors.userPhone}
                    placeholder="1234567890"
                    disabled={loading}
                    required
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone sx={{ color: "text.secondary" }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Stack>

                {/* Password Field */}
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.password}
                  helperText={errors.password || "Minimum 6 characters"}
                  placeholder="Create a password"
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

                {/* Confirm Password Field */}
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={user.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  placeholder="Confirm your password"
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
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                            disabled={loading}
                            aria-label="toggle confirm password visibility"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
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
                      <Box sx={{ opacity: 0 }}>Create Account</Box>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </Stack>
            </form>

            {/* Links */}
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Already have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: "primary.main",
                      fontWeight: 600,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign In
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

export default UserRegistration;
