import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import $bus from '../../tools/$bus';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchText}`);
    setSearchText('');
  };

  return (
    <AppBar position="static">
      <Box
        sx={{
          width: '1200px',
          margin: '0 auto',
        }}
      >
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <div className="logo" onClick={handleLogoClick}>
            <img src="src/imgs/Empire Bookstore.png" alt="Empire Bookstore" className="logo" />
          </div>
        </Typography>
        <Search>
          <form onSubmit={handleSearch}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        </Search>
        <Button color="inherit" onClick={() => navigate('/')}>
          Home
        </Button>
        {
          $bus.state.userdata.username!==null?
          ('Welcome,' + $bus.state.userdata.username):
          (<Button color="inherit" onClick={() => navigate('/login')}>
          Login
        </Button>)
        }
        
        <IconButton color="inherit">
          <Badge badgeContent={0} showZero color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header;
