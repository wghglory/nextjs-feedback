/* firestore for web! */
import {addDoc, collection, deleteDoc, doc, getFirestore, setDoc} from 'firebase/firestore';

import {Feedback} from '@/models/feedback';
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
    // Add a new document with a generated id
    const siteRef = doc(collection(db, 'sites'));

    // later...
    await setDoc(siteRef, {...site, createdAt: new Date().toISOString()});
    return siteRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function createFeedback(feedback: Feedback) {
  try {
    return await addDoc(collection(db, 'feedbacks'), {...feedback, createdAt: new Date().toISOString()});
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function deleteFeedback(id: string) {
  try {
    await deleteDoc(doc(db, 'feedbacks', id));
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
}
