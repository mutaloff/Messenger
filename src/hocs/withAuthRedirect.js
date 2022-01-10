import React from "react";
import { Navigate } from "react-router-dom";


export const withAuthRedirect = (Component) => {
    const isAuth = this.props.isAuth;
    class RedirectComponent extends React.Component {
        render() {
            if (!isAuth) return <Navigate to='/login' />
            return <Component {...this.props} />
        }
    }
    return RedirectComponent
}