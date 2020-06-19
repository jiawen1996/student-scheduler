import React from 'react';
import ButtonWithModal from './ButtonWithModal';

export const StudentsList = (props) => {
    const { logins } = props
    if (logins)
        return (
            <>
                <ul class="list-group" id="studentList">
                    {
                        logins.map(login => (
                            <div class="row" key={login}>
                                <li
                                    class="list-group-item"
                                >
                                    {
                                        login
                                    }
                                </li>
                                <ButtonWithModal
                                    login={login}
                                    handleClick={props.handleClick}
                                />
                            </div>

                        ))
                    }
                </ul >
            </>
        )
    else return (
        <ul class="list-group">
            <li class="list-group-item">null</li>
        </ul>
    )
}