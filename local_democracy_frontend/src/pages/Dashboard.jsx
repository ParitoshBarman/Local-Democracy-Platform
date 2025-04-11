import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  Button,
  Avatar,
  HStack,
  VStack,
  Progress,
  Icon,
} from "@chakra-ui/react";

import { FiBell, FiFileText, FiThumbsUp, FiActivity, FiUsers } from "react-icons/fi";

const Dashboard = () => {
  return (
    <Box p={6} bg={"gray.50"} minH="100vh">
      {/* Welcome Section */}
      <VStack align="start" mb={6}>
        <Heading size="lg">Welcome back, Paritosh 👋</Heading>
        <Text color="gray.500">Here’s what’s happening in your community today.</Text>
      </VStack>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6} gap={{base:4, md:8}}>
        <StatCard icon={FiBell} label="Notifications" number="8" />
        <StatCard icon={FiFileText} label="Active Laws" number="5" />
        <StatCard icon={FiThumbsUp} label="Votes Remaining" number="2" />
      </SimpleGrid>

      {/* Recent Notifications */}
      <Box mb={8}>
        <SectionHeader title="Recent Notifications" />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} gap={{base:4, md:8}}>
          <NotificationCard title="Water Supply Disruption" description="Planned maintenance on 10th April" />
          <NotificationCard title="Local Market Cleanup" description="Volunteers needed this Saturday" />
        </SimpleGrid>
        <Button mt={4} size="sm" variant="link" colorScheme="blue">View all</Button>
      </Box>

      {/* Trending Laws / Proposals */}
      <Box mb={8}>
        <SectionHeader title="Trending Proposals" />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} gap={{base:4, md:8}}>
          <ProposalCard title="Plastic Ban in Local Stores" votes="348" />
          <ProposalCard title="Park Renovation Project" votes="275" />
        </SimpleGrid>
      </Box>

      {/* Impact Snapshot */}
      <Box mb={8}>
        <SectionHeader title="Your Community Impact" />
        <Box p={4} rounded="lg" bg="white" shadow="sm">
          <Text fontSize="sm" mb={2}>You've participated in 3 votes this month</Text>
          {/* <Progress.Root value={60} colorScheme="green" size="sm" /> */}
          <Progress.Root defaultValue={60} size='sm' colorScheme='green'>
            <HStack gap="5">
              
              <Progress.Track flex="1">
                <Progress.Range />
              </Progress.Track>
              <Progress.ValueText>60%</Progress.ValueText>
            </HStack>
          </Progress.Root>
        </Box>
      </Box>

      {/* Community Stories */}
      <Box>
        <SectionHeader title="Community Stories" />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} gap={{base:4, md:8}}>
          <StoryCard name="Aarav S." story="Led a neighborhood cleanup drive last Sunday." />
          <StoryCard name="Neha T." story="Organized free health checkup for seniors." />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Dashboard;

// Reusable components

const StatCard = ({ icon, label, number }) => (
  <Stat.Root p={4} bg="white" shadow="sm" rounded="md">
    <HStack>
      <Icon as={icon} boxSize={6} color="blue.500" />
      <VStack align="start" spacing={0}>
        <StatLabel>{label}</StatLabel>
        <StatLabel >{number}</StatLabel >
      </VStack>
    </HStack>
  </Stat.Root>
);

const SectionHeader = ({ title }) => (
  <Heading size="md" mb={3} borderLeft="4px solid #3182ce" pl={2}>{title}</Heading>
);

const NotificationCard = ({ title, description }) => (
  <Box p={4} bg="white" rounded="md" shadow="sm">
    <Heading size="sm" mb={1}>{title}</Heading>
    <Text fontSize="sm" color="gray.500">{description}</Text>
  </Box>
);

const ProposalCard = ({ title, votes }) => (
  <Box p={4} bg="white" rounded="md" shadow="sm">
    <Text fontWeight="bold">{title}</Text>
    <Text fontSize="sm" mt={1} color="gray.500">{votes} community votes</Text>
    <Button mt={2} size="sm" colorScheme="blue">View & Vote</Button>
  </Box>
);

const StoryCard = ({ name, story }) => (
  <Box p={4} bg="white" rounded="md" shadow="sm">
    <HStack mb={2}>
      <Avatar.Root>
        <Avatar.Fallback name={name} />
        <Avatar.Image src="https://bit.ly/sage-adebayo" />
      </Avatar.Root>
      <Text fontWeight="bold">{name}</Text>
    </HStack>
    <Text fontSize="sm" color="gray.600">{story}</Text>
  </Box>
);
