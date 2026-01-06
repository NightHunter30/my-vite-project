import { Badge, Box, Card, Flex, SimpleGrid, Text } from "@chakra-ui/react";

const StatCard = ({ title, value, change, color }) => {
    return (
        <Card.Root>
            <Card.Body>
                <Flex justifyContent={"space-between"} align={"center"}>
                    <Box>
                        <Text size="sm" color="gray.600" mb={1}>
                            {title}
                        </Text>
                        <Text size="2xl" fontWeight="bold">
                            {value}
                        </Text>
                    </Box>
                    <Badge colorPalette={color}>{change}</Badge>
                </Flex>
            </Card.Body>
        </Card.Root>
    );
};

const StatsGrid = () => {
    const stats = [
        { title: "Total Posts", value: "24", change: "+12%", color: "green" },
        { title: "Total Views", value: "12,456", change: "+8%", color: "blue" },
        { title: "Comments", value: "89", change: "+23%", color: "purple" },
    ];
    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {stats.map((state, index) => (
                <StatCard
                    key={index}
                    title={state.title}
                    value={state.value}
                    change={state.change}
                    color={state.color}
                />
            ))}
        </SimpleGrid>
    );
};

export default StatsGrid;
