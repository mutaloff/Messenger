import React, { useRef, useState } from "react";
import { UserAPI } from "../../../api";
import { keyPress } from "../../../utils/keyPress";
import styles from './labels.module.css'

const Labels = ({ labels, ownerLogin, contactLogin }) => {

    const [tags, setTags] = useState(labels ? labels.split('#').filter((label, i) => i != 0) : [])

    const [displayInput, setDisplayInput] = useState(false)

    const [text, setText] = useState('')

    const inputRef = useRef()

    const deleteHandler = (i) => {
        setTags(prevState => prevState.filter((tag, index) => index !== i))
        console.log(tags)
        UserAPI.updateLabels(ownerLogin, contactLogin, `${tags.filter((tag, index) => index !== i).join('#')}`)
    }

    const blurHandler = (e) => {
        setDisplayInput(false)
        text.length && setTags([...tags, `${text}`])
        text.length && UserAPI.updateLabels(ownerLogin, contactLogin, `${[...tags, `${text}`].join('#')}`)
        setText('')
    }

    const plusHandler = (e) => {
        setDisplayInput(true)
        setTimeout(() => inputRef.current.focus(), 10)
    }

    return <div className={styles.base}>
        <div className={styles.tagBar}>
            {
                tags.map((tag, i) => (
                    <div className={styles.tag} key={i}>#{tag}
                        <div className={styles.cross} onClick={() => deleteHandler(i)}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 
                                0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 
                                10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459
                                0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 
                                1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 
                                -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 
                                7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 
                                12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#a8a0a0"
                                />
                            </svg>
                        </div>
                    </div>
                ))

            }
        </div>
        <div
            onClick={plusHandler}
            style={{ display: !displayInput ? 'flex' : 'none' }}
            className={styles.plus}>+
        </div>
        <div>
            <input
                style={{ display: displayInput ? 'flex' : 'none' }}
                className={styles.input}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={blurHandler}
                onKeyPress={(e) => keyPress(e, blurHandler)}
                ref={inputRef}>
            </input>
        </div>

    </div >
}

export default Labels