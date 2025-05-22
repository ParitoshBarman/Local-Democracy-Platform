import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Badge,
} from "@chakra-ui/react";

const impactData = [
  {
    id: 1,
    title: "Clean Water Initiative Success",
    description:
      "Access to clean drinking water increased by 70% in underdeveloped areas after implementation.",
    date: "March 15, 2025",
    type: "Health",
  },
  {
    id: 2,
    title: "Improved Waste Management",
    description:
      "Recycling centers set up in 12 new locations, reducing landfill by 30%.",
    date: "February 20, 2025",
    type: "Environment",
  },
  {
    id: 3,
    title: "Educational Scholarships",
    description:
      "Over 300 students received full scholarships through the new public policy.",
    date: "January 10, 2025",
    type: "Education",
  },
  {
    id: 4,
    title: "Green Park Restoration",
    description:
      "A rundown park transformed into a thriving community green space with regular events.",
    date: "December 5, 2024",
    type: "Community",
  },
];

const Impact = () => {
  return (
    <Box p={6}>
      <Heading size="lg" mb={2}>
        Community Impact
      </Heading>
      <Text mb={6} color="gray.600">
        See the positive changes brought about by community participation and policies.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} gap={{base:4, md:8}}>
        {impactData.map((impact) => (
          <Box
            key={impact.id}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            p={5}
            transition="all 0.3s"
            _hover={{ shadow: "lg", transform: "scale(1.02)" }}
          >
            <Stack spacing={2}>
              <Heading size="md">{impact.title}</Heading>
              <Text color="gray.600">{impact.description}</Text>
              <Text fontSize="sm" color="gray.500">
                {impact.date}
              </Text>
              <Badge colorScheme="blue" w="fit-content">
                {impact.type}
              </Badge>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Impact;
