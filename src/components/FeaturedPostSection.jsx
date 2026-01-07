import {
  Container,
  VStack,
  Heading,
  HStack,
  Text,
  Box,
  Card,
  Badge,
  Button,
  Flex,
  Spacer,
  Image,
} from '@chakra-ui/react'
import { Link } from 'react-router'
import { FaStar, FaCalendarAlt, FaHeart, FaArrowRight } from 'react-icons/fa'

const FeaturedPostSection = ({ featuredPost }) => {
  return (
    <Container maxW="container.xl" py={12}>
      <VStack gap={8} align="stretch">
        <Heading size="xl" textAlign="center">
          <HStack justify="center" gap={2}>
            <Box as={FaStar} />
            <Text>Featured Article</Text>
          </HStack>
        </Heading>

        <Card.Root overflow="hidden" shadow="2xl" borderRadius="xl">
          <Flex direction={{ base: "column", lg: "row" }}>
            <Box flex="1">
              <Image
                src={featuredPost.featured_image_url}
                alt={featuredPost.title}
                w="full"
                h={{ base: "250px", lg: "400px" }}
                objectFit="cover"
              />
            </Box>
            <VStack flex="1" p={8} gap={4} align="start" justify="center">
              <Badge colorPalette="blue" size="lg">Featured</Badge>
              <Heading size="lg" lineHeight="tight">
                {featuredPost.title}
              </Heading>
              <Text color="gray.600" lineClamp={3}>
                {featuredPost.excerpt}
              </Text>
              <HStack gap={2}>
                {featuredPost.tags.map((tag) => (
                  <Badge key={tag.id} colorPalette="green" variant="outline">
                    {tag.title}
                  </Badge>
                ))}
              </HStack>
              <HStack gap={4} w="full">
                <HStack gap={2}>
                  <Box>
                    <HStack gap={1} textStyle="xs" color="gray.500">
                      <Box as={FaCalendarAlt} />
                      <Text>
                        {new Date(featuredPost.published_at).toLocaleDateString()}
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
                <Spacer />
                <HStack gap={1} color="gray.500">
                  <Box as={FaHeart} />
                  <Text textStyle="sm">{featuredPost.likes_count}</Text>
                </HStack>
              </HStack>
              <Button
                as={Link}
                to={`/posts/view/${featuredPost.id}`}
                colorPalette="blue"
              >
                Read Full Article
                <FaArrowRight />
              </Button>
            </VStack>
          </Flex>
        </Card.Root>
      </VStack>
    </Container>
  )
}

export default FeaturedPostSection
