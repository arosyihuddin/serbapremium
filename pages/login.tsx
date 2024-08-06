import React, { useState, useEffect, useRef } from 'react';
import {
  Center,
  useToast,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Box,
  Text,
  Heading,
  Spinner,
  Flex
} from '@chakra-ui/react';
import { FiEyeOff, FiEye, FiMail } from 'react-icons/fi';
import { BackgroundGradient } from 'components/gradients/background-gradient';
import { PageTransition } from 'components/motion/page-transition';
import { Section } from 'components/section';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../utils/firebaseClient';
import NextLink from 'next/link';
import { useAuth } from '@saas-ui/auth'; // Pastikan mengimpor useAuth

const DynamicLink = dynamic(() => import('@saas-ui/react').then(mod => mod.Link), { ssr: false });

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailNotVerified, setEmailNotVerified] = useState<boolean>(false);
  const [isRequestingVerification, setIsRequestingVerification] = useState<boolean>(false);
  const toast = useToast();
  const emailRef = useRef<HTMLInputElement>(null);
  const { logIn } = useAuth(); // Menggunakan logIn dari useAuth

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Firebase login successful, user:", user);

      if (user.emailVerified) {
        await logIn({ email, password }); // Memanggil logIn dari useAuth setelah login berhasil
        console.log("logIn successful");
        toast({
          title: 'Login successful',
          description: 'You have been logged in successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        window.location.href = '/dashboard';
      } else {
        setEmailNotVerified(true);
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

      console.error('Error during login:', error);
      toast({
        title: 'Login failed',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestVerification = async () => {
    setIsRequestingVerification(true);
    try {
      const user = auth.currentUser;
      if (user && user.email) {
        await sendEmailVerification(user);
        toast({
          title: "Verification Email Sent",
          description: "Please check your inbox for a new verification email.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setEmailNotVerified(false);
      } else {
        throw new Error("User not logged in or email not available.");
      }
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      } else if (error.code === 'auth/missing-email') {
        errorMessage = 'Email address is required.';
      }

      console.error("Error sending verification email: ", error);
      toast({
        title: "Failed to Send Verification Email",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsRequestingVerification(false);
    }
  };

  return (
    <Section height="calc(100vh - 200px)" innerWidth="container.sm">
      <BackgroundGradient zIndex="-1" />
      <Heading textAlign="center" mb={6}>Login</Heading>
      <Center height="100%" pt="20">
        <PageTransition width="100%">
          <Stack spacing={4}>
            {emailNotVerified ? (
              <Center height="70vh" flexDirection="column" justifyContent="center">
                {isRequestingVerification ? (
                  <Spinner size="xl" color="teal.500" />
                ) : (
                  <Stack spacing={2} align="center">
                    <Box fontSize="2xl" color="teal.500">
                      <FiMail size="58px" /> {/* Menambahkan ukuran pada ikon */}
                    </Box>
                    <Button
                      colorScheme="teal"
                      onClick={handleRequestVerification}
                      width="full"
                    >
                      Resend Verification Email
                    </Button>
                  </Stack>
                )}
                <Text mt={4} fontSize="lg">
                  Please verify your email address. If you haven&apos;t received the verification email, click the button above to resend it.
                </Text>
              </Center>
            ) : (
              <>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <InputRightElement width="2.0rem" mr="0.2rem">
                      <Box
                        h="1.75rem"
                        w="1.1rem"
                        onClick={() => setShowPassword(!showPassword)}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </Box>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Text color="muted" fontSize="sm">
                  By logging in you agree to our{' '}
                  <NextLink href="#" passHref>
                    <DynamicLink color="teal.500">Terms of Service</DynamicLink>
                  </NextLink>{' '}
                  and{' '}
                  <NextLink href="#" passHref>
                    <DynamicLink color="teal.500">Privacy Policy</DynamicLink>
                  </NextLink>
                </Text>
                <Flex direction="column" align="center" justify="center">
                  {loading ? (
                    <Spinner size="lg" color="teal.500" />
                  ) : (
                    <Button colorScheme="teal" onClick={handleLogin}>
                      Login
                    </Button>
                  )}
                </Flex>
                <Text textAlign="center" mt={4}>
                  Don&apos;t have an account?{' '}
                  <NextLink href="/signup" passHref>
                    <DynamicLink color="teal.500">Sign Up</DynamicLink>
                  </NextLink>
                </Text>
              </>
            )}
          </Stack>
        </PageTransition>
      </Center>
    </Section>
  );
};

export default Login;
