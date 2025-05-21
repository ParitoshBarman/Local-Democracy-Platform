import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Field,
    Input,
    Button,
    VStack,
    Heading,
    Text,
    Link
} from '@chakra-ui/react';
import { Toaster, toaster } from "../components/ui/toaster"

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        profilePhoto: null,
    });

    const navigate = useNavigate();
    //   const toast = useToast();

    const handleChange = (e) => {
        if (e.target.name === 'profilePhoto') {
            setFormData({ ...formData, profilePhoto: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            await axios.post(`${API_URL}/auth/register`, data);
            toaster.create({
                title: 'Registered Successfully!',
                duration: 3000,
                isClosable: true,
                position: "top-right",
                type: 'success',
            })
            navigate('/login');
        } catch (err) {
            toaster.create({
                title: 'Registration failed',
                duration: 3000,
                isClosable: true,
                position: "top-right",
                type: 'error',
            })
        }
    };

    return (
        <>
            <Toaster />
            <Box
                maxW="md"
                mx="auto"
                mt={10}
                p={6}
                boxShadow="lg"
                borderRadius="xl"
                borderWidth={1}
            >
                <Heading size="lg" textAlign="center" mb={6}>
                    Register
                </Heading>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <Field.Root>
                            <Field.Label>Name</Field.Label>
                            <Input name="name" onChange={handleChange} placeholder="Enter your name" />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Email</Field.Label>
                            <Input
                                name="email"
                                type="email"
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Password</Field.Label>
                            <Input
                                name="password"
                                type="password"
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Role</Field.Label>
                            <select name="role" onChange={handleChange} value={formData.role}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Profile Photo</Field.Label>
                            <Input
                                name="profilePhoto"
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                                p={1}
                            />
                        </Field.Root>

                        <Button type="submit" colorPalette={'teal'} width="full">
                            Register
                        </Button>
                    </VStack>
                </form>
                <Text textAlign={'right'}>Go to{" "}<Link variant="underline" href="/login" colorPalette="teal">login</Link>{" "}page</Text>
            </Box>
        </>
    );
};

export default Register;
