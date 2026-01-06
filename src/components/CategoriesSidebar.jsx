import {
  VStack,
  Card,
  Heading,
  HStack,
  Text,
  Box,
  Badge,
  Flex,
  Input,
  Button,
} from '@chakra-ui/react'
import { FaTag, FaBookOpen, FaStar, FaArrowRight } from 'react-icons/fa'

/* =======================
   Categories
======================= */
const Categories = ({ categories }) => {
  return (
    <Card.Root>
      <Card.Header>
        <Heading size="md">
          <HStack gap={2}>
            <Box as={FaTag} />
            <Text>Categories</Text>
          </HStack>
        </Heading>
      </Card.Header>

      <Card.Body>
        <VStack gap={3} align="stretch">
          {categories.map((category) => (
            <Flex key={category.name} justify="space-between" align="center">
              <HStack gap={2}>
                <Badge
                  colorPalette={category.color}
                  variant="solid"
                  size="sm"
                >
                  {category.count}
                </Badge>
                <Text textStyle="sm">{category.name}</Text>
              </HStack>
              <Box as={FaArrowRight} boxSize="12px" color="gray.500" />
            </Flex>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  )
}

/* =======================
   Newsletter
======================= */
const Newsletter = () => {
  return (
    <Card.Root>
      <Card.Header>
        <Heading size="md">
          <HStack gap={2}>
            <Box as={FaBookOpen} />
            <Text>Stay Updated</Text>
          </HStack>
        </Heading>
      </Card.Header>

      <Card.Body>
        <VStack gap={4}>
          <Text textStyle="sm" color="gray.600">
            Get the latest posts and tutorials delivered to your inbox.
          </Text>

          <VStack gap={2} w="full">
            <Input placeholder="Enter your email" size="sm" />
            <Button size="sm" colorPalette="blue" w="full">
              Subscribe
            </Button>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  )
}

/* =======================
   Quick Stats
======================= */
const QuickStats = ({ stats }) => {
  return (
    <Card.Root>
      <Card.Header>
        <Heading size="md">
          <HStack gap={2}>
            <Box as={FaStar} />
            <Text>Community</Text>
          </HStack>
        </Heading>
      </Card.Header>

      <Card.Body>
        <VStack gap={3}>
          <HStack justify="space-between" w="full">
            <Text textStyle="sm">Active Writers</Text>
            <Text textStyle="sm" fontWeight="bold">
              {stats.totalUsers}
            </Text>
          </HStack>

          <HStack justify="space-between" w="full">
            <Text textStyle="sm">This Month</Text>
            <Text
              textStyle="sm"
              fontWeight="bold"
              color="green.500"
            >
              +23 posts
            </Text>
          </HStack>

          <Text textStyle="xs" color="gray.500" textAlign="center">
            Join our growing community of developers
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  )
}

/* =======================
   Sidebar (Composer)
======================= */
const CategoriesSidebar = ({ categories, stats }) => {
  return (
    <VStack gap={8} align="stretch">
      <Categories categories={categories} />
      <Newsletter />
      <QuickStats stats={stats} />
    </VStack>
  )
}

export default CategoriesSidebar
