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
    <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between', marginTop: '0.25rem'}}>
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '50px',
            cursor: 'pointer',
            fontSize: '2.45rem',
            // marginLeft: '0px', 
          }}
        >
          <p
            className={`navbar__logo ${instagramLogoFont.className}`}
            style={{ padding: '0.5rem 0', margin: '0' }}
          >
            Instagram
          </p>
        </Typography>
        <div>
          <IconButton size="large" color="inherit" aria-label="menu" >
            <ProfileIcon height = {30} width = {30}/>
          </IconButton>
          <IconButton size="large" color="inherit" aria-label="menu">
            <ContactIcon height = {30} width = {30}/>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
