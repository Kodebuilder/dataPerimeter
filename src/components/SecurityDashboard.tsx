import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface SecurityMetrics {
  identityCompliance: number;
  resourceCompliance: number;
  networkCompliance: number;
  totalAlerts: number;
}

export const SecurityDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    identityCompliance: 0,
    resourceCompliance: 0,
    networkCompliance: 0,
    totalAlerts: 0,
  });

  const [trendData, setTrendData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch security metrics
    const fetchMetrics = async () => {
      // Implement actual metrics fetching from AWS Security Lake
      // This is a placeholder
      setMetrics({
        identityCompliance: 85,
        resourceCompliance: 92,
        networkCompliance: 88,
        totalAlerts: 12,
      });
    };

    // Fetch trend data
    const fetchTrendData = async () => {
      // Implement actual trend data fetching
      // This is a placeholder
      setTrendData([
        { name: 'Week 1', alerts: 15, compliance: 82 },
        { name: 'Week 2', alerts: 12, compliance: 85 },
        { name: 'Week 3', alerts: 8, compliance: 90 },
        { name: 'Week 4', alerts: 12, compliance: 88 },
      ]);
    };

    fetchMetrics();
    fetchTrendData();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={5}>Security Perimeter Dashboard</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={10}>
        <Stat>
          <StatLabel>Identity Compliance</StatLabel>
          <StatNumber>{metrics.identityCompliance}%</StatNumber>
          <Progress value={metrics.identityCompliance} colorScheme="green" />
          <StatHelpText>IAM and Permission Boundaries</StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Resource Compliance</StatLabel>
          <StatNumber>{metrics.resourceCompliance}%</StatNumber>
          <Progress value={metrics.resourceCompliance} colorScheme="blue" />
          <StatHelpText>Resource Access Controls</StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Network Compliance</StatLabel>
          <StatNumber>{metrics.networkCompliance}%</StatNumber>
          <Progress value={metrics.networkCompliance} colorScheme="purple" />
          <StatHelpText>Network Controls and VPC</StatHelpText>
        </Stat>
      </SimpleGrid>

      <Box mb={10}>
        <Heading size="md" mb={5}>Security Trends</Heading>
        <LineChart width={800} height={300} data={trendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="alerts" 
            stroke="#8884d8" 
            name="Security Alerts"
          />
          <Line 
            type="monotone" 
            dataKey="compliance" 
            stroke="#82ca9d" 
            name="Overall Compliance %"
          />
        </LineChart>
      </Box>
    </Box>
  );
};