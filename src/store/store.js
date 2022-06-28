import {compose,createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

const middlewares=[logger]

const composedEnhancers=compose(applyMiddleware(...middlewares))

export const Store=createStore(rootReducer,undefined,composedEnhancers)
