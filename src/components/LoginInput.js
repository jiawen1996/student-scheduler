import React from 'react';






export const LoginInput = (props) => {
    return (
        <>
            <form>
                <div class="row">
                    <label for="exampleInputEmail1">Login</label>
                </div>
                <div class="row">
                    <div class="col">
                        <input class="form-control" id="exampleInputEmail1" />
                    </div>
                    <div class="col">
                        <button
                            type="submit"
                            class="btn btn-primary btn-sm"
                            onClick={props.handleClick}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}