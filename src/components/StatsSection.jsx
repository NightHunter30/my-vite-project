import {
    Container,
    VStack,
    HStack,
    Text,
    Box,
    SimpleGrid,
    Flex, Badge
} from "@chakra-ui/react";
import { FaBookOpen, FaUsers, FaEye, FaClock, FaArrowUp } from "react-icons/fa";

const StatCard = ({
  icon,
  title,
  value,
  secondIcon,
  subTitle,
  valueColor = "blue.500",
  iconBg = "blue.50",
}) => {
  return (
    <Flex
      p={5}
      borderWidth="1px"
      borderRadius="xl"
      bg="white"
      align="center"
      justify="space-between"
      _hover={{
        shadow: "md",
        transform: "translateY(-2px)",
      }}
      transition="all 0.2s"
    >
      {/* Left content */}
      <Box>
        <Text fontSize="sm" color="gray.500">
          {title}
        </Text>

        <Text fontSize="2xl" fontWeight="bold" color={valueColor}>
          {value}
        </Text>

        {subTitle && (
          <HStack mt={1} spacing={1}>
            {secondIcon && <Box as={secondIcon} color="green.500" />}
            <Text fontSize="sm" color="green.500">
              {subTitle}
            </Text>
          </HStack>
        )}
      </Box>

      {/* Icon badge */}
      <Flex
        w={12}
        h={12}
        align="center"
        justify="center"
        borderRadius="lg"
        bg={iconBg}
        color={valueColor}
        fontSize="xl"
      >
        <Box as={icon} />
      </Flex>
    </Flex>
  );
};


const StatsSection = ({ stats }) => {
  const {
    totalPosts = 156,
    totalUsers = 98,
    totalViews = 45632,
    avgReadTime = 5,
  } = stats || {};

  return (
    <Container maxW="container.xl" py={12}>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
        <StatCard
          icon={FaBookOpen}
          title="Total Posts"
          value={totalPosts}
          secondIcon={FaArrowUp}
          subTitle="+12% this month"
          valueColor="blue.500"
        />

        <StatCard
          icon={FaUsers}
          title="Active Writers"
          value={totalUsers}
          secondIcon={FaArrowUp}
          subTitle="+8% this month"
          valueColor="green.500"
        />

        <StatCard
          icon={FaEye}
          title="Total Views"
          value={totalViews.toLocaleString()}
          secondIcon={FaArrowUp}
          subTitle="+23% this month"
          valueColor="purple.500"
        />

        <StatCard
          icon={FaClock}
          title="Avg. Read Time"
          value={`${avgReadTime} min`}
          subTitle="per article"
          valueColor="orange.500"
        />
      </SimpleGrid>
    </Container>
  );
};

export default StatsSection;
