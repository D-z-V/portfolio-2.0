import localFont from 'next/font/local';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import ContactIcon from '@/Icons/ContactIcon';
import ProfileIcon from '@/Icons/ProfileIcon';

const instagramLogoFont = localFont({ src: '../../fonts/GrandHotel-Regular.ttf' });

const Appbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between', margin: '0.2rem 0', padding: '0rem 0.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    
    }}>
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '50px',
            cursor: 'pointer',
            fontSize: '2.25rem',
            // marginLeft: '0px', 
          }}
        >
          <p
            className={`navbar__logo ${instagramLogoFont.className}`}
            style={{ padding: '0.5rem 0', margin: '0' }}
          >
            Portfolio
          </p>
        </Typography>
        <div>
          <IconButton size="large" color="inherit" aria-label="menu" >
            <ProfileIcon height = {27} width = {27}/>
          </IconButton>
          <IconButton size="large" color="inherit" aria-label="menu">
            <ContactIcon height = {27} width = {27}/>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
