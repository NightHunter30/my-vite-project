import { Container, Heading, Text } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";
import StatsGrid from "./Dashboard/StatsGrid";

const WelcomeMessage = () => {
    return (
        <Box mb={8}>
            <Heading size={"7lg"} mb={2}>
                Welcome back, Author!
            </Heading>
            <Text color="gray.600">
                Here's what's happening with your blog today.
            </Text>
        </Box>
    );
};

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <Container maxW={"7xl"} py={8}>
                <WelcomeMessage />
                <StatsGrid />
            </Container>
        </>
    );
};

export default Dashboard;
