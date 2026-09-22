import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouter = () => {

    const {isLoggedIn} = useAuth()


    if(!isLoggedIn){
        return <Navigate to={"/login"} replace/> 
    }

    // 로그인 정보가 있다면 자식 Route 보여주기
    return <Outlet />
};

export default ProtectedRouter;