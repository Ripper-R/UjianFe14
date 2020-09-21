import React,{useState} from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff'
import {Link,NavLink,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {FaUserAstronaut,FaCartArrowDown} from 'react-icons/fa'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import './Header.css';
import Axios from'axios'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  warna:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
}));
const StyledBadge = withStyles(() => ({
  badge: {
    right: -3,
    top: 5,
    color:'white',
    fontSize:11,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    
    padding: '0 0px',
  },
}))(Badge);
function ButtonAppBar({username,isLogin,role,cart}) {
  const classes = useStyles();
  const [anchorEl,setopen]=useState(null)
  const [anchorEl1,setopen1]=useState(null)
const logoutbutton=()=>{
  localStorage.removeItem('id')
  window.location.reload(false);
  
  

  
}
  return (
    <div className={classes.root}>
      <AppBar className={classes.warna} position='static'>
        <Toolbar>
            <NavLink to='/'  style={{textDecoration:'none',color:'white'}}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <FlightTakeoff/>
                </IconButton>
            </NavLink> 
          <Typography variant="h6" className={classes.title}>
            JoinTrip
          </Typography>
          {
            role==='admin'?
            <Link to='/manageAdmin' style={{textDecoration:'none',color:'white'}}>
              <Button color="inherit">Admin</Button>
            </Link>
            :
            role==='user'?
            <>
               
            <Button onClick={(e)=>setopen1(e.currentTarget)}>
            <StyledBadge badgeContent={cart.length} color='secondary'>
            <FaCartArrowDown/>
            </StyledBadge>
            </Button>
            <Menu
                id='addrian'
                anchorEl1={anchorEl1}
                open={Boolean(anchorEl1)}
                keepmounted
                onClose={()=>setopen1(null)}
              >
                
              <MenuItem>{cart.id}</MenuItem>
              <MenuItem><Link to='/cart' style={{textDecoration:'none',color:'Black'}}><Button color="inherit">Go to Cart</Button> </Link></MenuItem>
              </Menu>
            
            </>


            
            :
            null
          }
          {
            isLogin?
            <>
              <Button color="inherit" onClick={(e)=>setopen(e.currentTarget)}><FaUserAstronaut/>&nbsp;{username}</Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                // keepMounted
                open={Boolean(anchorEl)}
                onClose={()=>setopen(null)}
                // onClose={handleClose}
              >
                <MenuItem >Profile</MenuItem>
                <MenuItem >My account</MenuItem>
                <MenuItem><button onClick={logoutbutton}>Logout</button></MenuItem>
              </Menu>
            </>
            :
            <>
            <Link to='/login' style={{textDecoration:'none',color:'white'}}>
              <Button color="inherit">Login</Button>
            </Link>
            <Link to='/register' style={{textDecoration:'none',color:'white'}}>
              <Button color="inherit">Register</Button>
            </Link>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const MapstatetoProps=({Auth})=>{
  return {
    ...Auth
  }
}
export default connect(MapstatetoProps)(ButtonAppBar);