import React from 'react';






export const LoginInput = (props) => {
    let inputValue;
    return (
        <>
            <form>
                <div className="row">
                    <label htmlFor="exampleInputEmail1">Login</label>
                </div>
                <div className="row">
                    <div className="col">
                        <input
                            className="form-control"
                            ref={input => inputValue = input}
                            id="exampleInputEmail1"
                        />
                    </div>
                    <div className="col">
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                            onClick={(e) => {
                                e.preventDefault();
                                props.handleClick(inputValue.value)
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}