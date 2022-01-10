# Nextjs Feedback

## Firebase + Github OAuth Authentication

Register OAuth App in github: https://github.com/settings/applications/1804066. The callback url is from firebase
https://console.firebase.google.com/u/0/project/nextjs-feedback/authentication/providers

The OAuth app clientId and secret need to be filled out in firebase github provider config.

`auth.ts`: https://firebase.google.com/docs/auth/web/github-auth

## FireStore

Initialize Cloud FireStore with test mode: https://console.firebase.google.com/u/0/project/nextjs-feedback/firestore.

Add firebase to node.js: https://firebase.google.com/docs/admin/setup?authuser=0#initialize-sdk
