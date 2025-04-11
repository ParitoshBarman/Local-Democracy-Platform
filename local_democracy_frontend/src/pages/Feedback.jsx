"use client";

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

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submit (you can replace with API)
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setFormData({
      name: "",
      email: "",
      category: "",
      message: "",
    });
  };

  return (
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
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Select category"
              id="issue"
              style={{border:'1px solid gray', borderRadius:'4px'}}
            >
              <option value="App Issue">App Issue</option>
              <option value="Suggestion">Suggestion</option>
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
  );
};

export default Feedback;
