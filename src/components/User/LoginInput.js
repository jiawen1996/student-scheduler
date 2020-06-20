import React from 'react';

export const LoginInput = (props) => {
    let inputValue;

    function validateForm(login) {
        return login.length > 0;
    }

    return (
        <>
            <form>
                <label htmlFor="exampleInputEmail1"><b>Login</b></label>
                <div className="row">
                    <div className="col-7">
                        <input
                            className="form-control"
                            ref={input => inputValue = input}
                            id="exampleInputEmail1"
                        />
                    </div>
                    <div className="col-3">
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                            onClick={(e) => {
                                e.preventDefault();
                                if (validateForm(inputValue.value)){
                                    props.handleClick(inputValue.value)
                                } else {
                                    alert("Login empty")
                                }    
                            }}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}