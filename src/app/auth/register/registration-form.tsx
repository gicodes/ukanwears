"use client";

import { 
  Box, 
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton, 
  InputAdornment, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Typography 
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { allCountries } from "@/assets/allCountries";
import Visibility from "@mui/icons-material/Visibility";
import { TermsAndConsCard } from "@/app/terms-of-use/modal";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { isValidEmail, isValidPassword } from "../../utils/regex";
import { AuthContext } from "../../../contexts/auth/auth.context";
import { useLoading } from "../../../contexts/loading/use-loading";
import { AlertContext } from "../../../contexts/alerts/alert.context";

export default function RegistrationForm() {
  const router = useRouter();
  const { register } = useContext(AuthContext);
  const { addAlert } = useContext(AlertContext);
  const { startLoading, stopLoading } = useLoading();

  const [termsAndConsCard, setTermsAndConsCard] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    termsAccepted: false,
    role: 'user',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let role: string;

    if (!isValidEmail(formData.email)) {
      addAlert("Invalid email format.", "error");
      return;
    }

    if (!isValidPassword(formData.password)) {
      addAlert("Weak password! Use at least 6 characters with a mix of letters, numbers, and symbols.", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      addAlert("Passwords do not match!", "error");
      return;
    }

    if (!formData.termsAccepted) {
      addAlert("You must accept the terms and conditions.", "error");
      return;
    } 

    if (formData.email.includes('@ukanwears.com')) {
      role = 'admin';
    } else role = 'user';

    startLoading();
    try {
      await register({
        name: formData.name,
        email: formData.email,
        country: formData.country,
        password: formData.password,
        role: role,
      });
      addAlert("Registration successful!", "success");
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error during registration:", err);
      addAlert(err.message || "An unexpected error occurred.", "error");
    } finally {
      stopLoading();
    }
  };

  return (
    <Box 
      sx={{ 
        p: 3,
        mx: "auto", 
        boxShadow: 2,
        maxWidth: 400,
        borderRadius: 2, 
      }}
    >
      <Typography variant="h6"> Register Account </Typography>
    
      <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Full Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            margin="normal" 
            required 
          />
          <TextField 
            fullWidth 
            type="email" 
            label="Email Address" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            margin="normal" 
            required 
          />
          <FormControl fullWidth>
            <InputLabel>Country of Residence</InputLabel>
            <Select
              labelId="update-user-country-role-label"
              id="update-user-country-role"
              value={formData.country} required
              label="Country of Residence"
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                country: e.target.value,
              }))}
            >
              {allCountries.map((country: string) => 
                <MenuItem key={country} value={country}>{country}</MenuItem>
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
       
        <Box sx={{ cursor: "pointer" }}>
          <FormControlLabel
            className="text-dark my-1"
            control={
              <Checkbox 
                name="termsAccepted" 
                checked={formData.termsAccepted} 
                onChange={handleChange} 
              />
            }
            label={formData.termsAccepted ? " " : "‼️"}
          />
          <span 
            onClick={() => setTermsAndConsCard(!termsAndConsCard)} 
            className="text-link fs-small"
          >
            I agree to the Terms and Conditions
          </span>
        </Box>
        {termsAndConsCard && (
          <TermsAndConsCard 
            open={termsAndConsCard} 
            onClose={() => setTermsAndConsCard(false)} 
          />
        )}

        <Button 
          fullWidth 
          type="submit" 
          variant="contained" 
          sx={{ mt: 2, bgcolor: "burlywood" }}
        >
          <Typography fontWeight={'bold'}>Sign Up</Typography>
        </Button>
      </form>
    </Box>
  );
}