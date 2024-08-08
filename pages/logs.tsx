import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import {
  Box,
  Container,
  Heading,
  VStack,
  Spinner,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Text,
} from '@chakra-ui/react';
import { BackgroundGradient } from 'components/gradients/background-gradient';
import { PageTransition } from 'components/motion/page-transition';
import { auth, db } from '../utils/firebaseClient';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface ActivityLog {
  activity: string;
  browser: string;
  timestamp: string;
}

const ActivityLogs: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchActivityLogs(user.uid);
      } else {
        console.log('No user is signed in');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [toast]);

  const fetchActivityLogs = async (userId: string) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'activityLogs'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const logsData: ActivityLog[] = [];
      querySnapshot.forEach((doc) => {
        logsData.push(doc.data() as ActivityLog);
      });
      setLogs(logsData);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      toast({
        title: 'Error loading logs',
        description: 'There was an error loading your activity logs.',
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
    <Box minHeight="80vh">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.lg" pt="80px" pb="20">
        <PageTransition>
          {loading ? (
            <Flex align="center" justify="center" height="60vh">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <VStack spacing={6} align="start">
              <Heading>Activity Logs</Heading>
              <Table variant="striped" colorScheme="teal">
                <TableCaption placement="top">Activity logs for your account</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Activity</Th>
                    <Th>Browser</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {logs.map((log, index) => (
                    <Tr key={index}>
                      <Td>{log.activity}</Td>
                      <Td>{log.browser}</Td>
                      <Td>{new Date(log.timestamp).toLocaleString()}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {logs.length === 0 && !loading && (
                <Text>No activity logs found. Your activities will be logged here.</Text>
              )}
            </VStack>
          )}
        </PageTransition>
      </Container>
    </Box>
  );
};

export default ActivityLogs;
