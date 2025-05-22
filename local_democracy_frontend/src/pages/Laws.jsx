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
import { useEffect, useState } from "react";
import axios from "axios";
import RoleBaseDisplay from "../components/RoleBaseDisplay";
import { useSelector } from "react-redux";
import { Toaster, toaster } from "../components/ui/toaster"
import { FaPlus } from "react-icons/fa6";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Laws() {
  const [lawsData, setLawsData] = useState([]);
  const [searchUrl, setSearchUrl] = useState(`${API_URL}/laws`)
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    axios.get(searchUrl)
      .then((res) => {
        setLawsData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [searchUrl])


  async function handelDelete(id) {
    try {
      const response = await axios.delete(`${API_URL}/laws/${id}`, {
        headers: {
          Authorization: `Bearer ${userState.accessToken}`,
        },
      });

      if (response.status === 200) {
        toaster.create({
          title: 'Deleted',
          description: 'Law deleted successfully!',
          type: 'success',
          duration: 3000,
          isClosable: true,
        });

        // Optionally re-fetch or filter out deleted item from state
        setLawsData(prev => prev.filter(law => law._id !== id));
      }
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: error?.response?.data?.msg || 'Failed to delete the law',
        type: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }
  return (
    <>
      <Toaster />
      <Box p={6}>
        <Stack direction={'row'} justifyContent={"space-between"}>
          <Heading size="lg" mb={4}>Local Laws & Proposals</Heading>
          <RoleBaseDisplay role={['admin']}>
            <Button variant="outline" colorPalette={'red'} as={'a'} href={'/upload-law'}>Create Law <FaPlus /></Button>
          </RoleBaseDisplay>
        </Stack>

        {/* Search & Filter Section */}
        <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={6}>
          <FilterBar search_url_func={setSearchUrl} search_url={searchUrl} base_url={`${API_URL}/laws`} />
        </Stack>

        {/* Laws/Proposals Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} gap={{ base: 4, md: 8 }}>
          {lawsData.map((law) => (
            <Card.Root key={law._id} borderWidth="1px" borderRadius="md">
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
                <Text fontSize="xs" color="gray.500">{new Date(law.date).toISOString().split('T')[0]}</Text>
                {/* <Button mt={3} size="sm">
                  Read More
                </Button> */}
                <RoleBaseDisplay role={"admin"}>
                  <Button mt={3} size="sm" colorPalette={'blue'} as={"a"} href={`/edit-law/${law._id}`}>
                    Edit Law
                  </Button>
                  <Button mt={3} size="sm" onClick={() => { handelDelete(law._id) }} colorPalette={'red'}>
                    Delete Law
                  </Button>
                </RoleBaseDisplay>
              </CardBody>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
