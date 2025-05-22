import {
  Avatar,
  Badge,
  Button,
  CloseButton,
  DataList,
  Dialog,
  HStack,
  Portal,
  Textarea,
  VStack,
  Field,
  Input
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Toaster, toaster } from "../components/ui/toaster";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE_URL;

const StoryDialog = ({setrefreshTegger}) => {
  const userState = useSelector((state) => state.user);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState('');

  const handleCreateStory = async () => {
    if (!title || !description || !date || !tags) {
      toaster.create({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        type: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/stories`,
        {
          title,
          description,
          date,
          tag: tags.split(',').map(tag => tag.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${userState.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setrefreshTegger((prev)=>prev+1);
        toaster.create({
          title: "Story Created",
          description: "Your story has been posted.",
          type: "success",
          duration: 3000,
          isClosable: true,
        });

        // Reset form
        setTitle('');
        setDescription('');
        setDate('');
        setTags('');
      }
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Error",
        description: error.response?.data?.msg || "Failed to create story.",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Toaster />
      <VStack alignItems="start">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="outline" colorPalette="blue">
              Create Story <FaPlus />
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Create New Story</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body pb="8">
                  <DataList.Root orientation="horizontal">
                    <DataList.Item>
                      <DataList.ItemLabel>Role</DataList.ItemLabel>
                      <DataList.ItemValue>
                        <Badge colorPalette="green">{userState.user.role}</Badge>
                      </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Author</DataList.ItemLabel>
                      <DataList.ItemValue>
                        <HStack>
                          <Avatar.Root size="xs">
                            {userState.user.profilePhoto && (
                              <Avatar.Image src={`${IMAGE_BASE_URL}${userState?.user?.profilePhoto}`} />
                            )}
                            <Avatar.Fallback name={userState.user.name} />
                          </Avatar.Root>
                          {userState.user.name}
                        </HStack>
                      </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Email</DataList.ItemLabel>
                      <DataList.ItemValue>{userState.user.email}</DataList.ItemValue>
                    </DataList.Item>
                  </DataList.Root>

                  {/* Form Inputs */}
                  <VStack spacing={4} mt={6} align="stretch">
                    <Field.Root required>
                      <Field.Label>Title</Field.Label>
                      <Input
                        placeholder="Enter story title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Description</Field.Label>
                      <Textarea
                        placeholder="Describe your story..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Tags (comma separated)</Field.Label>
                      <Input
                        placeholder="e.g. health, environment"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Date</Field.Label>
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </Field.Root>

                    <Dialog.ActionTrigger asChild>
                      <Button colorScheme="blue" onClick={handleCreateStory}>
                        Publish Story
                      </Button>
                    </Dialog.ActionTrigger>
                  </VStack>
                </Dialog.Body>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </VStack>
    </>
  );
};

export default StoryDialog;
