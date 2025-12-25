
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, get } from 'firebase/database';
import { auth, db } from './firebase';
import Splash from './components/Splash';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './components/MainLayout';
import ForceUpdate from './components/ForceUpdate';
import { UserData } from './types';

const APP_VERSION = '1.0.0';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    // Check for Force Update
    const versionRef = ref(db, 'settings/appVersion');
    get(versionRef).then((snapshot) => {
      if (snapshot.exists()) {
        const remoteVersion = snapshot.val();
        if (remoteVersion !== APP_VERSION) {
          setNeedsUpdate(true);
        }
      }
    });

    // Splash Timer
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    // Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = ref(db, `users/${currentUser.uid}`);
        onValue(userRef, (snapshot) => {
          setUserData(snapshot.val());
          setLoading(false);
        });
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  if (showSplash) return <Splash />;
  if (needsUpdate) return <ForceUpdate />;
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!user) {
    return isRegistering ? (
      <Register onToggle={() => setIsRegistering(false)} />
    ) : (
      <Login onToggle={() => setIsRegistering(true)} />
    );
  }

  return <MainLayout userData={userData} />;
}
