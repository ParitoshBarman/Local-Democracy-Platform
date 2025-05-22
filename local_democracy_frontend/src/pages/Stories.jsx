import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import StoryDialog from "../components/StoryDialog";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE_URL;


const Stories = () => {
  const [storiesData, setstoriesData] = useState([]);
  const [searchUrl, setSearchUrl] = useState(`${API_URL}/stories`)
  const [refreshTegger, setrefreshTegger] = useState(0)

  useEffect(() => {
    axios.get(searchUrl)
      .then((res) => {
        setstoriesData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [searchUrl, refreshTegger]);

  return (
    <Box p={6}>
      <Stack direction={'row'} justifyContent={"space-between"}>
        <Heading size="lg" mb={2}>
          Community Stories
        </Heading>
        <StoryDialog setrefreshTegger={setrefreshTegger} />
      </Stack>
      <Text mb={6} color="gray.600">
        Inspiring stories of change and community-driven success.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} gap={{ base: 4, md: 8 }}>
        {storiesData.map((story) => (
          <Box
            key={story._id}
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
                  <Avatar.Fallback name={story.author.name} />
                  <Avatar.Image src={`${IMAGE_BASE_URL}${story.author.profilePhoto}`} />
                </Avatar.Root>
                <Text fontSize="sm" fontWeight="medium">
                  {story.author.name}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(story.date).toISOString().split('T')[0]}
                </Text>
              </Stack>

              <Stack direction={"row"}>

                {story.tag.map((itm, indx) => {
                  return (
                    <Badge colorScheme="purple" w="fit-content" key={indx}>
                      {itm}
                    </Badge>
                  )
                })}
              </Stack>

            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Stories;
