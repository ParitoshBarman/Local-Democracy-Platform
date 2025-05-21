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
import { Toaster, toaster } from '../components/ui/toaster';
import { useDispatch } from 'react-redux';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/auth/login`, formData);
            
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            
            toaster.create({
                title: 'Login successful!',
                type: 'success',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            });


            // Redirect after login
            navigate('/dashboard');
        } catch (err) {
            toaster.create({
                title: 'Login failed',
                description: err.response?.data?.message || 'Invalid email or password',
                type: 'error',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            });
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
                    Login
                </Heading>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <Field.Root>
                            <Field.Label>Email</Field.Label>
                            <Input
                                name="email"
                                type="email"
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Password</Field.Label>
                            <Input
                                name="password"
                                type="password"
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </Field.Root>

                        <Button type="submit" colorPalette={'teal'} width="full">
                            Login
                        </Button>
                    </VStack>
                </form>

                <Text textAlign={'right'}>
                    Don't have an account?{' '}
                    <Link variant="underline" href="/register" colorPalette="teal">
                        Register
                    </Link>
                </Text>
            </Box>
        </>
    );
};

export default Login;
