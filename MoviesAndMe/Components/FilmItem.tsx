import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Button } from 'react-native'
import { getImageFromApi } from '../API/TMDBAPI'
import FadeIn from '../Animations/FadeIn'
import moment from 'moment'

class FilmItem extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            isDateToggle: false
        }
    }

    _displayFavouriteImage() {
        if (this.props.isFavourite) {
            return (
                <Image style={styles.favorite_image}
                    source={require('../Images/ic_favorite.png')}
                />
            )
        }
    }

    _toggleReleaseDate() {
        if (this.state.isDateToggle) {
            this.setState({
                isDateToggle: false
            })
        } else {
            this.setState({
                isDateToggle: true
            })
        }
    }

    _switchTitleAndReleaseDate() {
        const film: any = this.props.film
        if (this.state.isDateToggle) {
            return (
                <Text style={styles.seen_title_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
            )
        } else {
            return (
                <Text style={styles.seen_title_text}>{film.title}</Text>
            )
        }
    }

    _switchRendering() {
        const film: any = this.props.film
        if (this.props.showSeenList) {
            return (
                <TouchableOpacity style={styles.main_seen_container}
                    onLongPress={() => this._toggleReleaseDate() } >
                    <Image
                        style={styles.image_seen_film}
                        source={{ uri: getImageFromApi(film.poster_path) }}
                    />
                    <View style={styles.content_container}>
                        {this._switchTitleAndReleaseDate()}
                    </View>
                </TouchableOpacity>
            )
        } else {
            const displayDetailsForFilm: any = this.props.displayDetailsForFilm
            return (
                <TouchableOpacity style={styles.main_container}
                    onPress={() => displayDetailsForFilm(film.id)}>
                    <Image
                        style={styles.image_container}
                        source={{ uri: getImageFromApi(film.poster_path) }}
                    />
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            {this._displayFavouriteImage()}
                            <Text style={styles.title_text}>{film.title}</Text>
                            <Text style={styles.title_text}>{film.vote_average}</Text>
                        </View>
                        <View style={styles.description_container}>
                            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                        </View>
                        <View style={styles.date_container}>
                            <Text style={styles.date_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <FadeIn>
                {this._switchRendering()}
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },
    main_seen_container: {
        height: 120,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image_container: {
        width: 120,
        height: 180,
        margin: 5,
    },
    image_seen_film: {
        width: 100,
        height: 100,
        borderRadius: 60
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flexDirection: 'row',
        flex: 3,
    },
    description_container: {
        flex: 7,
    },
    date_container: {
        flex: 1,
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    seen_title_text: {
        color: '#666666',
        fontSize: 15,
        margin: 5
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
    }
})

export default FilmItem