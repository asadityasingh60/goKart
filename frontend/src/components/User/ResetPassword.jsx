import React, {Fragment,useState, useEffect} from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate , useParams} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {clearErrors, resetPassword} from "../../actions/userAction.jsx";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

export default function ResetPassword(){

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {token} = useParams();
  
    const { error, success, loading } = useSelector((state) => state.forgotPassword);
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const updatePasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(token,myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if(success){
        alert.success("Password Changed Successfully");
        navigate("/login");
      }
  
    }, [dispatch, error, alert,navigate,success]);
  
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Reset Password" />
            <div className="resetPasswordContainer">
              <div className="resetPasswordBox">
                <h2 className="resetPasswordHeading">Reset Password</h2>
  
                <form
                  className="resetPasswordForm"
                  onSubmit={updatePasswordSubmit}
                >
                  <div className="resetPasswordPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="resetPasswordPassword">
                    <LockIcon />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="resetPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };