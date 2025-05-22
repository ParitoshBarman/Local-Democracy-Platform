import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";

const initiativesData = [
  {
    id: 1,
    title: "Clean City Drive",
    description:
      "Join the movement to clean up parks and streets in your community this weekend.",
    date: "April 15, 2025",
    type: "Environment",
  },
  {
    id: 2,
    title: "Health Checkup Camp",
    description:
      "Free health checkups and awareness programs organized at the community hall.",
    date: "April 18, 2025",
    type: "Healthcare",
  },
  {
    id: 3,
    title: "Tree Plantation Event",
    description:
      "Planting 500+ trees in the community park to promote green and clean surroundings.",
    date: "April 22, 2025",
    type: "Environment",
  },
  {
    id: 4,
    title: "Skill Development Workshop",
    description:
      "Hands-on sessions for youth to learn coding, design, and entrepreneurship.",
    date: "April 25, 2025",
    type: "Education",
  },
];

const Initiatives = () => {
  return (
    <Box p={6}>
      <Heading size="lg" mb={2}>
        Initiatives & Events
      </Heading>
      <Text mb={6} color="gray.600">
        Discover how your community is working together to make a difference.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} gap={{base:4, md:8}}>
        {initiativesData.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="sm"
            p={5}
            transition="all 0.3s"
            _hover={{ shadow: "md", transform: "scale(1.01)" }}
          >
            <Stack spacing={2}>
              <Heading size="md">{item.title}</Heading>
              <Text color="gray.600">{item.description}</Text>

              <Stack direction="row" align="center" spacing={2}>
                <Icon as={FiCalendar} color="gray.500" />
                <Text fontSize="sm" color="gray.500">
                  {item.date}
                </Text>
              </Stack>

              <Badge colorScheme="teal" w="fit-content">
                {item.type}
              </Badge>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Initiatives;
