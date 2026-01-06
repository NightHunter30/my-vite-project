import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Button,
} from "@chakra-ui/react";
import { Link } from "react-router";
import { FaArrowRight, FaPlus } from "react-icons/fa";

const HeroSection = ({ isAuthenticated }) => {
    return (
        <Box
            bgGradient="to-br"
            gradientFrom="blue.50"
            gradientTo="purple.50"
            _dark={{
                gradientFrom: "blue.900",
                gradientTo: "purple.900",
            }}
            py={{ base: 12, md: 20 }}
            px={4}
        >
            <Container maxW="container.xl">
                <VStack gap={8} align="center" textAlign="center">
                    <VStack gap={4}>
                        <Heading
                            size={{ base: "2xl", md: "4xl" }}
                            bgGradient="to-r"
                            gradientFrom="blue.400"
                            gradientTo="purple.500"
                            bgClip="text"
                        >
                            Welcome to DevBlog
                        </Heading>
                        <Text
                            textStyle={{ base: "lg", md: "xl" }}
                            color="gray.600"
                            maxW="2xl"
                        >
                            Discover insights, tutorials, and the latest trends
                            in web development. Join our community of developers
                            sharing knowledge and experiences.
                        </Text>
                    </VStack>

                    <HStack gap={4} flexWrap="wrap" justify="center">
                        <Button
                            as={Link}
                            to="/posts"
                            size="lg"
                            colorPalette="blue"
                        >
                            Explore Posts
                            <FaArrowRight />
                        </Button>
                        {isAuthenticated ? (
                            <Button
                                as={Link}
                                to="/create-post"
                                size="lg"
                                variant="outline"
                            >
                                <FaPlus />
                                Write Article
                            </Button>
                        ) : (
                            <Button
                                as={Link}
                                to="/register"
                                size="lg"
                                variant="outline"
                            >
                                Join Community
                            </Button>
                        )}
                    </HStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default HeroSection;
