import React from 'react';

export const StudentsList = (props) => {
    const { logins } = props
    if (logins)
        return (
            <>
                <ul class="list-group" id="studentList">
                    {
                        logins.map(login => (
                            <div class="row">
                                <li
                                    class="list-group-item"
                                    key={login}
                                >
                                    {
                                        login
                                    }
                                </li>
                                <button
                                    type="button"
                                    class="close"
                                    aria-label="Close"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        props.handleClick(login)
                                    }}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        ))
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