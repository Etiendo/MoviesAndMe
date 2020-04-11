import { createStore } from 'redux';
import toggleFavourite from './Reducers/favouriteReducer'
import setAvatar from './Reducers/setAvatar'
import { persistCombineReducers } from 'redux-persist'
import { AsyncStorage } from 'react-native';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavourite, setAvatar}))