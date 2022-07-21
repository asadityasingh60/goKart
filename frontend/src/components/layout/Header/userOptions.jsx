import React, { Fragment,useState } from "react";
import "./Header.css";
import {useNavigate} from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { SpeedDialAction,SpeedDial,Backdrop } from '@mui/material';
import img from "../../../images/Profile.png";
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useAlert} from "react-alert";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
import HomeIcon from '@mui/icons-material/Home';

export default function UserOptions({user}){

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();


    const [open,setOpen] = useState(false);

    const options =[
        {icon: <HomeIcon/>, name:"Home", func: home},
        {icon: <ListAltIcon/>, name:"Orders", func: orders},
        {icon: <PersonIcon/>, name:"Profile", func: account},
        {icon: <ExitToAppIcon/>, name:"Logout", func: logoutUser},
    ];

    if(user.role==="admin"){
        options.unshift({icon: <DashboardIcon/>, name:"Dashboard", func: dashboard});
    }

    function dashboard(){
        navigate("/dashboard");
    }

    function home(){
        navigate("/");
    }

    function orders(){
        navigate("/orders");
    }

    function account(){
        navigate("/account");
    }

    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully");
    }

    return(
        <Fragment>
            <Backdrop open={open} style={{zIndex:"10"}}/>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={()=>setOpen(false)}
                onOpen={()=>setOpen(true)}
                open={open}
                direction="down"
                className="speedDial"
                icon = {
                    <img className="speedDialIcon" 
                    src = {user.avatar ? user.avatar.url : img}
                    alt="Profile"
                    />
                }
            >
            {options.map((item)=>(
                <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
            ))}
                
            </SpeedDial>
        </Fragment>
    );
}