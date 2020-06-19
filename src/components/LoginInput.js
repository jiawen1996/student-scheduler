import React from 'react';






export const LoginInput = (props) => {
    let inputValue;
    return (
        <>
            <form>
                <div class="row">
                    <label for="exampleInputEmail1">Login</label>
                </div>
                <div class="row">
                    <div class="col">
                        <input
                            class="form-control"
                            ref={input => inputValue = input}
                            id="exampleInputEmail1"
                        />
                    </div>
                    <div class="col">
                        <button
                            type="submit"
                            class="btn btn-primary btn-sm"
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