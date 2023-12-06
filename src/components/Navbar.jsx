import React from 'react'
import {Box,
    AppBar,
     IconButton,
     Toolbar,
     Typography,
     Button,
     
    } from '@mui/material'

    import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <AppBar position='static'>
            
            <Toolbar>
          <IconButton
            // size="large"
            edge="start"
            color="inherit"
            // aria-label="menu"
            sx={{ mr: 2 }}
           
          >
            {/* <MenuIcon /> */}
            <Typography variant="h6" component="div">
            
            <Link to='/add' style={{textDecoration:"none", color:"white"}}>Add Note</Link>
          </Typography>
          </IconButton>
          <Typography variant="h6" component="div">
            
            <Link to='/list' style={{textDecoration:"none", color:"white"}}>List Notes</Link>
          </Typography>
          </Toolbar>
        </AppBar>
  )
}

export default Navbar
