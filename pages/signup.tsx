import { NextPage } from 'next';
import NextLink from 'next/link';
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
  Heading,
  Text,
  Link,
  Spinner,
  Flex
} from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../utils/firebaseClient';
import { doc, setDoc } from 'firebase/firestore';
import { BackgroundGradient } from 'components/gradients/background-gradient';
import { PageTransition } from 'components/motion/page-transition';
import { Section } from 'components/section';

const SignUp: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  // Referensi untuk field email
  const fieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fokuskan field email saat halaman dimuat
    if (fieldRef.current) {
      fieldRef.current.focus();
    }
  }, []);

  const handleSignUp = async () => {
    if (!name.trim()) {
      // Validasi nama tidak boleh kosong
      toast({
        title: 'Sign Up failed',
        description: 'Name is required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
      return;
    }

    setLoading(true);
    try {
      // Daftarkan pengguna baru
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Perbarui profil pengguna dengan nama pengguna
      await updateProfile(user, { displayName: name });

      // Kirim email verifikasi
      await sendEmailVerification(user);

      // Simpan data pengguna ke Firestore dengan UID sebagai ID dokumen
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        isPremium: false,
      });

      toast({
        title: 'SignUp successful',
        description: 'You have been signed up successfully. Please check your email to verify your account.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });

      // Redirect ke halaman login
      window.location.href = '/login';
    } catch (error: any) {
      console.error('Error during sign up:', error);

      let errorMessage = 'An unexpected error occurred.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'The email address is already in use.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak.';
      } else if (error.code === 'auth/missing-email') {
        errorMessage = 'Email address is required.';
      }

      toast({
        title: 'Sign Up failed',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSignUp();
    }
  };

  return (
    <Section height="calc(100vh - 200px)" innerWidth="container.sm">
      <BackgroundGradient zIndex="-1" />
      <Heading textAlign="center" mb={6}>Sign Up</Heading>
      <Center height="100%" pt="20">
        <PageTransition width="100%">
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                ref={fieldRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your name" // Placeholder untuk field nama
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your email" // Placeholder untuk field email
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your password" // Placeholder untuk field password
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
              By signing up you agree to our{' '}
              <NextLink href="#" passHref>
                <Link color="teal.500">Terms of Service</Link>
              </NextLink>{' '}
              and{' '}
              <NextLink href="#" passHref>
                <Link color="teal.500">Privacy Policy</Link>
              </NextLink>
            </Text>
            <Flex direction="column" align="center" justify="center">
              {loading ? (
                <Spinner size="lg" color="teal.500" />
              ) : (
                <Button colorScheme="teal" onClick={handleSignUp}>
                  Sign Up
                </Button>
              )}
            </Flex>
            <Text textAlign="center" mt={4}>
              Already have an account?{' '}
              <NextLink href="/login" passHref>
                <Link color="teal.500">Sign In</Link>
              </NextLink>
            </Text>
          </Stack>
        </PageTransition>
      </Center>
    </Section>
  );
};

export default SignUp;
