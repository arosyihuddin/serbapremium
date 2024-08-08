import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { applyActionCode, getAuth } from "firebase/auth";
import { auth } from "../utils/firebaseClient"; // Pastikan ini mengimpor instance auth yang benar
import { Center, Spinner, Box, Text, Flex } from "@chakra-ui/react";
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { NextPage } from 'next';
import Cookies from "js-cookie";

const Verify: NextPage = () => {
  const router = useRouter();
  const { oobCode } = router.query;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  

  useEffect(() => {
    const verifyEmail = async (oobCode: string) => {
      try {
        // Lakukan verifikasi email
        await applyActionCode(auth, oobCode);

        // Login otomatis
        const authInstance = getAuth(); // Pastikan untuk mendapatkan instance auth dari Firebase
        const user = authInstance.currentUser;
        
        if (user) {
          // Ambil token
          const token = await user.getIdToken();
          Cookies.set('serbapremiumId', token); // Set token ke cookie
          router.push("/dashboard"); // Arahkan ke halaman dashboard
        } else {
          // Jika user belum login, mungkin perlu melakukan login manual
          setIsVerified(false);
        }
      } catch (error) {
        console.error("Error verifying email: ", error);
        setIsVerified(false); // Tandai sebagai gagal
      } finally {
        setIsLoading(false); // Hentikan loading setelah proses selesai
      }
    };

    if (oobCode) {
      verifyEmail(oobCode as string);
    }
  }, [oobCode, router]);

  return (
    <Center height="100vh">
      <Box textAlign="center">
        {isLoading ? (
          <>
            <Spinner size="xl" color="teal.500" />
            <Text mt={4}>Verifying your email...</Text>
          </>
        ) : (
          <Flex direction="column" align="center" justify="center">
            {isVerified === true ? (
              <>
                <FiCheckCircle size={50} color="green" />
                <Text mt={4} fontSize="lg" color="green.500">Verification successful!</Text>
              </>
            ) : isVerified === false ? (
              <>
                <FiXCircle size={50} color="red" />
                <Text mt={4} fontSize="lg" color="red.500">Verification failed. Please try again.</Text>
              </>
            ) : (
              <Text mt={4} fontSize="lg" color="gray.500">Something went wrong. Please try again later.</Text>
            )}
          </Flex>
        )}
      </Box>
    </Center>
  );
};

export default Verify;
