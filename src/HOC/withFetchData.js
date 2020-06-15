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
            const fetchPromises = this.props.logins.map(login => {
                return fetch(`https://webapplis.utc.fr/Edt_ent_rest/myedt/result/?login=${login}`)
                    .then(res => res.json())
            })

            Promise.all(fetchPromises).then(
                (results) => {
                    // this.setState({
                    //     isLoaded: true,
                    //     data: this.state.data.concat(result.map(elem => ({
                    //         login: login,
                    //         ...elem
                    //     }))),
                    // });
                    console.log("promise: ", results)
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