"use client";

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Avatar,
  Badge,
} from "@chakra-ui/react";

const storiesData = [
  {
    id: 1,
    title: "Reviving a Local Lake",
    description:
      "How a group of residents came together to clean and restore a polluted lake in their neighborhood.",
    author: "Anjali Sharma",
    date: "March 28, 2025",
    tag: "Environment",
  },
  {
    id: 2,
    title: "From Streets to School",
    description:
      "A heartwarming journey of a child who got access to education through a local NGO's effort.",
    author: "Ramesh Verma",
    date: "March 10, 2025",
    tag: "Education",
  },
  {
    id: 3,
    title: "Creating a Safer Market",
    description:
      "Vendors and citizens collaborated to install lights and set safety guidelines in a crowded market.",
    author: "Sneha Kulkarni",
    date: "February 14, 2025",
    tag: "Safety",
  },
  {
    id: 4,
    title: "Community Garden Project",
    description:
      "Vacant land turned into a green space, boosting food security and togetherness.",
    author: "Vikram Singh",
    date: "January 22, 2025",
    tag: "Sustainability",
  },
];

const Stories = () => {
  return (
    <Box p={6}>
      <Heading size="lg" mb={2}>
        Community Stories
      </Heading>
      <Text mb={6} color="gray.600">
        Inspiring stories of change and community-driven success.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} gap={{base:4, md:8}}>
        {storiesData.map((story) => (
          <Box
            key={story.id}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            p={5}
            transition="all 0.3s"
            _hover={{ shadow: "lg", transform: "scale(1.02)" }}
          >
            <Stack spacing={2}>
              <Heading size="md">{story.title}</Heading>
              <Text color="gray.600">{story.description}</Text>

              <Stack direction="row" align="center" spacing={3} mt={2}>
                {/* <Avatar name={story.author} size="sm" /> */}
                <Avatar.Root>
                  <Avatar.Fallback name={story.author} />
                  {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
                </Avatar.Root>
                <Text fontSize="sm" fontWeight="medium">
                  {story.author}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {story.date}
                </Text>
              </Stack>

              <Badge colorScheme="purple" w="fit-content">
                {story.tag}
              </Badge>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Stories;
