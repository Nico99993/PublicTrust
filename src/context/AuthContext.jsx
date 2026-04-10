import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { LoadingScreen } from '../components/LoadingScreen';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'buyer' or 'seller'
  const [loading, setLoading] = useState(true);

  // Helper for Firestore timeouts to prevent Firebase's infinite retry from freezing the app
  const withTimeout = (promise, ms) => {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore request timed out')), ms))
    ]);
  };

  // 1. Signup Function
  const signup = async (email, password, role) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    try {
      await withTimeout(setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role,
        createdAt: new Date()
      }), 5000);
    } catch (err) {
      console.warn("Could not save role to Firestore, database might be disabled:", err);
    }

    return user;
  };

  // 2. Login Function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3. Logout Function
  const logout = () => {
    return signOut(auth);
  };

  // Keep track of auth session automatically using Firebase observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // If a user successfully logged in, grab their role from Firestore so UI knows what to render
      if (user) {
        try {
          const userDoc = await withTimeout(getDoc(doc(db, 'users', user.uid)), 5000);
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          } else {
            console.log("No user profile found in Firestore.");
            setUserRole(null);
          }
        } catch (error) {
          console.error("Error fetching user role (database likely disabled):", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};
