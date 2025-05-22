import {
  Box,
  Heading,
  Text,
  Stack,
  Input,
  Select,
  Textarea,
  Button,

} from "@chakra-ui/react";
import { useState } from "react";
import { Toaster, toaster } from '../components/ui/toaster'
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/feedbacks`, formData);

      // Success toast
      toaster.create({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
        type: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset the form
      setFormData({
        name: "",
        email: "",
        issue: "",
        message: "",
      });

    } catch (error) {
      // Error toast
      toaster.create({
        title: "Submission Failed",
        description: error.response?.data?.message || "Something went wrong.",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Toaster />
      <Box p={6}>
        <Heading size="lg" mb={2}>
          Feedback
        </Heading>
        <Text mb={6} color="gray.600">
          We value your feedback. Please share your thoughts or concerns below.
        </Text>

        <Box
          as="form"
          maxW="600px"
          mx="auto"
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          onSubmit={handleSubmit}
        >
          <Stack spacing={4}>

            <label htmlFor="name">Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              id="name"
            />



            <label htmlFor="email">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              id="email"
            />


            <label htmlFor="issue">Choose Issue</label>
            <select
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              placeholder="Select category"
              id="issue"
              style={{ border: '1px solid gray', borderRadius: '4px' }}
            >
              <option value="Suggesiion">Suggesiion</option>
              <option value="App Issue">App Issue</option>
              <option value="Bug">Bug</option>
              <option value="Feature Request">Feature Request</option>
              <option value="UI Problem">UI Problem</option>
              <option value="Performance">Performance</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="message">Message</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your feedback here..."
              rows={5}
              id="message"
            />


            <Button type="submit" colorScheme="blue" size="lg" w="full">
              Submit Feedback
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Feedback;
