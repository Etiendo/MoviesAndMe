import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'
import Avatar from './Avatar'

class Favourites extends React.Component {

    render() {
        const emptyListMessage = <Text>Liste de films favoris vide</Text>
        return (
            <View style={styles.main_container}>
                <View style={styles.avatar_container}>
                    <Avatar/>
                </View>
                <FilmList
                    films={this.props.favouriteFilms}
                    navigation={this.props.navigation}
                    isFavouriteList={true} />
                <View style={styles.empty_message}>{this.props.favouriteFilms.length === 0 ? emptyListMessage : null}</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    empty_message: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar_container: {
        alignItems: 'center'
    }
})

const mapStateToProps = (state: any) => {
    return {
        favouriteFilms: state.toggleFavourite.favouriteFilms
    }
}

export default connect(mapStateToProps)(Favourites)