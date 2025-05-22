import {
    Box,
    Heading,
    Text,
    Stack,
    Button,
    Badge,
    SimpleGrid,
    Progress,
    Select,
    Input,
    Flex,
    Avatar,
    HStack
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import VotingDialog from "../components/VotingDialog";
import RoleBaseDisplay from "../components/RoleBaseDisplay";
import axios from "axios";
import { useSelector } from "react-redux";
import { Toaster, toaster } from "../components/ui/toaster";

const API_URL = import.meta.env.VITE_API_BASE_URL;



export default function VotingPage() {
    const [proposals, setProposals] = useState([])
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const userState = useSelector((state) => state.user)

    const [searchQuire, setSearchQuire] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const searchInput = useRef(null);

    let debouncingId;
    function searchHandel() {
        if (debouncingId) {
            clearTimeout(debouncingId);
        }
        debouncingId = setTimeout(() => {
            setSearchQuire(searchInput.current.value);
        }, 1000);
    }


    function handelCatagoryChange(e) {
        setFilterCategory(e.target.value)
    }

    useEffect(() => {
        axios.get(`${API_URL}/votes?category=${filterCategory}&&search=${searchQuire}`)
            .then((res) => {
                setProposals(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [searchQuire, filterCategory, refreshTrigger])

    async function handelUpVote(id) {
        try {
            const response = await axios.post(`${API_URL}/votes/${id}/upvote`, {}, {
                headers: {
                    Authorization: `Bearer ${userState.accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setRefreshTrigger((prev) => prev + 1);
                toaster.create({
                    title: "Vote Registered",
                    description: "You have successfully upvoted.",
                    type: "success",
                    duration: 3000,
                    isClosable: true,
                });

                // Optionally update UI here (e.g., refetch votes or update local state)
            }
        } catch (error) {
            toaster.create({
                title: "Error",
                description: error.response?.data?.message || "Failed to upvote.",
                type: "error",
                duration: 3000,
                isClosable: true,
            });
        }

    }

    async function handelDownVote(id) {
        try {
            const response = await axios.post(`${API_URL}/votes/${id}/downvote`, {}, {
                headers: {
                    Authorization: `Bearer ${userState.accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setRefreshTrigger((prev) => prev + 1);
                toaster.create({
                    title: "Vote Registered",
                    description: "You have successfully downvoted.",
                    type: "success",
                    duration: 3000,
                    isClosable: true,
                });

                // Optionally update UI here (e.g., refetch votes or update local state)
            }
        } catch (error) {
            toaster.create({
                title: "Error",
                description: error.response?.data?.message || "Failed to downvote.",
                type: "error",
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
                    <Heading mb={4}>Community Voting</Heading>
                    <RoleBaseDisplay role={['admin']}>
                        <VotingDialog setRefreshTrigger={setRefreshTrigger} />
                    </RoleBaseDisplay>
                </Stack>

                <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={6}>
                    <Input placeholder="Search proposals..." ref={searchInput} onChange={searchHandel}/>
                    <select placeholder="Filter by Category" onChange={handelCatagoryChange} >
                        <option value="">All</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Environment">Environment</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                        <option value="Other">Other</option>
                    </select>
                </Stack>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} gap={{ base: 4, md: 8 }}>
                    {proposals.map((p) => {
                        const totalVotes = p.votes.up.length + p.votes.down.length;
                        const upPercent = Math.round((p.votes.up.length / totalVotes) * 100);
                        const downPercent = 100 - upPercent;

                        return (
                            <Box key={p._id} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
                                <Flex justify="space-between" align="center" mb={2}>
                                    <Heading fontSize="xl">{p.title}</Heading>
                                    <Badge colorScheme={p.status === "Ongoing" ? "green" : "gray"}>
                                        {p.status}
                                    </Badge>
                                </Flex>
                                <Text mb={2} color="gray.600">
                                    {new Date(p.startDate).toISOString().split('T')[0]} • {p.category}
                                </Text>
                                <Text mb={4}>{p.description}</Text>
                                <Stack direction="row" spacing={4} align="center" mb={2}>
                                    <Button leftIcon={<FaThumbsUp />} colorPalette="green" variant="outline" onClick={() => { handelUpVote(p._id) }}>
                                        {p.votes.up.length}
                                    </Button>
                                    <Button leftIcon={<FaThumbsDown />} colorPalette="red" variant="outline" onClick={() => { handelDownVote(p._id) }}>
                                        {p.votes.down.length}
                                    </Button>
                                </Stack>
                                <Text fontSize="sm" color="gray.500">
                                    {upPercent}% in favor • {downPercent}% against
                                </Text>
                                {/* <Progress mt={1} value={upPercent} colorScheme="green" height="6px" borderRadius="full" /> */}
                                <Progress.Root defaultValue={upPercent} maxW="sm">
                                    <HStack gap="5">
                                        <Progress.Track flex="1">
                                            <Progress.Range />
                                        </Progress.Track>
                                        <Progress.ValueText>{upPercent}%</Progress.ValueText>
                                    </HStack>
                                </Progress.Root>
                            </Box>
                        );
                    })}
                </SimpleGrid>
            </Box>
        </>
    );
}
