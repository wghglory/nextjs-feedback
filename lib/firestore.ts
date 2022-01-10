import {addDoc, collection, doc, getFirestore, setDoc} from 'firebase/firestore';

import {Site} from '@/models/site';
import {User} from '@/models/user';

const db = getFirestore();

// https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#set_a_document
export async function createUser(user: User) {
  try {
    return await setDoc(doc(db, 'users', user.uid), user, {merge: true});
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function createSite(site: Site) {
  try {
    return await addDoc(collection(db, 'sites'), site);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
