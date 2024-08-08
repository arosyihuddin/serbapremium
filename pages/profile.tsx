import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  VStack,
  Spinner,
  useToast,
  Flex,
  Text,
} from '@chakra-ui/react';
import { BackgroundGradient } from 'components/gradients/background-gradient';
import { PageTransition } from 'components/motion/page-transition';
import { auth, db } from '../utils/firebaseClient'; 
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';

const Profile: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [updating, setUpdating] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);

        const unsubscribeSnapshot = onSnapshot(
          userRef,
          (doc) => {
            if (doc.exists()) {
              const userData = doc.data();
              setName(userData.name || '');
              setEmail(user.email || '');
            } else {
              console.error('No such document!');
            }
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching user data:', error);
            toast({
              title: 'Error loading profile',
              description: 'There was an error loading your profile data.',
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
            setLoading(false);
          }
        );

        // Cleanup snapshot listener when component unmounts
        return () => unsubscribeSnapshot();
      } else {
        console.log('No user is signed in');
        setLoading(false);
      }
    });

    // Cleanup auth listener when component unmounts
    return () => unsubscribe();
  }, [toast]);

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) {
      toast({
        title: 'No user signed in',
        description: 'Please sign in to update your profile.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    setUpdating(true);
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
      });
      toast({
        title: 'Profile updated',
        description: 'Your name has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update failed',
        description: error.message || 'An error occurred while updating your profile.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="80vh">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.md" pt="80px" pb="20" flex="1">
        <PageTransition>
          <Stack spacing={6}>
            <Heading>Edit Profile</Heading>
            {loading ? (
              <Flex align="center" justify="center" height="50vh">
                <Spinner size="lg" />
              </Flex>
            ) : (
              <VStack spacing={4} align="start">
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    readOnly
                    placeholder="Your email"
                  />
                </FormControl>
                <Button
                  colorScheme="teal"
                  onClick={handleUpdateProfile}
                  isLoading={updating}
                >
                  Update Name
                </Button>
              </VStack>
            )}
          </Stack>
        </PageTransition>
      </Container>
    </Box>
  );
};

export default Profile;
