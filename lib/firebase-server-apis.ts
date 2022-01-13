// initialize db
import './firebase-server';

import {compareDesc, parseISO} from 'date-fns';
import {getFirestore} from 'firebase-admin/firestore';

import {Feedback} from '@/models/feedback';
import {Site} from '@/models/site';

const db = getFirestore();

export async function getAllFeedbacks(siteId: string) {
  // https://github.com/vercel/next.js/issues/32360
  const snapshot = await db.collection('feedbacks').where('siteId', '==', siteId).get();

  if (snapshot.empty) {
    return [];
  }

  const feedbacks: Feedback[] = [];

  snapshot.forEach((doc) => {
    feedbacks.push({id: doc.id, ...doc.data()} as Feedback);
  });

  feedbacks.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)));

  return feedbacks;
}

export async function getUserFeedback(uid: string) {
  const snapshot = await db.collection('feedbacks').where('authorId', '==', uid).get();

  const feedbacks: Feedback[] = [];

  snapshot.forEach((doc) => {
    feedbacks.push({id: doc.id, ...doc.data()} as Feedback);
  });

  return feedbacks;
}

export async function getAllSites() {
  const snapshot = await db.collection('sites').get();
  const sites: Site[] = [];

  snapshot.forEach((doc) => {
    sites.push({...doc.data(), id: doc.id} as Site);
  });

  return sites;
}

export async function getUserSites(uid: string) {
  const snapshot = await db.collection('sites').where('authorId', '==', uid).get();
  const sites: Site[] = [];

  snapshot.forEach((doc) => {
    sites.push({...doc.data(), id: doc.id} as Site);
  });

  return sites;
}

export async function createSite(site: Site) {
  await db.collection('sites').add(site);
  return site;
}
