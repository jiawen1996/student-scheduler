import React from 'react';

export const StudentsList = (props) => {
    const { logins } = props
    if (logins)
        return (
            <>
                <ul class="list-group" id="studentList">
                    <li class="list-group-item">
                        {
                            console.log(logins)

                        }
                    </li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Morbi leo risus</li>
                    <li class="list-group-item">Porta ac consectetur ac</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                </ul>
            </>
        )
    else return (
        <ul class="list-group">
            <li class="list-group-item">null</li>
        </ul>
    )
}