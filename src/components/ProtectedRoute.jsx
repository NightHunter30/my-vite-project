import { useAuth } from "@/contexts/auth-context";
import { Flex, Spinner, VStack, Text } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = (props) => {
    const auth = useAuth();
    const location = useLocation()

    if (auth.isLoading) {
        return (
            <VStack mt={20}>
                <Flex justifyContent={"center"} alignItems="center" direction={"column"}>
                    <Spinner />
                    <Text>Loading</Text>
                </Flex>
            </VStack>
        );
    }

    if (auth.isAuthenticated == false) {
        return <Navigate to="/login" state={{from: location.pathname }} />;
    }

    return props.children;
};

export default ProtectedRoute;
