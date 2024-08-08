// pages/login.tsx
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
  Flex,
} from '@chakra-ui/react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { BackgroundGradient } from 'components/gradients/background-gradient';
import { PageTransition } from 'components/motion/page-transition';
import { Section } from 'components/section';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
const DynamicLink = dynamic(() => import('@saas-ui/react').then(mod => mod.Link), { ssr: false });
import NextLink from 'next/link';
import { useAuth } from '@saas-ui/auth';

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Login successful',
          description: 'You have been logged in successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        window.location.href = '/dashboard';
      } else if (response.status === 401) {
        toast({
          title: 'Login failed',
          description: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        window.location.href = '/verify-email';
      } else {
        toast({
          title: 'Login failed',
          description: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast({
        title: 'Login failed',
        description: 'An unexpected error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section height="calc(100vh - 200px)" innerWidth="container.sm">
      <BackgroundGradient zIndex="-1" />
      <Heading textAlign="center" mb={6}>Login</Heading>
      <Center height="100%" pt="20">
        <PageTransition width="100%">
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                ref={emailRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                  placeholder="Enter your password"
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
          </Stack>
        </PageTransition>
      </Center>
    </Section>
  );
};

export default Login;
