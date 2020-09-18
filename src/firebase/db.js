import {App} from './app'
import 'firebase/firestore'

const DB = App.firestore();
export const FIRESTORE_USERS = DB.collection('users');
