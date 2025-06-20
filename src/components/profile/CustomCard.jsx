import {
    Person as PersonIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Public as CountryIcon,
    LocationCity as CityIcon,
} from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    Button,
    Typography,
    Grid,
    Divider
} from '@mui/material';
import LoadingButton from '../ui/LoadingButton';
import CustomTextField from '../CustomTextField';

export default function CustomCard(isEditing, handleSubmit, onSubmit, isSubmitting, handleCancel, register, errors) {
    return <Card sx={{ backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'white' }}>
                    Personal Information
                </Typography>
                {isEditing && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {isSubmitting && (
                    <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                )} */}
                        <LoadingButton
                            onClick={handleSubmit(onSubmit)}
                            loading={isSubmitting}
                            variant="contained"
                            startIcon={<SaveIcon />}
                            sx={{ mr: 1 }}
                            disabled={isSubmitting}
                        >
                            Save
                        </LoadingButton>
                        <Button
                            onClick={handleCancel}
                            variant="outlined"
                            startIcon={<CancelIcon />}
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
                            Cancel
                        </Button>
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
                            disabled={!isEditing || isSubmitting}
                            error={!!errors.first_name}
                            helperText={errors.first_name?.message} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <CustomTextField
                            register={register}
                            name="last_name"
                            label="Last Name"
                            icon={PersonIcon}
                            disabled={!isEditing || isSubmitting}
                            error={!!errors.last_name}
                            helperText={errors.last_name?.message} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <CustomTextField
                            register={register}
                            name="email"
                            label="Email"
                            icon={EmailIcon}
                            disabled
                            error={!!errors.email}
                            helperText={errors.email?.message} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <CustomTextField
                            register={register}
                            name="phone_number"
                            label="Phone"
                            icon={PhoneIcon}
                            disabled={!isEditing || isSubmitting}
                            error={!!errors.phone_number}
                            helperText={errors.phone_number?.message} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <CustomTextField
                            register={register}
                            name="country"
                            label="Country"
                            icon={CountryIcon}
                            disabled={!isEditing || isSubmitting}
                            error={!!errors.country}
                            helperText={errors.country?.message} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <CustomTextField
                            register={register}
                            name="city"
                            label="City"
                            icon={CityIcon}
                            disabled={!isEditing || isSubmitting}
                            error={!!errors.city}
                            helperText={errors.city?.message} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <CustomTextField
                            register={register}
                            name="street_address"
                            label="Street Address"
                            icon={LocationIcon}
                            disabled={!isEditing}
                            error={!!errors.street_address}
                            helperText={errors.street_address?.message} />
                    </Grid>
                </Grid>
            </form>
        </CardContent>
    </Card>;
}
