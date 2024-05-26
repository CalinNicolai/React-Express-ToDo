import React, {useContext, useEffect, useState} from "react";
import './AuthStyle.css';
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";


const RegistrationForm: React.FC = () => {
    const [isRegistration, setIsRegistration] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(Context);
    const navigate = useNavigate()
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isRegistration) {
            store.registration(email,password);
        } else {
            store.login(email,password);
        }
    };
    useEffect(() => {
        if(store.isAuth){
            navigate('/');
        }
    },[store.isAuth])
    const toggleForm = () => {
        setIsRegistration(!isRegistration);
    };

    return (
        <div className="form-container">
            <form>
                {isRegistration ? <h2>Регистрация</h2> : <h2>Вход</h2>}
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={handleEmailChange}/>
                </div>
                <div>
                    <label>Пароль</label>
                    <input type="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <button type="button" onClick={toggleForm}>
                    {isRegistration ? 'Уже зарегистрированы?' : 'Вы не зарегистрировались?'}
                </button>
                <button className="submit" type="button" onClick={handleSubmit}>
                    {isRegistration ? 'Зарегистрироваться' : 'Войти'}
                </button>

            </form>
        </div>
    );
};

export default observer(RegistrationForm);
