// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../utils/firebaseClient'; // Import db untuk Firestore
import { setCookie } from 'cookies-next';
import { collection, addDoc } from 'firebase/firestore';

async function logActivity(userId: string, activity: string, browserInfo: string) {
  try {
    await addDoc(collection(db, 'activityLogs'), {
      userId,
      activity,
      browser: browserInfo, // Menyimpan informasi browser
      timestamp: new Date().toISOString(),
    });
    console.log('Activity logged:', activity, browserInfo);
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;
  const userAgent = req.headers['user-agent'] || 'unknown browser'; // Mendapatkan informasi user-agent

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();

    if (user.emailVerified) {
      // Set cookie with token
      setCookie('serbapremiumId', token, { req, res, maxAge: 30 * 24 * 60 * 60, path: '/' });

      // Log aktivitas login dengan informasi browser
      await logActivity(user.uid, 'User logged in', userAgent);

      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Email not verified' });
    }
  } catch (error: any) {
    let errorMessage = error.code;
    if (error.code === 'auth/invalid-email') {
      errorMessage = 'The email address is not valid.';
    } else if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Incorrect email or password.';
    } else if (error.code === 'auth/missing-password') {
      errorMessage = 'Password is required.';
    }

    return res.status(400).json({ message: errorMessage });
  }
}
