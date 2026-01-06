import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid
} from '@chakra-ui/react'

function Footer() {
  return (
    <Box py={12} bg="gray.900" color="white">
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={8}>
          <VStack align="start" gap={4}>
            <Heading size="md">BlogSpace</Heading>
            <Text color="gray.400">
              A platform for writers and readers to connect and share ideas.
            </Text>
          </VStack>

          <VStack align="start" gap={4}>
            <Heading size="sm">Platform</Heading>
            <Button variant="link" color="gray.300" justifyContent="start">
              Write
            </Button>
            <Button variant="link" color="gray.300" justifyContent="start">
              Read
            </Button>
            <Button variant="link" color="gray.300" justifyContent="start">
              Community
            </Button>
          </VStack>

          <VStack align="start" gap={4}>
            <Heading size="sm">Company</Heading>
            <Button variant="link" color="gray.300" justifyContent="start">
              About
            </Button>
            <Button variant="link" color="gray.300" justifyContent="start">
              Careers
            </Button>
            <Button variant="link" color="gray.300" justifyContent="start">
              Contact
            </Button>
          </VStack>

          <VStack align="start" gap={4}>
            <Heading size="sm">Legal</Heading>
            <Button variant="link" color="gray.300" justifyContent="start">
              Privacy
            </Button>
            <Button variant="link" color="gray.300" justifyContent="start">
              Terms
            </Button>
            <Button variant="link" color="gray.300" justifyContent="start">
              Guidelines
            </Button>
          </VStack>
        </SimpleGrid>

        <Box borderTopWidth={1} borderColor="gray.700" mt={12} pt={8}>
          <Text textAlign="center" color="gray.400">
            © 2024 BlogSpace. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
