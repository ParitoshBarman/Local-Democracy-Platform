import {
  Box,
  Heading,
  Text,
  Input,
  Select,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Stack,
  Badge,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import FilterBar from "../components/FilterBar";

const lawsData = [
  {
    id: 1,
    title: "Tree Cutting Regulation Amendment",
    summary: "Proposed changes to current tree-cutting regulations in urban areas.",
    status: "Proposed",
    date: "April 9, 2025",
    category: "Environment",
  },
  {
    id: 2,
    title: "Smart Parking System Implementation",
    summary: "A proposal to install smart parking sensors across the city.",
    status: "Under Review",
    date: "April 3, 2025",
    category: "Infrastructure",
  },
  {
    id: 3,
    title: "Public School Infrastructure Upgrade",
    summary: "Plan to renovate 20 public schools in the district.",
    status: "Approved",
    date: "March 27, 2025",
    category: "Education",
  },
];

export default function Laws() {
  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>Local Laws & Proposals</Heading>

      {/* Search & Filter Section */}
      <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={6}>
        <FilterBar/>
      </Stack>

      {/* Laws/Proposals Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} gap={{base:4, md:8}}>
        {lawsData.map((law) => (
          <Card.Root key={law.id} borderWidth="1px" borderRadius="md">
            <CardHeader>
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">{law.title}</Text>
                <Badge colorScheme={
                  law.status === "Proposed" ? "yellow" :
                  law.status === "Approved" ? "green" : "orange"
                }>
                  {law.status}
                </Badge>
              </HStack>
            </CardHeader>
            <CardBody>
              <Text fontSize="sm" mb={3}>{law.summary}</Text>
              <Text fontSize="xs" color="gray.500">{law.date}</Text>
              <Button mt={3} size="sm" colorScheme="blue">
                Read More
              </Button>
            </CardBody>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Box>
  );
}
