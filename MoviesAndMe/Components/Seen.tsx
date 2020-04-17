import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'

class Seen extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            showSeenList: true
        }
    }

    render() {
        const emptyListMessage = <Text>Liste de films vus vide</Text>
        return (
            <View style={styles.main_container}>
                <FilmList
                    films={this.props.seenFilms}
                    navigation={this.props.navigation}
                    isFavouriteList={false}
                    showSeenList={this.state.showSeenList} />
                <View style={styles.empty_message}>{this.props.seenFilms.length === 0 ? emptyListMessage : null}</View>
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
    }
})

const mapStateToProps = (state: any) => {
    return {
        seenFilms: state.toggleSeen.seenFilms
    }
}

export default connect(mapStateToProps)(Seen)