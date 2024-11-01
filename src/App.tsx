import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { SecurityDashboard } from './components/SecurityDashboard';
import { IdentityPerimeter } from './services/IdentityPerimeter';
import { ResourcePerimeter } from './services/ResourcePerimeter';
import { NetworkPerimeter } from './services/NetworkPerimeter';

function App() {
  // Initialize perimeter services
  const region = process.env.AWS_REGION || 'us-east-1';
  const identityPerimeter = new IdentityPerimeter(region);
  const resourcePerimeter = new ResourcePerimeter(region);
  const networkPerimeter = new NetworkPerimeter(region);

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        <SecurityDashboard />
      </Box>
    </ChakraProvider>
  );
}

export default App;