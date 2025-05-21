import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Input,
    Textarea,
    Button,
    VStack,
    Field
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Toaster, toaster } from "../components/ui/toaster"
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const EditLaw = () => {
    const navigate = useNavigate();
    const userState = useSelector((state) => state.user);
    const user = useSelector((state) => state.user?.user);

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [status, setStatus] = useState('Proposed');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('Other');
    const [link, setLink] = useState('');

    const { id } = useParams();


    if (user?.role !== 'admin') {
        return (
            <Box p={8}>
                <Heading size="md" color="red.500">Access Denied</Heading>
                <p>You do not have permission to view this page.</p>
            </Box>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !summary || !date) {
            toaster.create({
                title: 'Missing Fields',
                description: 'Please fill in required fields.',
                type: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {

            const response = await axios.patch(`${API_URL}/laws/${id}`, { title: title, summary: summary, status: status, date: date, category: category, link: link }, {
                headers: {
                    Authorization: `Bearer ${userState.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                toaster.create({
                    title: 'Success',
                    description: 'Law Updated successfully!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/laws");
            } else {
                throw new Error(response.data?.msg || 'Update failed');
            }
        } catch (err) {
            toaster.create({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };


    useEffect(() => {
        if (!id) return;

        const fetchLawDetails = async () => {
            try {
                const res = await axios.get(`${API_URL}/laws/${id}`, {
                    headers: {
                        Authorization: `Bearer ${userState.accessToken}`,
                    },
                });

                const law = res.data;

                // Pre-fill values
                setTitle(law.title || '');
                setSummary(law.summary || '');
                setStatus(law.status || 'Proposed');
                setDate(law.date ? law.date.split('T')[0] : '');
                setCategory(law.category || 'Other');
                setLink(law.link || '');

            } catch (error) {
                toaster.create({
                    title: 'Error loading law',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchLawDetails();
    }, [id, userState.accessToken]);

    return (
        <>
            <Toaster />
            <Box p={8} maxW="600px" mx="auto">
                <Heading mb={6}>Edit Law</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="stretch">
                        <Field.Root>
                            <Field.Label>Title</Field.Label>
                            <Input
                                placeholder="Enter law title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Summary</Field.Label>
                            <Textarea
                                placeholder="Enter summary of the law"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                rows={5}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Status</Field.Label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Proposed">Proposed</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Publish Date</Field.Label>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Category</Field.Label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Environment">Environment</option>
                                <option value="Health">Health</option>
                                <option value="Education">Education</option>
                                <option value="Infrastructure">Infrastructure</option>
                                <option value="Public Safety">Public Safety</option>
                                <option value="Other">Other</option>
                            </select>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Reference Link (optional)</Field.Label>
                            <Input
                                type="url"
                                placeholder="https://example.com"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </Field.Root>

                        <Button type="submit" colorScheme="blue" width="full">
                            Submit Law
                        </Button>
                    </VStack>
                </form>
            </Box>
        </>
    );
};

export default EditLaw;
