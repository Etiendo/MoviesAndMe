import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'
import Avatar from './Avatar'

class Seen extends React.Component {

    render() {
        const emptyListMessage = <Text>Liste de films vus vide</Text>
        return (
            <View style={styles.main_container}>
                <Text>Films seens component works !</Text>
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

export default Seen