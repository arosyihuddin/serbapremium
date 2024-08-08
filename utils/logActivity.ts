import { db, auth } from './firebaseClient'; // Pastikan untuk mengimpor db dan auth dari konfigurasi Firebase Anda
import { collection, addDoc } from 'firebase/firestore';

/**
 * Logs an activity for the currently authenticated user.
 * @param activity - A description of the activity to log.
 */
async function logActivity(activity: string) {
  const user = auth.currentUser;
  if (user) {
    try {
      // Add a document to the activityLogs collection
      await addDoc(collection(db, 'activityLogs'), {
        userId: user.uid,
        activity,
        timestamp: new Date().toISOString(),
      });
      console.log('Activity logged:', activity);
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  } else {
    console.warn('No user is signed in. Activity not logged.');
  }
}

export default logActivity;
