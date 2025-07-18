import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomCard from '../components/profile/CustomCard';
import toast from 'react-hot-toast';
import {
    Box, Card, CardContent,
    Button, Typography, Avatar,
    Grid, Paper, IconButton, Badge,
} from '@mui/material';
import {
    Edit as EditIcon,
    CameraAlt as CameraIcon,
} from '@mui/icons-material';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

// Yup validation schema
const profileSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().nullable(),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone_number: yup.string().nullable(),
    country: yup.string().nullable(),
    city: yup.string().nullable(),
    street_address: yup.string().nullable(),
});

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const fileInputRef = useRef(null);

    const { user, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            country: '',
            city: '',
            street_address: '',
        },
    });

    // Load user data into form
    useEffect(() => {
        if (user) {
            reset({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone_number: user.phone_number || '',
                country: user.country || '',
                city: user.city || '',
                street_address: user.street_address || '',
            });
            if (user.profile_picture) {
                setProfileImagePreview(user.profile_picture);
            }
            setIsLoadingProfile(false);
        }
    }, [user, reset]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }

            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setProfileImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        if (isEditing) fileInputRef.current?.click();
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const formData = new FormData();

            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });

            if (profileImage) {
                formData.append('profile_picture', profileImage);
            }

            await updateUserProfile(formData);

            toast.success('Profile updated successfully!');
            setProfileImage(null);
            setProfileImagePreview(null);
        } catch (error) {
            toast.error('Failed to update profile');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
        setProfileImage(null);
        setProfileImagePreview(user?.profile_picture || null);
    };

    const getInitials = () => {
        const first = watch('first_name') || user?.first_name || '';
        const last = watch('last_name') || user?.last_name || '';
        return `${first[0] || ''}${last[0] || ''}`.toUpperCase();
    };

    const getDisplayName = () => {
        const first = user?.first_name || '';
        const last = user?.last_name || '';
        return `${first} ${last}`.trim() || 'User';
    };

    if (isLoadingProfile) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <LoadingSpinner />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>
                Profile Settings
            </Typography>

            <Grid container spacing={4} size="grow">
                <Grid spacing={2} size={{ xs: 12, md: 4 }}>
                    <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                        <CardContent sx={{ textAlign: 'center', py: 4 }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    isEditing && (
                                        <IconButton
                                            size="small"
                                            onClick={handleImageClick}
                                            disabled={isSubmitting}
                                            sx={{ bgcolor: 'primary.main', color: 'white' }}
                                        >
                                            <CameraIcon fontSize="small" />
                                        </IconButton>
                                    )
                                }
                            >
                                <Avatar
                                    src={profileImagePreview}
                                    onClick={handleImageClick}
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        mx: 'auto',
                                        mb: 2,
                                        bgcolor: 'primary.main',
                                        fontSize: '2.5rem',
                                        cursor: isEditing && !isSubmitting ? 'pointer' : 'default',
                                        opacity: isSubmitting ? 0.7 : 1,
                                    }}
                                >
                                    {!profileImagePreview && getInitials()}
                                </Avatar>
                            </Badge>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                                disabled={isSubmitting}
                            />
                            <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
                                {getDisplayName()}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                                {user?.role || 'User'}
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => setIsEditing(!isEditing)}
                                disabled={isSubmitting}
                                sx={{
                                    color: 'white',
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    '&:disabled': {
                                        color: 'rgba(255,255,255,0.5)',
                                        borderColor: 'rgba(255,255,255,0.2)'
                                    }
                                }}
                            >
                                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                            </Button>
                        </CardContent>
                    </Card>

                    <Paper sx={{ mt: 3, p: 2, backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                        <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                            Quick Actions
                        </Typography>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{
                                mb: 1,
                                color: 'white',
                                borderColor: 'rgba(255,255,255,0.3)',
                                '&:disabled': {
                                    color: 'rgba(255,255,255,0.5)',
                                    borderColor: 'rgba(255,255,255,0.2)'
                                }
                            }}
                            onClick={() => navigate('/change-password')}
                            disabled={isSubmitting}
                        >
                            Change Password
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{
                                color: 'white',
                                borderColor: 'rgba(255,255,255,0.3)',
                                '&:disabled': {
                                    color: 'rgba(255,255,255,0.5)',
                                    borderColor: 'rgba(255,255,255,0.2)'
                                }
                            }}
                            onClick={() => navigate('/dashboard')}
                            disabled={isSubmitting}
                        >
                            Back to Dashboard
                        </Button>
                        {user.is_superuser &&
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{
                                    mt: 1,
                                    color: 'white',
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    '&:disabled': {
                                        color: 'rgba(255,255,255,0.5)',
                                        borderColor: 'rgba(255,255,255,0.2)'
                                    }
                                }}
                                onClick={() => navigate('/add-admin')}
                                disabled={isSubmitting}
                            >
                                Add Admin
                            </Button>}
                    </Paper>
                </Grid>

                <Grid size="grow" >
                    {CustomCard(isEditing, handleSubmit, onSubmit, isSubmitting, handleCancel, register, errors)}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;

