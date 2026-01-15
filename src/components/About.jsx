import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Card,
  Button,
  Badge,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Link as RouterLink } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FiUsers, FiTarget, FiArrowDown, FiArrowRight } from "react-icons/fi";

function About() {
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const accentColor = useColorModeValue("blue.600", "blue.400");

  const features = [
    {
      icon: FiUsers,
      title: "Community-Driven",
      description: "Connect with writers and readers from around the world to share knowledge and ideas.",
      badge: "Growing",
    },
    {
      icon: FiTarget,
      title: "Easy Publishing",
      description: "Create and publish your articles effortlessly with our intuitive editor and simple workflow.",
      badge: "Intuitive",
    },
    {
      icon: FiArrowDown,
      title: "Knowledge Sharing",
      description: "Share your expertise and learn from others in our diverse community of content creators.",
      badge: "Inspiring",
    },
  ];

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={bgColor}>
      <Navbar />

      {/* Hero Section */}
      <Box
        bgGradient={useColorModeValue(
          "linear(to-r, blue.50, purple.50)",
          "linear(to-r, gray.800, gray.900)"
        )}
        py={16}
        px={4}
      >
        <Container maxW="4xl">
          <VStack gap={6} textAlign="center">
            <Heading as="h1" size="2xl" fontWeight="bold">
              About BlogSpace - Updated via pipeline
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl">
              Welcome to BlogSpace, your platform for sharing ideas, knowledge, and stories with a global community of writers and readers.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="4xl" py={16} px={4} flex={1}>
        <VStack gap={16} align="stretch">
          {/* Mission Section */}
          <Box>
            <Heading as="h2" size="xl" mb={6} color={accentColor}>
              Our Mission
            </Heading>
            <Text fontSize="md" color={textColor} lineHeight={1.8}>
              BlogSpace is dedicated to democratizing content creation and sharing. We believe that everyone has valuable insights and stories to tell. Our platform provides the tools and community support needed for writers to publish, grow their audience, and connect with like-minded individuals across the globe.
            </Text>
          </Box>

          {/* Features Section */}
          <Box>
            <Heading as="h2" size="xl" mb={8} color={accentColor}>
              Why Choose BlogSpace?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
              {features.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <Card.Root key={idx} bg={cardBg} borderRadius="lg">
                    <Card.Body>
                      <VStack gap={4} align="start">
                        <HStack justify="space-between" w="full">
                          <Box
                            p={3}
                            borderRadius="lg"
                            bg={useColorModeValue("blue.100", "blue.900")}
                            color={accentColor}
                          >
                            <IconComponent size={24} />
                          </Box>
                          <Badge colorScheme="blue" variant="subtle">
                            {feature.badge}
                          </Badge>
                        </HStack>
                        <Heading as="h3" size="md">
                          {feature.title}
                        </Heading>
                        <Text color={textColor} fontSize="sm">
                          {feature.description}
                        </Text>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                );
              })}
            </SimpleGrid>
          </Box>

          {/* Story Section */}
          <Box>
            <Heading as="h2" size="xl" mb={6} color={accentColor}>
              Our Story
            </Heading>
            <VStack gap={4} align="start">
              <Text fontSize="md" color={textColor} lineHeight={1.8}>
                BlogSpace was founded on the belief that quality content should be accessible to everyone. What started as a simple idea has grown into a vibrant community where thousands of creators share their knowledge, experiences, and perspectives.
              </Text>
              <Text fontSize="md" color={textColor} lineHeight={1.8}>
                We've built our platform with a focus on simplicity, elegance, and community engagement. Whether you're a seasoned writer or just starting your blogging journey, BlogSpace provides the perfect space to express yourself and reach an audience that values your voice.
              </Text>
            </VStack>
          </Box>

          {/* Values Section */}
          <Box>
            <Heading as="h2" size="xl" mb={6} color={accentColor}>
              Our Values
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              {[
                {
                  title: "Authenticity",
                  description: "We celebrate genuine voices and original perspectives from our community members.",
                  badge: "Core",
                },
                {
                  title: "Accessibility",
                  description: "Content creation should be easy and free from unnecessary barriers.",
                  badge: "Priority",
                },
                {
                  title: "Community",
                  description: "We foster meaningful connections between writers and readers across all topics.",
                  badge: "Essential",
                },
                {
                  title: "Quality",
                  description: "We maintain high standards for content and user experience.",
                  badge: "Standard",
                },
              ].map((value, idx) => (
                <Card.Root key={idx} p={6} bg={cardBg} borderRadius="lg">
                  <Card.Body>
                    <VStack gap={3} align="start">
                      <HStack justify="space-between" w="full">
                        <Heading as="h3" size="md">
                          {value.title}
                        </Heading>
                        <Badge colorScheme="purple" variant="subtle">
                          {value.badge}
                        </Badge>
                      </HStack>
                      <Text color={textColor}>
                        {value.description}
                      </Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </Box>

          {/* CTA Section */}
          <Box
            bgGradient={useColorModeValue(
              "linear(to-r, blue.50, purple.50)",
              "linear(to-r, gray.700, gray.900)"
            )}
            p={8}
            borderRadius="lg"
            textAlign="center"
          >
            <VStack gap={4}>
              <Heading as="h2" size="lg">
                Ready to Share Your Story?
              </Heading>
              <Text color={textColor}>
                Join thousands of creators and start publishing your content today.
              </Text>
              <HStack gap={4}>
                <Button
                  as={RouterLink}
                  to="/posts/create"
                  colorScheme="blue"
                  size="lg"
                  rightIcon={<FiArrowRight />}
                  variant="solid"
                >
                  Write an Article
                </Button>
                <Button
                  as={RouterLink}
                  to="/posts"
                  colorScheme="blue"
                  variant="outline"
                  size="lg"
                >
                  Explore Posts
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>

      <Footer />
    </Box>
  );
}

export default About;
