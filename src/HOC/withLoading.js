import React from 'react';
function WithLoading(WrappedComponent) {
    return ({ isLoading, ...props }) => {
        if (!isLoading) return (<WrappedComponent {...props} />);
        return (<p>Be Hold, fetching data may take some time :)</p>);
    }
}
export default WithLoading;