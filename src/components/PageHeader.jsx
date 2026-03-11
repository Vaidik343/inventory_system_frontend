import React from 'react';
import { Box, Typography } from '@mui/material';

const PageHeader = ({ icon: Icon, title, subtitle }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                {Icon && <Icon sx={{ fontSize: 30, color: 'black', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 750,
                        color: '#6c6ace',
                        textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    }}
                >
                    {title}
                </Typography>
            </Box>
            {subtitle && (
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', ml: Icon ? 6 : 0, fontWeight: 500 }}>
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};

export default PageHeader;
// #6c6ace