// pages/payment.tsx
import React, { useState } from 'react';
import { Box, Container, Heading, Text, Input, Button, HStack, VStack } from '@chakra-ui/react';
import { Section } from 'components/section'; // Pastikan Anda telah membuat komponen Section

const PaymentPage: React.FC = () => {
  const [promoCode, setPromoCode] = useState<string>('');
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  const handlePayment = async () => {
    try {
      // Kirim detail transaksi ke API
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promoCode,
          plan: 'Full Access 30 Hari',
          total: 49000, // Total yang harus dibayar
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowQRCode(true);
      } else {
        console.error('Error processing payment:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Section height="calc(100vh - 200px)" innerWidth="container.sm">
      <Container maxW="container.md" py={8}>
        <VStack spacing={6} align="start">
          <Heading as="h1" size="lg">Detail Pembayaran</Heading>

          {/* Detail Pembayaran */}
          <Box borderWidth={1} borderRadius="md" p={4} boxShadow="md">
            <Text fontSize="lg" fontWeight="bold">Paket: Full Access 30 Hari</Text>
            <Text fontSize="md">Harga: Rp. 49.000</Text>
            <Text fontSize="md">Deskripsi: Akses semua layanan premium kami selama 30 hari.</Text>
          </Box>

          {/* Input Kode Promo */}
          <Box width="full">
            <Text fontSize="md" mb={2}>Kode Promo</Text>
            <Input
              placeholder="Masukkan kode promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </Box>

          {/* Tombol Bayar */}
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={handlePayment}>
              Bayar
            </Button>
          </HStack>

          {/* QR Code */}
          {showQRCode && (
            <Box textAlign="center" mt={8}>
              <Heading as="h2" size="md" mb={4}>QR Code Pembayaran</Heading>
              <Box>
                <img src="/images/qr-code.png" alt="QR Code Pembayaran" />
              </Box>
              <Text mt={4}>Tunjukkan QR code ini untuk menyelesaikan pembayaran.</Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Section>
  );
};

export default PaymentPage;
