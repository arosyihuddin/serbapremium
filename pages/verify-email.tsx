import React, { useState, useEffect } from 'react';
import { Center, useToast, Button, Stack, Box, Text, Spinner, Heading } from '@chakra-ui/react';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../utils/firebaseClient';
import { PageTransition } from 'components/motion/page-transition';
import { BackgroundGradient } from 'components/gradients/background-gradient';
import { Section } from 'components/section';
import { FiMail } from 'react-icons/fi';

const VerifyEmail = () => {
  const [isRequestingVerification, setIsRequestingVerification] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const toast = useToast();

  const handleRequestVerification = async () => {
    setIsRequestingVerification(true);
    setIsButtonDisabled(true);
    try {
      const user = auth.currentUser;
      if (user && user.email) {
        await sendEmailVerification(user);
        toast({
          title: 'Verification Email Sent',
          description: 'Please check your inbox for a new verification email.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        startTimer();
      } else {
        throw new Error('User not logged in or email not available.');
      }
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred.';
      if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests, please try again later.';
      }

      console.error('Error sending verification email:', error);
      toast({
        title: 'Failed to Send Verification Email',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setIsRequestingVerification(false);
    }
  };

  const startTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsButtonDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      // Clean up the interval if the component unmounts
      clearInterval(timer);
    };
  }, [timer]);

  return (
    <Section height="calc(100vh - 200px)" innerWidth="container.sm">
      <BackgroundGradient zIndex="-1" />
      <Heading textAlign="center" mb={6}>Verify Your Email</Heading>
      <Center height="100%" pt="20">
        <PageTransition width="100%">
          <Stack spacing={4}>
            <Center height="70vh" flexDirection="column" justifyContent="center">
              {isRequestingVerification ? (
                <Spinner size="xl" color="teal.500" />
              ) : (
                <Stack spacing={2} align="center">
                  <Box fontSize="2xl" color="teal.500">
                    <FiMail size="58px" />
                  </Box>
                  <Button
                    colorScheme="teal"
                    onClick={handleRequestVerification}
                    width="full"
                    isDisabled={isButtonDisabled}
                  >
                    {isButtonDisabled ? `Try again in ${timer}s` : 'Resend Verification Email'}
                  </Button>
                </Stack>
              )}
              <Text mt={4} fontSize="lg">
                Please verify your email address. If you haven&apos;t received the verification email, click the button above to resend it.
              </Text>
            </Center>
          </Stack>
        </PageTransition>
      </Center>
    </Section>
  );
};

export default VerifyEmail;
