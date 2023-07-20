import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/auth';

export default function AdminRoute() {
    const [ok, setOk] = useState();
    const data = useSelector((state) => state.user);
    const [auth, setAuth] = useAuth();


    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/auth/admin-auth`)
            if (res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }

        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : "Loading";
}