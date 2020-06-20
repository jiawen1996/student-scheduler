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

        handleFetchPromises = () => {
            const fetchPromises = this.props.logins.map(login => {
                return fetch(`https://corsanywhere.herokuapp.com/https://webapplis.utc.fr/Edt_ent_rest/myedt/result/?login=${login}`)
                    .then(res => res.json())
                    .then(res =>
                        (res.map(elem => ({
                            login: login,
                            ...elem
                        })))
                    )
            })

            Promise.all(fetchPromises).then(
                (results) => {
                    let allDatas = []
                    results.map(result => result.map(elem => allDatas.push(elem)))
                    this.setState({
                        data: allDatas,
                        isLoaded: true
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

        }
        componentDidMount() {
            this.handleFetchPromises()
        }

        componentDidUpdate(prevProps) {
            if (prevProps.logins !== this.props.logins) {
                this.handleFetchPromises();
            }
        }

        render() {
            const { error, isLoaded, data, login } = this.state

            if (error) {
                return <div>Erreur : {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Chargement…</div>;
            } else {
                return (

                    <WrappedComponent
                        data={data}
                        login={login}
                        {...this.props}
                    />
                );
            }

        }
    }
} 