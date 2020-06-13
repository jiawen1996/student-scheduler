import React from 'react'

export default WrappedComponent => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                isLoaded: false,
            };
        }
        componentDidMount() {
            fetch(`https://cors-anywhere.herokuapp.com/https://webapplis.utc.fr/Edt_ent_rest/myedt/result/?login=${this.props.logins[0]}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            data: result,
                            login: this.props.logins[0]
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }

        render() {
            const { error, isLoaded, data, login } = this.state
            console.log("withFetch: ", data)
            if (error) {
                return <div>Erreur : {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Chargement…</div>;
            } else {
                return (
                    <WrappedComponent data={data} login={login}  {...this.props} />
                );
            }

        }
    }
} 