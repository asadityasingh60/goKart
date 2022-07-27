import React, { Fragment } from "react";
import "./CheckoutSteps.css";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { Typography, Stepper, Step, StepLabel } from '@mui/material';

export default function CheckoutSteps({activeStep}){

    const steps = [
        {
          label: <Typography>Shipping Details</Typography>,
          icon: <LocalShippingIcon />,
        },
        {
          label: <Typography>Confirm Order</Typography>,
          icon: <LibraryAddCheckIcon />,
        },
        {
          label: <Typography>Payment</Typography>,
          icon: <AccountBalanceWalletIcon />,
        },
      ];
    
      const stepStyles = {
        boxSizing: "border-box",
      };

    return(
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                <Step
                    key={index}
                    active={activeStep === index ? true : false}
                    completed={activeStep >= index ? true : false}
                >
                    <StepLabel
                    style={{
                        color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                    }}
                    icon={item.icon}
                    >
                    {item.label}
                    </StepLabel>
                </Step>
                ))}
            </Stepper>
        </Fragment>
    );
}