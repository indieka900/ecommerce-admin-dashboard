import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { authService } from '../services/auth';
import {
    Box,
    Card,
    CardContent,
    Button,
    Typography,
    Avatar,
    Grid,
    Paper,
    Divider,
    IconButton,
    Badge,
} from '@mui/material';
import {
    Person as PersonIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Public as CountryIcon,
    LocationCity as CityIcon,
    CameraAlt as CameraIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import CustomTextField from '../components/CustomTextField';

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
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    // const { updateProfile } = authService();

    const { user } = useAuth();
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
        setIsLoading(true);
        try {
            let profilePictureUrl = user.profile_picture;

            const formData = new FormData();

            // Append all other form fields
            for (const key in data) {
                formData.append(key, data[key]);
            }

            // Append the image file if available
            if (profileImage) {
                formData.append('profile_picture', profileImage);
            }

            // Call the API using FormData
            const response = await authService.updateProfile(formData);
            // await new Promise((resolve) => setTimeout(resolve, 1000));

            // const updatedUser = { ...user, ...updatedData };
            // localStorage.setItem('user', JSON.stringify(updatedUser));

            toast.success('Profile updated successfully!');
            setIsEditing(false);
            setProfileImage(null);
        } catch (error) {
            toast.error('Failed to update profile');
            console.error(error);
        } finally {
            setIsLoading(false);
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

    return (
        <Box>
            <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>
                Profile Settings
            </Typography>

            <Grid container spacing={4} size="grow" >
                <Grid spacing={4} size={{ xs: 12, md: 4 }}>
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
                                        cursor: isEditing ? 'pointer' : 'default',
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
                                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
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
                            sx={{ mb: 1, color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                            onClick={() => navigate('/change-password')}
                        >
                            Change Password
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                            onClick={() => navigate('/dashboard')}
                        >
                            Back to Dashboard
                        </Button>
                    </Paper>

                </Grid>

                <Grid size="grow" >
                    <Card sx={{ backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ color: 'white' }}>
                                    Personal Information
                                </Typography>
                                {isEditing && (
                                    <Box>
                                        <IconButton
                                            onClick={handleSubmit(onSubmit)}
                                            disabled={isLoading}
                                            sx={{ color: 'green', mr: 1 }}
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton onClick={handleCancel} sx={{ color: 'red' }}>
                                            <CancelIcon />
                                        </IconButton>
                                    </Box>
                                )}
                            </Box>

                            <Divider sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.1)' }} />

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <CustomTextField
                                            register={register}
                                            name="first_name"
                                            label="First Name"
                                            icon={PersonIcon}
                                            disabled={!isEditing}
                                            error={!!errors.first_name}
                                            helperText={errors.first_name?.message}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <CustomTextField
                                            register={register}
                                            name="last_name"
                                            label="Last Name"
                                            icon={PersonIcon}
                                            disabled={!isEditing}
                                            error={!!errors.last_name}
                                            helperText={errors.last_name?.message}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <CustomTextField
                                            register={register}
                                            name="email"
                                            label="Email"
                                            icon={EmailIcon}
                                            disabled
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <CustomTextField
                                            register={register}
                                            name="phone_number"
                                            label="Phone"
                                            icon={PhoneIcon}
                                            disabled={!isEditing}
                                            error={!!errors.phone_number}
                                            helperText={errors.phone_number?.message}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <CustomTextField
                                            register={register}
                                            name="country"
                                            label="Country"
                                            icon={CountryIcon}
                                            disabled={!isEditing}
                                            error={!!errors.country}
                                            helperText={errors.country?.message}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <CustomTextField
                                            register={register}
                                            name="city"
                                            label="City"
                                            icon={CityIcon}
                                            disabled={!isEditing}
                                            error={!!errors.city}
                                            helperText={errors.city?.message}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <CustomTextField
                                            register={register}
                                            name="street_address"
                                            label="Street Address"
                                            icon={LocationIcon}
                                            disabled={!isEditing}
                                            error={!!errors.street_address}
                                            helperText={errors.street_address?.message}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
