import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react'
import { Link } from 'react-router'
import { FaPen } from 'react-icons/fa'

const CallToActionSection = ({ isAuthenticated }) => {
  return (
    <Box
      bgGradient="to-br"
      gradientFrom="blue.50"
      gradientTo="purple.50"
      _dark={{
        gradientFrom: "blue.900",
        gradientTo: "purple.900"
      }}
      py={12}
    >
      <Container maxW="container.md" textAlign="center">
        <VStack gap={6}>
          <Heading size="xl">
            Ready to Share Your Knowledge?
          </Heading>
          <Text textStyle="lg" color="gray.600">
            Join thousands of developers who are already sharing their insights and experiences.
          </Text>
          <HStack gap={4}>
            {isAuthenticated ? (
              <Button
                as={Link}
                to="/create-post"
                size="lg"
                colorPalette="blue"
              >
                <FaPen />
                Start Writing
              </Button>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/register"
                  size="lg"
                  colorPalette="blue"
                >
                  Get Started
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  size="lg"
                  variant="outline"
                >
                  Sign In
                </Button>
              </>
            )}
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default CallToActionSection
