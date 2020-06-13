import React from 'react'

export default WrappedComponent => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                isLoaded: false,
                data: []
            };
        }
        componentDidMount() {
            this.props.logins.map(login => {
                // alert(login)
                fetch(`https://cors-anywhere.herokuapp.com/https://webapplis.utc.fr/Edt_ent_rest/myedt/result/?login=${login}`)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                data: this.state.data.concat(result.map(elem => ({
                                    login: login,
                                    ...elem
                                }))),
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
            })

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