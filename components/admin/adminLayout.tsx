// components/AdminLayout.tsx
import React from 'react';
import Sidebar from './sidebar'; // Komponen sidebar untuk halaman admin
import { Box } from '@chakra-ui/react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex="1" p="4">
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
