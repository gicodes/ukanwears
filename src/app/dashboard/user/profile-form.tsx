'use client';

import React, { useState, useEffect, useContext } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import { AuthContext } from '@/contexts/auth/auth.context';

const ProfileForm = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [image, setImage] = useState<File | any>()
  const [formData, setFormData] = useState({ 
    name: '',
    city: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const dummyPfp = 'https://i.pravatar.cc/150'; 
  const { getToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error('No token found in localStorage');
        }

        const response = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const handleEditClick = () => {
    if (userData) {
      setFormData({ name: userData.name, city: userData.country });
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update user data');
      const updatedData = await response.json();
      setUserData(updatedData); 
      setIsEditing(false); 
    } catch (error) {
      console.error(error);
    }
  };

  interface UserData {
    name: string;
    email: string;
    imageUrl?: string;
    country: string;
    orders?: any[];
    createdAt: string;
  }

  interface FormData {
    name: string;
    city: string;
  }

  const handleFormChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  if (!userData) {
    return <CircularProgress />;
  }

  return (
    <Card>
      {isEditing ? (
        <>
          <CardContent>
            <TextField
              label="Name"
              value={formData?.name || ''}
              onChange={handleFormChange('name')}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country Code"
              value={formData.city}
              onChange={handleFormChange('city')}
              fullWidth
              margin="normal"
            />
          </CardContent>
          <CardActions>
            <Button onClick={handleSubmit}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </CardActions>
        </>
      ) : (
        <>
          <CardHeader
            avatar={<Avatar src={userData.imageUrl || dummyPfp} />}
            title={userData.name}
            subheader={userData.email}
          />
          <CardContent>
            <Typography>Orders: {userData.orders?.length || 'N/A'}</Typography>
            <Typography>
              Country: {userData.country}
            </Typography>
            <Typography>
              Joined: {new Date(userData.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={handleEditClick}>Edit Profile</Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default ProfileForm;