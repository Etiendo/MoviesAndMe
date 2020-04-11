import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class LastNewFilms extends React.Component {

    render() {
        return(
            <View style={styles.main_container}>
                <Text>Last new films component works !</Text>
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