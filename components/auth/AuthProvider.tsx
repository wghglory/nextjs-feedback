import React, {useState, useEffect, useContext, createContext} from 'react';
import {getAuth, signOut, signInWithPopup, GithubAuthProvider, onAuthStateChanged, User} from 'firebase/auth';
import '../../lib/firebase';

type AuthState = {
  user: User | null;
  signinWithGithub: () => void;
  signout: () => void;
};

const initialState: AuthState = {
  user: null,
  signinWithGithub: () => {},
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
  const [user, setUser] = useState<User | null>(null);

  const provider = new GithubAuthProvider();
  const auth = getAuth();

  const signinWithGithub = () => {
    return signInWithPopup(auth, provider)
      .then((res) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(res);
        const token = credential?.accessToken;

        setUser(res.user);
        return res.user;
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
      });
  };

  const signout = () => {
    return signOut(auth).then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return {
    user,
    signinWithGithub,
    signout,
  };
}
