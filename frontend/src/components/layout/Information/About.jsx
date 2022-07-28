import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/adityasingh60/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dcvnvdwa8/image/upload/v1658329909/avatars/ProfPic-min_vhuw4l.jpg"
              alt="Founder"
            />
            <Typography>Aditya Narayan Singh</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              goKart Sample Web Application made by Aditya Narayan Singh. Using MERN Stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
          <Typography component="h2">Social Media Handles</Typography>
            <a href="https://www.instagram.com/adityasingh60/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a href="https://www.instagram.com/adityasingh60/" target="blank">
              <FacebookIcon className="instagramSvgIcon" />
            </a>
            <a href="https://www.instagram.com/adityasingh60/" target="blank">
              <YouTubeIcon className="instagramSvgIcon" />
            </a>
            <a href="https://www.instagram.com/adityasingh60/" target="blank">
              <LinkedInIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
