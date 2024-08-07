// pages/dashboard.tsx
import React from 'react';
import { NextPage } from 'next';
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  Link,
  Divider,
  VStack,
  HStack,
  Icon,
  Button,
} from '@chakra-ui/react';
import { FiChevronRight, FiEdit, FiActivity, FiFileText, FiDownload, FiPlay, FiAlertTriangle } from 'react-icons/fi';
import { BiDiamond } from "react-icons/bi";
import { BackgroundGradient } from 'components/gradients/background-gradient';
import { PageTransition } from 'components/motion/page-transition';
import { SEO } from 'components/seo/seo';
import Image from 'next/image';

const Dashboard: NextPage = () => {
  return (
    <Box>
      <SEO title="Dashboard" description="User dashboard" />
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.lg" pt={{ base: 10, md: 20 }} pb={{ base: 10, md: 20 }}>
        <PageTransition>
          <Stack spacing={6}>
            {/* Header Section */}
            <Box>
              <HStack justify="space-between" align="center" mb={4}>
                <Heading size="lg">Your Plan</Heading>
                <Image
                  src="/static/images/Logo Serba Premium.png"
                  alt="Logo"
                  width={60}
                  height={40}
                />
              </HStack>
              <Box bg="blue.600" color="white" p={4} borderRadius="md">
                <Heading size="md">Premium</Heading>
                <Text>Your premium is valid until August 31, 2024 03:49:31 (UTC +7).</Text>
              </Box>
            </Box>

            {/* Account Section */}
            <Box>
              <Heading size="md" mb={4}>Account</Heading>
              <VStack spacing={4} align="start">
                <Link href="./profile" display="flex" _hover={{ textDecor: 'none' }}>
                  <Icon as={FiEdit} mr={2} />
                  <Text>Edit profile</Text>
                  <Icon as={FiChevronRight} ml="auto" />
                </Link>
                <Link href="./logs" display="flex" _hover={{ textDecor: 'none' }}>
                  <Icon as={FiActivity} mr={2} />
                  <Text>Activity logs</Text>
                  <Icon as={FiChevronRight} ml="auto" />
                </Link>
              </VStack>
            </Box>

            {/* Premium Section */}
            <Box>
              <Heading size="md" mb={4}>Premium</Heading>
              <VStack spacing={4} align="start">
                <Link href="/price" display="flex" _hover={{ textDecor: 'none' }}>
                  <Icon as={BiDiamond} mr={2} />
                  <Text>Purchase premium</Text>
                  <Icon as={FiChevronRight} ml="auto" />
                </Link>
                <Link href="./history" display="flex" _hover={{ textDecor: 'none' }}>
                  <Icon as={FiFileText} mr={2} />
                  <Text>Order history</Text>
                  <Icon as={FiChevronRight} ml="auto" />
                </Link>
              </VStack>
            </Box>

            {/* Extension Section */}
            <Box>
              <Heading size="md" mb={4}>Extension</Heading>
              <VStack spacing={4} align="start">
                <Link href="./download/groupy-extension-1.5.1-release.zip" display="flex" _hover={{ textDecor: 'none' }}>
                  <Icon as={FiDownload} mr={2} />
                  <Text>Download the latest version (1.5.1)</Text>
                  <Icon as={FiChevronRight} ml="auto" />
                </Link>
                <Link href="#" id="openModalBtn" display="flex" _hover={{ textDecor: 'none' }}>
                  <Icon as={FiPlay} mr={2} />
                  <Text>Watch the installation video</Text>
                  <Icon as={FiChevronRight} ml="auto" />
                </Link>
              </VStack>
            </Box>

            {/* Service Section */}
            <Box>
              <Heading size="md" mb={4}>Service</Heading>
              <Link href="./report" display="flex" _hover={{ textDecor: 'none' }}>
                <Icon as={FiAlertTriangle} mr={2} />
                <Text>Report service</Text>
                <Icon as={FiChevronRight} ml="auto" />
              </Link>
            </Box>

            {/* Video Modal */}
            <Box id="videoModal" display="none">
              <Box className="modal-content" p={4}>
                <video id="videoElement" controls loop width="100%" height="100%">
                  <source src="#" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            </Box>
          </Stack>
        </PageTransition>
      </Container>
    </Box>
  );
};

export default Dashboard;
