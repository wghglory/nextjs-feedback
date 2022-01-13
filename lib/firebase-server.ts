/* Firebase for node.js: https://firebase.google.com/docs/admin/setup?authuser=0 */

// https://firebase.google.com/docs/firestore/quickstart?authuser=0
// https://console.firebase.google.com/u/0/project/nextjs-feedback/settings/serviceaccounts/adminsdk
// https://github.com/firebase/snippets-node/blob/e3cca757ca378a21542f40927715eac67c2b86cf/firestore/main/index.js#L309-L315
import {cert, initializeApp} from 'firebase-admin/app';

let app;

if (!app) {
  app = initializeApp({
    credential: cert({
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      type: 'service_account',
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: '100962567448828413404',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4q7v1%40nextjs-feedback.iam.gserviceaccount.com',
    } as any),
    // databaseURL: 'https://nextjs-feedback.firebaseio.com',
  });
}
