import {
  VStack,
  Heading,
  HStack,
  Text,
  Box,
  Flex,
  Button,
  Card,
  Badge,
  SimpleGrid,
  Image,
} from '@chakra-ui/react'
import { Link } from 'react-router'
import { FaClock, FaCalendarAlt, FaHeart, FaArrowRight } from 'react-icons/fa'

const RecentPostsSection = ({ recentPosts }) => {
  return (
    <VStack gap={8} align="stretch">
      <Flex justify="space-between" align="center">
        <Heading size="xl">
          <HStack gap={2}>
            <Box as={FaClock} />
            <Text>Recent Posts</Text>
          </HStack>
        </Heading>
        <Button as={Link} to="/posts" variant="ghost">
          View All
          <FaArrowRight />
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        {recentPosts.map((post) => (
          <Card.Root key={post.id} overflow="hidden" shadow="md" borderRadius="lg">
            <Image
              src={post.featured_image_url}
              alt={post.title}
              h="200px"
              w="full"
              objectFit="cover"
            />
            <Card.Header pb={2}>
              <VStack align="start" gap={2}>
                <Heading size="md" lineHeight="tight" lineClamp={2}>
                  {post.title}
                </Heading>
                <HStack gap={2}>
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag.id} colorPalette="green" variant="outline" size="sm">
                      {tag.title}
                    </Badge>
                  ))}
                </HStack>
              </VStack>
            </Card.Header>

            <Card.Body py={0}>
              <Text lineClamp={3} color="gray.700" textStyle="sm">
                {post.content}
              </Text>
            </Card.Body>

            <Card.Footer pt={4}>
              <HStack justify="space-between" w="full">
                <HStack gap={2}>
                  {/* <Avatar size="xs" name={post.author.email} /> */}
                  <Box>
                    <Text textStyle="xs" fontWeight="medium">
                      {post.author.email.split('@')[0]}
                    </Text>
                    <HStack gap={1} textStyle="xs" color="gray.500">
                      <Box as={FaCalendarAlt} />
                      <Text>
                        {new Date(post.published_at).toLocaleDateString()}
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
                <HStack gap={1} color="gray.500">
                  <Box as={FaHeart} />
                  <Text textStyle="xs">{post.likes_count}</Text>
                </HStack>
              </HStack>
            </Card.Footer>
          </Card.Root>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default RecentPostsSection
