import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetails from '../Components/FilmDetails'
import Favourites from '../Components/Favourites'
import { StyleSheet, Image } from 'react-native'
import LastNewFilms from '../Components/LastNewFilms'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher',
            headerStyle: {
                backgroundColor: 'grey'
            }
        }
    },
    FilmDetails: {
        screen: FilmDetails,
        navigationOptions: {
            title: 'Détails du film',
            headerStyle: {
                backgroundColor: 'grey'
            },
            headerBackTitle: 'Retour'
        }
    }
})

const FavouritesStackNavigator = createStackNavigator({
    Favourites: {
        screen: Favourites,
        navigationOptions: {
            title: 'Mes films favoris',
            headerStyle: {
                backgroundColor: 'grey'
            }
        }
    }
})

const LastNewFilmsStackNavigator = createStackNavigator({
    LastNewFilms : {
        screen: LastNewFilms,
        navigationOptions: {
            title: 'Dernières sorties',
            headerStyle: {
                backgroundColor: 'grey'
            }
        }
    },
    FilmDetails: {
        screen: FilmDetails,
        navigationOptions: {
            title: 'Détails du film',
            headerStyle: {
                backgroundColor: 'grey'
            },
            headerBackTitle: 'Retour'
        }
    }
})

const MoviesTabNavigator = createBottomTabNavigator(
    {
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_search.png')}
                        style={styles.icon} />
                }
            }
        },
        Favourites: {
            screen: FavouritesStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_favorite.png')}
                        style={styles.icon} />
                }
            }
        },
        LastNewFilms: {
            screen: LastNewFilmsStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                    source={require('../Images/ic_fiber_new.png')}
                    style={styles.icon} />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showIcon: true
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(MoviesTabNavigator)