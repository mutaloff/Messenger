import React, { useState } from 'react'
import { addUser } from '../../redux/contactReducer';
import styles from './form.module.css'
import { useDispatch } from 'react-redux';
import { Input } from './Input/input';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserAPI } from '../../api';
import { setRegistration } from '../../redux/actions';

export function Signup(props) {

    const dispatch = useDispatch()

    const [login, setLogin] = useState('');

    const [password, setPassword] = useState('');

    const [repeatPassword, setRepeatPassword] = useState('');

    const [firstname, setFirstname] = useState('');

    const [lastname, setLastname] = useState('');

    const [reg, setReg] = useState(false)

    const loginChangeHandler = (e) => {
        setLogin(e.target.value.toLowerCase())
    }
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }
    const repeatPasswordChangeHandler = (e) => {
        setRepeatPassword(e.target.value)
    }
    const firstnameChangeHandler = (e) => {
        setFirstname(e.target.value)
    }
    const lastnameChangeHandler = (e) => {
        setLastname(e.target.value)
    }
    const navigate = useNavigate();

    const signupHandler = (e) => {
        if (password === repeatPassword && reg && firstname.length && lastname.length) {
            navigate('./signin')
            dispatch(setRegistration())
            UserAPI.addUser(login, password, firstname, lastname)
        }
    }


    return <div className={styles.signup}>
        <div className={styles.forms}>
            <Input type='login' value={login} changeHandler={loginChangeHandler} placeholder='Введите логин' setReg={setReg} />
            <Input type='password' value={password} changeHandler={passwordChangeHandler} placeholder='Введите пароль' />
            <Input type='password' value={repeatPassword} password={password} changeHandler={repeatPasswordChangeHandler} placeholder='Повторите пароль' />
            <Input type='text' value={firstname} changeHandler={firstnameChangeHandler} placeholder='Введите имя' />
            <Input type='text' value={lastname} changeHandler={lastnameChangeHandler} placeholder='Введите фамилию' />
            <button onClick={signupHandler} className={styles.button} style={{ pointerEvents: !(password === repeatPassword && reg) }}>Регистрация</button>
        </div>
        <span className={styles.span}>Уже есть аккаунт? <Link to={'/login'}>Выполнить вход</Link></span>
    </div>
}