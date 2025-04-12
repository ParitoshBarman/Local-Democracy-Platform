import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Badge,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { FiBell } from "react-icons/fi";


const Notifications = () => {
  const notificationState = useSelector((state)=>state.notification)

  return (
    <Box p={6}>
      <Heading mb={6} size="lg">
        <Icon as={FiBell} mr={2} />
        Notifications
        <Badge colorScheme="blue">{notificationState.length}</Badge>
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} gap={{base:4, md:8}}>
        {notificationState.map((note, indx) => (
          <Box
            key={indx}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
          >
            <HStack justify="space-between" mb={2}>
              <Badge colorScheme="blue">{note.type}</Badge>
              <Text fontSize="sm" color="gray.500">
                {note.date}
              </Text>
            </HStack>

            <Heading size="md" mb={2}>
              {note.title}
            </Heading>

            <Text color="gray.600">{note.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Notifications;
