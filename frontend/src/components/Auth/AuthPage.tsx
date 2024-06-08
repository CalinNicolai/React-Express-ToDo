import React, {useContext, useEffect, useState} from "react";
import './AuthStyle.css';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


const RegistrationForm: React.FC = () => {
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const {store} = useContext(Context);
    const navigate = useNavigate()
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (isRegistration) {
            store.registration(email, password);
        } else {
            store.login(email, password);
        }
    };

    useEffect(() => {
        if (store.isAuth) {
            navigate('/');
        }
    }, [store.isAuth])
    const toggleForm = () => {
        setIsRegistration(!isRegistration);
    };

    return (
        <div className="form-container">
            <form>
                {isRegistration ? <h2>Registration</h2> : <h2>Login</h2>}
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={handleEmailChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange}/>
                    {isRegistration &&
                        <>
                            <label>Confirm Password</label>
                            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                        </>
                    }
                </div>
                <button type="button" onClick={toggleForm}>
                    {isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}
                </button>
                <button className="submit" type="button" onClick={handleSubmit}>
                    {isRegistration ? 'Register' : 'Login'}
                </button>

            </form>
        </div>
    );
};

export default observer(RegistrationForm);
