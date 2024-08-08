// pages/api/payment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../utils/firebaseClient';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // Untuk menghasilkan ID unik

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { promoCode, plan, total } = req.body;

    console.log('Received data:', { promoCode, plan, total });

    if (!promoCode || !plan || typeof total !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
      });
    }

    try {
      // Simpan history transaksi ke Firebase
      const transactionRef = await addDoc(collection(db, 'transactions'), {
        timestamp: serverTimestamp(),
        invoiceId: uuidv4(), // Menghasilkan ID faktur unik
        plan,
        total,
        promoCode,
        status: 'Pending',
      });

      console.log('Transaction saved with ID:', transactionRef.id);

      // Simulate generating QR code URL (ganti dengan logika yang sesuai)
      const qrCodeUrl = '/images/qr-code.png';

      res.status(200).json({
        success: true,
        qrCodeUrl,
      });
    } catch (error) {
      console.error('Error saving transaction:', error);
      res.status(500).json({
        success: false,
        message: 'Error processing payment',
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
