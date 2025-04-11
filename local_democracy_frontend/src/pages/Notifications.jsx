import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Badge,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";

const notifications = [
  {
    id: 1,
    title: "Road Repair Work in Sector 5",
    description: "The road near Green Park will be under maintenance this week.",
    date: "April 11, 2025",
    type: "Infrastructure",
  },
  {
    id: 2,
    title: "Water Supply Disruption",
    description:
      "Water supply will be disrupted in your locality on April 12 from 10 AM - 4 PM.",
    date: "April 10, 2025",
    type: "Utility",
  },
  {
    id: 3,
    title: "Public Hearing on Local Park Renovation",
    description:
      "Join the community discussion on plans for upgrading the community park.",
    date: "April 9, 2025",
    type: "Community",
  },
  {
    id: 4,
    title: "Power Outage Notification",
    description:
      "Scheduled power maintenance will occur on April 13 from 9 AM to 1 PM in Sector 12.",
    date: "April 11, 2025",
    type: "Utility",
  },
  {
    id: 5,
    title: "Vaccination Drive - Free COVID Boosters",
    description:
      "A free COVID-19 vaccination drive will be held at the community hall on April 15.",
    date: "April 10, 2025",
    type: "Health",
  },
  {
    id: 6,
    title: "Street Light Fault Reported",
    description:
      "Street lights near Avenue Road have been reported faulty. Maintenance team will inspect tonight.",
    date: "April 8, 2025",
    type: "Maintenance",
  },
  {
    id: 7,
    title: "Garbage Pickup Delay",
    description:
      "Garbage collection will be delayed by one day this week due to a municipal strike.",
    date: "April 7, 2025",
    type: "Sanitation",
  },
  {
    id: 8,
    title: "Community Sports Event This Sunday",
    description:
      "Don't miss the annual sports fest at the town field. Starts at 9 AM. All are welcome!",
    date: "April 6, 2025",
    type: "Event",
  },
  {
    id: 9,
    title: "Noise Complaint Hearing",
    description:
      "A public hearing will be held regarding repeated noise complaints in Block D.",
    date: "April 5, 2025",
    type: "Public Safety",
  },
  {
    id: 10,
    title: "Free Tree Plantation Drive",
    description:
      "Join the local tree plantation campaign this weekend and receive free saplings.",
    date: "April 4, 2025",
    type: "Environment",
  },
];


const Notifications = () => {
  return (
    <Box p={6}>
      <Heading mb={6} size="lg">
        <Icon as={FiBell} mr={2} />
        Notifications
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} gap={{base:4, md:8}}>
        {notifications.map((note) => (
          <Box
            key={note.id}
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
