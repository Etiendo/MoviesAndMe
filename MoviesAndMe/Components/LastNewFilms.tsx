import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FilmList from './FilmList'
import { getLastNewFilms } from '../API/TMDBAPI'

class LastNewFilms extends React.Component {
    constructor(props: any) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false
        }
        this._loadFilms = this._loadFilms.bind(this)
    }

    componentDidMount() {
        this._loadFilms()
    }

    _loadFilms() {
        this.setState({ isLoading: true })
        getLastNewFilms(this.page + 1).then(data => {
            this.page = data.page
            this.totalPages = data.total_pages
            this.setState({
                films: this.state.films.concat(data.results),
                isLoading: false
            })
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation} 
                    totalPages={this.totalPages}
                    page={this.page}
                    loadFilms={this._loadFilms}
                    isFavouriteList={false} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    }
})

export default LastNewFilms