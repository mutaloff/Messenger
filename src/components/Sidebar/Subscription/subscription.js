import React from "react";
import { useState, useEffect } from "react";
import styles from './subscription.module.css';
import { UserAPI } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setReadyPoint } from "../../../redux/actions";

const Subscription = ({ contact, loginFrom, setSubscribeState, children }) => {

    const dispatch = useDispatch()

    const popupOption = useSelector(state => state.appReducer.popupOption)

    const [subscription, setSubscription] = useState(true)

    const deleteСontact = popupOption === 'deleteContact'

    const displaySubscription = subscription === true && !deleteСontact

    useEffect(() => {
        UserAPI.checkSubscription(loginFrom, contact.login).then(data => {
            setSubscription(data?.subscription);
        })
    }, [contact])

    useEffect(() => {
        if (deleteСontact && subscription !== false) {
            setSubscribeState('Удалить')
        } else if (subscription === loginFrom) {
            setSubscribeState('Добавлен(a)')
        } else if (subscription === true) {
            setSubscribeState('')
        } else {
            setSubscribeState('Добавить')
        }
    }, [subscription, popupOption])

    const subscribeHandler = (isUnsubscribe) => {
        subscription !== loginFrom && !isUnsubscribe
            ? UserAPI.subscribe(loginFrom, contact.login).then(data => {
                setSubscription(loginFrom)
            })
            : UserAPI.unsubscribe(loginFrom, contact.login).then(data => {
                dispatch(setReadyPoint(true))
                setSubscription(true)
            })
        isUnsubscribe && setSubscribeState('')
    }
    return <div
        style={displaySubscription ? { display: 'none' } : { display: 'block' }}
        onMouseOver={e => (!deleteСontact && subscription === loginFrom) && setSubscribeState('Удалить')}
        onMouseOut={e => (!deleteСontact && subscription === loginFrom) && setSubscribeState('Добавлен(a)')}
        className={styles.subscribe}
        onClick={() => subscribeHandler(deleteСontact)}>
        {children}
    </div>
}

export default Subscription