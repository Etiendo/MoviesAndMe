import React from 'react'
import { StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBAPI'
import Avatar from './Avatar'

class Search extends React.Component {
    constructor(props: any, private searchedText: string, private page: number, private totalPages: number) {
        super(props)
        this.searchedText
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false
        }
        this._loadFilms = this._loadFilms.bind(this)
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: this.state.films.concat(data.results),
                    isLoading: false
                })
            })
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({ films: [] },
            () => { this._loadFilms() })
    }

    _displayAvatar() {
        if (this.state.films.length === 0) {
            return(
                <View style={styles.avatar_container}>
                    <Avatar />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Titre du film'
                    onChangeText={text => this.searchedText = text}
                    onSubmitEditing={() => this._searchFilms()} />
                <Button title='Rechercher' onPress={() => this._searchFilms()} />
                <FilmList
                    films={this.state.films}
                    loadFilms={this._loadFilms}
                    navigation={this.props.navigation}
                    page={this.page}
                    totalPages={this.totalPages}
                    isFavouriteList={false}
                />
                {this._displayLoading()}
                {this._displayAvatar()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000001',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar_container: {
        alignItems: 'center',
        bottom: 20
    }
})

export default Search
