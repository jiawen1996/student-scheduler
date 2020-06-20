import React from 'react';
import ButtonWithModal from './ButtonWithModal';

export const StudentsList = (props) => {
    const { logins } = props
    if (logins)
        return (
            <>
                <ul className="list-group" id="studentList">
                    {
                        logins.map(login => (
                            <li
                                className="list-group-item"
                                horizontal="md"
                                key={login}
                            >
                                {
                                    login
                                }
                                <ButtonWithModal
                                    className="button-modal"
                                    login={login}
                                    handleClick={props.handleClick}
                                />
                            </li>

                        ))
                    }
                </ul >
            </>
        )
    else return (
        <ul className="list-group">
            <li className="list-group-item">null</li>
        </ul>
    )
}