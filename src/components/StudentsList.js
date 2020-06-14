import React from 'react';

export const StudentsList = (props) => {
    const { logins } = props
    if (logins)
        return (
            <>
                <ul class="list-group" id="studentList">
                    {
                        logins.map(login => (<li class="list-group-item" key={login}>
                            {
                                login
                            }
                        </li>))
                    }
                </ul>
            </>
        )
    else return (
        <ul class="list-group">
            <li class="list-group-item">null</li>
        </ul>
    )
}