import React, {FC, useContext, useEffect} from 'react';
import {Context} from "./index";
import Routes from "./Routes";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: FC = () => {
    const {store} = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    return (
        <>
            <ToastContainer/>
            <Routes/>
        </>
    );
}

export default App;
