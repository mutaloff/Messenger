import React from "react";
import styles from './form.module.css';
import { Input } from "./Input/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../redux/authReducer";
import { Link } from "react-router-dom";
import { setPage } from "../../redux/actions";

export function Signin(props) {

    const dispatch = useDispatch();

    const { isRegistrated, entryError } = useSelector(state => state.authReducer)

    const [login, setLogin] = useState('');

    const [password, setPassword] = useState('');

    const [isRemember, setRemeberCondition] = useState(false);

    const loginChangeHandler = (e) => {
        setLogin(e.target.value)
    }
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }
    const rememberChangeHandelr = (e) => {
        setRemeberCondition(e.target.checked)
    }

    const entryHandler = () => {
        dispatch(authUser(login, password, isRemember));
        dispatch(setPage('messages/'))
    }

    return <div className={styles.signup}>
        <div className={styles.forms}>
            <Input type='login' value={login} changeHandler={loginChangeHandler} placeholder='Введите логин' signin={true} />
            <Input type='password' value={password} changeHandler={passwordChangeHandler} placeholder='Введите пароль' signin={true} />
            <div className={styles.rememberMe}>
                <input type='checkbox' className={styles.checkbox} onChange={rememberChangeHandelr}></input>
                <p>Запомнить меня</p>
            </div>
            <button onClick={entryHandler} className={styles.button}>Войти</button>
        </div>
        {
            entryError &&
            <span className={styles.entryError}>Неверный логин или пароль!</span>
        }
        {
            isRegistrated
                ? <span className={styles.span}>Вы  успешно зарегистрировались!</span>
                : <span className={styles.span}>Еще нет аккаунта? <Link to={'/signup'}>Зарегистрироваться</Link></span>
        }
    </div>
}