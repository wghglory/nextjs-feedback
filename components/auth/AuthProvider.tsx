import '@/lib/firebase-web';

import {
  AuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import cookie from 'js-cookie';
import {useRouter} from 'next/router';
import React, {createContext, useContext, useEffect, useState} from 'react';

import {cookieName} from '@/const';
import {createUser} from '@/lib/firebase-web-apis';
import {User} from '@/models/user';

type AuthState = {
  user: User | null;
  signinWithGithub: () => void;
  signinWithGoogle: () => void;
  signout: () => void;
};

const initialState: AuthState = {
  user: null,
  signinWithGithub: () => {},
  signinWithGoogle: () => {},
  signout: () => {},
};

const AuthContext = createContext<AuthState>(initialState);
AuthContext.displayName = 'AuthContext';

export function AuthProvider({children}: {children: React.ReactNode}) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

function useProvideAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();

  const signinWithGoogle = () => {
    return handleSignin(new GoogleAuthProvider());
  };

  const signinWithGithub = () => {
    return handleSignin(new GithubAuthProvider());
  };

  const signout = () => {
    return signOut(auth).then(() => {
      setUser(null);
      cookie.remove(cookieName);
      router.push('/');
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const user = formatUser(firebaseUser as FirebaseUser & {accessToken: string});
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
        cookie.remove(cookieName);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  function handleSignin(provider: AuthProvider) {
    return signInWithPopup(auth, provider)
      .then((res) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(res);
        const token = credential?.accessToken;

        // res.user.getIdToken().then((accessToken) => {
        // });
        const user = formatUser(res.user as FirebaseUser & {accessToken: string});

        cookie.set(cookieName, 'true', {
          expires: 1,
        });

        // save to firebase db
        createUser(user);
        setUser(user);
        return user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        cookie.remove(cookieName);
      });
  }

  return {
    user,
    signinWithGithub,
    signinWithGoogle,
    signout,
  };
}

function formatUser(user: FirebaseUser & {accessToken: string}): User {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    accessToken: user.accessToken,
  };
}
