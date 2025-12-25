
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCZyxD4ZZEaDkadnX3wtgvZZKwhnvKH7U8",
  authDomain: "x-arena-11.firebaseapp.com",
  databaseURL: "https://x-arena-11-default-rtdb.firebaseio.com",
  projectId: "x-arena-11",
  storageBucket: "x-arena-11.firebasestorage.app",
  messagingSenderId: "760087689788",
  appId: "1:760087689788:web:b839bb5d228446c49f2139"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
