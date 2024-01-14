"use client";

import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const Resume = () => {
    return (
        <Box
                sx={{ width: { xs: '100%', sm: '100%', md: '90%', lg: '80%' }, height: { xs: '36rem', sm: '60rem', md: '80rem', lg: '60rem' }, backgroundColor: 'black' }}>

                <iframe
                    src="https://drive.google.com/file/d/1T6-05NxLGLhJHxU24WNuh8GX2jQKTT9W/preview?embedded=true#view=FitH"
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                ></iframe>


        </Box>
    );
}

export default Resume;