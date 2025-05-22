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
} from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Toaster, toaster } from "../components/ui/toaster"
import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE_URL;

const VotingDialog = ({setRefreshTrigger}) => {
    const userState = useSelector((state) => state.user)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Other');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');



    const handleCreateVote = async () => {
        if (!title || !description || !startDate || !endDate) {
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
            const response = await axios.post(`${API_URL}/votes`, {
                title: title,
                description: description,
                category: category,
                startDate: startDate,
                endDate: endDate,
                postedBy: userState.user._id,
            }, {
                headers: {
                    Authorization: `Bearer ${userState.accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 201) {
                setRefreshTrigger((prev) => prev + 1);
                toaster.create({
                    title: "Vote Created",
                    description: "Your vote has been posted.",
                    type: "success",
                    duration: 3000,
                    isClosable: true,
                });
                // Reset form
                setTitle('');
                setDescription('');
                setCategory('Other');
                setStartDate('');
                setEndDate('');
            }
        } catch (error) {
            console.log(error)
            toaster.create({
                title: "Error",
                description: error.response?.data?.message || "Failed to create vote.",
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
                        <Button variant="outline" colorPalette={'red'}>Create Vote <FaPlus /></Button>
                    </Dialog.Trigger>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <Dialog.Header>
                                    <Dialog.Title>Create New Vote</Dialog.Title>
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
                                            <DataList.ItemLabel>Create By</DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                <HStack>
                                                    <Avatar.Root size="xs">
                                                        {userState.user.profilePhoto != "" ? <Avatar.Image src={`${IMAGE_BASE_URL}${userState?.user?.profilePhoto}`} /> : null}

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
                                                placeholder="Enter vote title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </Field.Root>

                                        <Field.Root required>
                                            <Field.Label>Description</Field.Label>
                                            <Textarea
                                                placeholder="Describe the vote..."
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label>Category</Field.Label>
                                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                                <option value="Infrastructure">Infrastructure</option>
                                                <option value="Environment">Environment</option>
                                                <option value="Health">Health</option>
                                                <option value="Education">Education</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </Field.Root>

                                        <Field.Root required>
                                            <Field.Label>Start Date</Field.Label>
                                            <Input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </Field.Root>

                                        <Field.Root required>
                                            <Field.Label>End Date</Field.Label>
                                            <Input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </Field.Root>
                                        <Dialog.ActionTrigger asChild>
                                            <Button colorScheme="blue" onClick={handleCreateVote}>
                                                Create Vote
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
    )
}

export default VotingDialog;