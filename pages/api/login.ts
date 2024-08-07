// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebaseClient';
import { setCookie } from 'cookies-next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();

    // Set cookie with token
    setCookie('serbapremiumId', token, { req, res, maxAge: 30 * 24 * 60 * 60, path: '/' });

    if (user.emailVerified) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Email not verified' });
    }
  } catch (error: any) {
    let errorMessage = 'An unexpected error occurred.';
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
