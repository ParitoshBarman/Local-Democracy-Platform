// import {
//   Box,
//   Heading,
//   Text,
//   Stack,
//   SimpleGrid,
//   Button,
//   Badge,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
// } from "@chakra-ui/react";
// import { toaster } from "../components/ui/toaster";

// const proposals = [
//   {
//     id: 1,
//     title: "Install More Street Lights",
//     description:
//       "Proposal to increase the number of street lights in residential areas.",
//     category: "Infrastructure",
//   },
//   {
//     id: 2,
//     title: "Ban Single-Use Plastics",
//     description:
//       "Proposal to ban the use of single-use plastics in all local stores.",
//     category: "Environment",
//   },
//   {
//     id: 3,
//     title: "Free Wi-Fi in Public Parks",
//     description: "Proposal to provide free public Wi-Fi in community parks.",
//     category: "Technology",
//   },
// ];

// const Voting = () => {

//   const handleVote = (id, vote) => {
//     console.log('Toster is calling..')
//     toaster.create({
//       title: `Vote Submitted`,
//       description: `You voted '${vote}' on proposal #${id}`,
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
    
//   };

//   return (
//     <Box p={6}>
//       <Heading size="lg" mb={6}>
//         Voting Center
//       </Heading>

//       <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} gap={{base:4, md:8}}>
//         {proposals.map((proposal) => (
//           <Card.Root key={proposal.id} shadow="md" borderWidth="1px">
//             <CardHeader>
//               <Stack spacing={1}>
//                 <Heading size="md">{proposal.title}</Heading>
//                 <Badge colorScheme="blue" w="fit-content">
//                   {proposal.category}
//                 </Badge>
//               </Stack>
//             </CardHeader>

//             <CardBody>
//               <Text>{proposal.description}</Text>
//             </CardBody>

//             <CardFooter>
//               <Stack direction="row" spacing={4}>
//                 <Button
//                   colorScheme="green"
//                   onClick={() => handleVote(proposal.id, "Yes")}
//                 >
//                   Yes
//                 </Button>
//                 <Button
//                   colorScheme="red"
//                   onClick={() => handleVote(proposal.id, "No")}
//                 >
//                   No
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => handleVote(proposal.id, "Neutral")}
//                 >
//                   Neutral
//                 </Button>
//               </Stack>
//             </CardFooter>
//           </Card.Root>
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default Voting;
