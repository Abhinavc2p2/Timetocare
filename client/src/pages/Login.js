import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //form handler
    const onfinishHandler = async(values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post("/api/v1/user/login", values);
            window.location.reload();
            dispatch(hideLoading());
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                message.success("Login Successfully");
                navigate("/");
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("something went wrong");
        }
    };

    const responseGoogleSuccess = async(response) => {
        try {
            dispatch(showLoading());

            // Send the Google access token to your server for verification
            const res = await axios.post("/api/v1/user/google-login", {
                tokenId: response.tokenId,
            });

            dispatch(hideLoading());

            if (res.data.success) {
                message.success("Login Successful!");
                navigate("/dashboard");
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
            message.error("Something Went Wrong");
        }
    };

    const responseGoogleFailure = (error) => {
        console.error(error);
        message.error("Google Login Failed");
    };
    return (

        <
        div className = "block" >

        <
        div class = "main-text" >
        Welcome to < span class = "emphasize" > TimeToCare < /span> 🏥 Log in to find your perfect doctor < /
        div >


        <
        div className = "form-container " >
        <
        Form layout = "vertical"
        onFinish = { onfinishHandler }
        className = "register-form" >
        <
        h3 className = "text-center" > Login From < /h3>

        <
        Form.Item label = "Email"
        name = "email" >
        <
        Input type = "email"
        required / >
        <
        /Form.Item> <
        Form.Item label = "Password"
        name = "password" >
        <
        Input type = "password"
        required / >
        <
        /Form.Item> <
        Link to = "/register"
        className = "m-4 pageturn" >
        Not a user Register here <
        /Link> <
        button className = "btn btn-primary"
        type = "submit" >
        Login <
        /button> 




        <
        /
        Form >

        <
        /
        div > <
        /div>
    );
};

export default Login;