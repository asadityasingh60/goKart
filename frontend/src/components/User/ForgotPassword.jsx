import React, {Fragment,useState, useEffect} from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import EmailIcon from '@mui/icons-material/Email';
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, forgotPassword} from "../../actions/userAction.jsx";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";

export default function ForgotPassword(){
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const {error,message,loading} = useSelector((state) => state.forgotPassword);

    const [email,setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        dispatch(forgotPassword(email));
    };

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        if (message){
            alert.success(message);
        }
      }, [dispatch, error, alert,message]);
    
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Forgot Password" />
            <div className="forgotPasswordContainer">
              <div className="forgotPasswordBox">
                <h2 className="forgotPasswordHeading">Forgot Password</h2>
  
                <form
                  className="forgotPasswordForm"
                  onSubmit={forgotPasswordSubmit}
                >
                  <div className="forgotPasswordEmail">
                    <EmailIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <input
                    type="submit"
                    value="Update"
                    className="forgotPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };
