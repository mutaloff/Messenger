import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAssignment } from "../../../../redux/messageReducer";
import styles from './assignmentPopup.module.css'
import socket from "../../../../socket";
import { sendAssignment, sendMessage } from "../../../../redux/actions";

function AssignmentPopup({ display, setDisplay, loginTo, loginFrom, firstname }) {

    const dispatch = useDispatch()

    useEffect(() => setDisplay(false), [loginTo])

    const [assignmentName, setAssignmentName] = useState('')
    const [assignmentText, setAssignmentText] = useState('')
    const [assignmentTerm, setAssignmentTerm] = useState('')

    const clickHandler = (e) => {
        let assignment = assignmentName
        let assignment_term = Date.parse(assignmentTerm)
        let sender_login = loginFrom
        let receiver_login = loginTo
        let text = assignmentText
        if (assignmentName.length && assignmentTerm.length && assignmentTerm.length) {
            dispatch(setAssignment(loginFrom, loginTo, assignmentName, assignmentText, Date.parse(assignmentTerm)))
            dispatch(sendAssignment({ sender_login, receiver_login, text, firstname, assignment, assignment_term }))
            dispatch(sendMessage({ sender_login, receiver_login, text, firstname, assignment, assignment_term }))
            socket.emit('sendMessage', { sender_login, receiver_login, text, firstname, assignment, assignment_term });
            setAssignmentName('')
            setAssignmentText('')
            setAssignmentTerm('')
            setDisplay(false)
        }
    }

    return <div className={styles.main} style={{ display: display ? 'flex' : 'none' }}>
        <div className={styles.popup}>
            <div className={styles.closePopup} onClick={() => setDisplay(false)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 
                        0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 
                        10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459
                        0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 
                        1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 
                        -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 
                        7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 
                        12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"
                    />
                </svg>
            </div>
            <div className={styles.popupContent}>
                <div className={styles.assignmentName}>
                    <div className={styles.name}>Название поручения</div>
                    <input
                        className={styles.input}
                        onChange={(e) => setAssignmentName(e.target.value)}
                        value={assignmentName}
                    />
                </div>
                <div className={styles.assignmentText}>
                    <div className={styles.name}>Текст поручения</div>
                    <textarea
                        onChange={(e) => setAssignmentText(e.target.value)}
                        className={styles.textarea}
                        value={assignmentText}
                    />
                </div>
                <div className={styles.assignmentTerm}>
                    <div className={styles.name}>Срок выполнения</div>
                    <input
                        value={assignmentTerm}
                        onChange={(e) => setAssignmentTerm(e.target.value)}
                        type="datetime-local"
                        className={styles.date}
                    />
                </div>
                <button
                    onClick={clickHandler}
                    className={styles.button}>
                    Отправить
                </button>
            </div>
        </div>
    </div>
}


export default AssignmentPopup;