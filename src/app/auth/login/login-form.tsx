"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "../../../contexts/auth/auth.context";
import { useLoading } from "../../../contexts/loading/use-loading";
import { AlertContext } from "../../../contexts/alerts/alert.context";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const { addAlert } = useContext(AlertContext);
  const { startLoading, stopLoading } = useLoading();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();

    try {
      login({
        email: formData.email,
        password: formData.password,
      });
      router.push('/dashboard');
    } catch (err: any) {
      addAlert(err.message || "Login failed", "error");
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
      className="bg-lightsmoke"
    >
      <Typography variant="h6">Login</Typography>
      <form onSubmit={handleSubmit}>
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
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
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
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
          <Typography fontWeight="bold">Sign In</Typography>
        </Button>
      </form>
    </Box>
  );
}