"use client";

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
import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const proposals = [
    {
        id: 1,
        title: "Renovation of Community Park",
        description:
            "Proposal to improve the walking tracks, lighting and children play area in the community park.",
        date: "April 1, 2025",
        category: "Infrastructure",
        votes: { up: 320, down: 80 },
        status: "Ongoing",
    },
    {
        id: 2,
        title: "Ban Single-Use Plastics",
        description:
            "Proposal to ban single-use plastics in local stores and encourage eco-friendly packaging.",
        date: "March 20, 2025",
        category: "Environment",
        votes: { up: 420, down: 30 },
        status: "Closed",
    },
];

export default function VotingPage() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [search, setSearch] = useState("");

    return (
        <Box p={6}>
            <Heading mb={4}>Community Voting</Heading>

            <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={6}>
                <Input
                    placeholder="Search proposals..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    placeholder="Filter by Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="Environment">Environment</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Education">Education</option>
                </select>
            </Stack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} gap={{ base: 4, md: 8 }}>
                {proposals
                    .filter((p) =>
                        p.title.toLowerCase().includes(search.toLowerCase()) &&
                        (selectedCategory === "" || p.category === selectedCategory)
                    )
                    .map((p) => {
                        const totalVotes = p.votes.up + p.votes.down;
                        const upPercent = Math.round((p.votes.up / totalVotes) * 100);
                        const downPercent = 100 - upPercent;

                        return (
                            <Box key={p.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
                                <Flex justify="space-between" align="center" mb={2}>
                                    <Heading fontSize="xl">{p.title}</Heading>
                                    <Badge colorScheme={p.status === "Ongoing" ? "green" : "gray"}>
                                        {p.status}
                                    </Badge>
                                </Flex>
                                <Text mb={2} color="gray.600">
                                    {p.date} • {p.category}
                                </Text>
                                <Text mb={4}>{p.description}</Text>
                                <Stack direction="row" spacing={4} align="center" mb={2}>
                                    <Button leftIcon={<FaThumbsUp />} colorScheme="green" variant="outline">
                                        {p.votes.up}
                                    </Button>
                                    <Button leftIcon={<FaThumbsDown />} colorScheme="red" variant="outline">
                                        {p.votes.down}
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
    );
}
