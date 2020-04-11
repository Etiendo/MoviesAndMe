import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Share, TouchableOpacity, Platform } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBAPI'
import moment from 'moment'
import { connect } from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink'

class FilmDetails extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        if (params.film != undefined && Platform.OS === 'ios') {
            return {
                headerRight: <TouchableOpacity
                    style={styles.share_touchable_headerrightbutton}
                    onPress={() => params.shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../Images/ic_share.ios.png')} />
                </TouchableOpacity>
            }
        }
    }

    constructor(props: any) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
        this._shareFilm = this._shareFilm.bind(this)
    }

    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film
        })
    }

    componentDidMount() {
        const favouriteFilmIndex = this.props.favouriteFilms.findIndex(item => item.id === this.props.navigation.state.params.filmId)
        if (favouriteFilmIndex !== -1) {
            this.setState({
                film: this.props.favouriteFilms[favouriteFilmIndex]
            }, () => this._updateNavigationParams())
            return
        }
        getFilmDetailFromApi(this.props.navigation.state.params.filmId).then(data => {
            this.setState({
                film: data,
                isLoading: false
            }, () => this._updateNavigationParams())
        })
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

    _toggleFavourite() {
        const action = { type: 'TOGGLE_FAVOURITE', value: this.state.film }
        this.props.dispatch(action)
    }

    _displayFavouriteImage() {
        let sourceImage = require('../Images/ic_favorite_border.png')
        let shouldEnlarge = false
        if (this.props.favouriteFilms.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../Images/ic_favorite.png')
            shouldEnlarge = true
        }
        return (
            <EnlargeShrink
                shouldEnlarge={shouldEnlarge}>
                <Image
                    style={styles.favourite_image}
                    source={sourceImage}
                />
            </EnlargeShrink>
        )
    }

    _displayFilm() {
        const film = this.state.film
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image_container}
                        source={{ uri: getImageFromApi(film.poster_path) }}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favourite_image}
                        onPress={() => this._toggleFavourite()}>
                        {this._displayFavouriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.detail_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.detail_text}>Note : {film.vote_average}</Text>
                    <Text style={styles.detail_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.detail_text}>Budget : {film.budget} $</Text>
                    <Text style={styles.detail_text}>Genre(s) : {film.genres.map(genre => { return genre['name'] }).join('/')}</Text>
                    <Text style={styles.detail_text}>Genre(s) : {film.production_companies.map(company => { return company['name'] }).join('/')}</Text>
                </ScrollView>
            )
        }
    }

    _shareFilm() {
        const { film } = this.state
        Share.share({ title: film.title, message: film.overview })
    }

    _displayFloatingActionButton() {
        const { film } = this.state
        if (film != undefined && Platform.OS === 'android') {
            return <TouchableOpacity style={styles.share_touchable_floatingactionbutton}>
                onPress={() => this._shareFilm()}
                <Image
                    style={styles.share_image}
                    source={require('../Images/ic_share.android.png')} />
            </TouchableOpacity>
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                {this._displayFloatingActionButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image_container: {
        height: 130,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    detail_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favourite_image: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center'
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30,
    },
    share_touchable_headerrightbutton: {
        marginRight: 8
    }
})

const mapStateToProps = (state: any) => {
    return {
        favouriteFilms: state.toggleFavourite.favouriteFilms
    }
}

export default connect(mapStateToProps)(FilmDetails)