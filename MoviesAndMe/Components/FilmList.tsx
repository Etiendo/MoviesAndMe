import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            films: []
        }
    }

    _displayDetailsForFilm = (filmId: number) => {
        this.props.navigation.navigate('FilmDetails', { filmId: filmId })
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.films}
                extraData={this.props.favouriteFilms}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => (
                    <FilmItem film={item}
                        isFavourite={(this.props.favouriteFilms.findIndex(film => film.id === item.id) !== -1) ? true : false}
                        displayDetailsForFilm={this._displayDetailsForFilm} />
                )}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!this.props.isFavouriteList && this.props.page < this.props.totalPages) {
                        this.props.loadFilms()
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    }
})

const mapStateToProps = (state: any) => {
    return {
        favouriteFilms: state.toggleFavourite.favouriteFilms
    }
}

export default connect(mapStateToProps)(FilmList)
