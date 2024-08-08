import React, { useState } from 'react';
import { NextPage } from 'next';
import {
  Box,
  Container,
  Heading,
  Input,
  Textarea,
  Button,
  VStack,
  FormControl,
  FormLabel,
  HStack,
  Text,
} from '@chakra-ui/react';
import { db } from '../../utils/firebaseClient';
import { collection, doc, setDoc } from 'firebase/firestore';

const SubmitPricing: NextPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [plans, setPlans] = useState<any[]>([
    { id: '', title: '', description: '', price: '', features: [], action: { href: '' } },
  ]);

  const handleAddPlan = () => {
    setPlans([...plans, { id: '', title: '', description: '', price: '', features: [], action: { href: '' } }]);
  };

  const handleChangePlan = (index: number, field: string, value: any) => {
    const updatedPlans = [...plans];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    setPlans(updatedPlans);
  };

  const handleSubmit = async () => {
    const pricingData = { title, description, plans };
    try {
      await setDoc(doc(db, 'pricing', 'current'), pricingData);
      alert('Data berhasil disimpan');
    } catch (error) {
      console.error('Error menyimpan data:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  return (
    <Container maxW="container.md" py={6}>
      <VStack spacing={6} align="start">
        <Heading>Submit Pricing Data</Heading>
        <FormControl id="title">
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        {plans.map((plan, index) => (
          <Box key={index} borderWidth={1} borderRadius="md" p={4}>
            <Heading size="sm">Plan {index + 1}</Heading>
            <FormControl mt={4}>
              <FormLabel>ID</FormLabel>
              <Input value={plan.id} onChange={(e) => handleChangePlan(index, 'id', e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input value={plan.title} onChange={(e) => handleChangePlan(index, 'title', e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea value={plan.description} onChange={(e) => handleChangePlan(index, 'description', e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input value={plan.price} onChange={(e) => handleChangePlan(index, 'price', e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Features (comma separated)</FormLabel>
              <Input
                value={plan.features.join(', ')}
                onChange={(e) => handleChangePlan(index, 'features', e.target.value.split(', ').map(f => f.trim()))}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Action URL</FormLabel>
              <Input
                value={plan.action.href}
                onChange={(e) => handleChangePlan(index, 'action', { href: e.target.value })}
              />
            </FormControl>
          </Box>
        ))}
        <Button mt={4} onClick={handleAddPlan}>Add Plan</Button>
        <Button mt={4} colorScheme="teal" onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Container>
  );
};

export default SubmitPricing;
