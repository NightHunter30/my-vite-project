import { useState } from "react";
import { Navigate, Link as RouterLink, useLocation, useNavigate } from "react-router";
import useSWRMutation from "swr/mutation";
import {
    Box,
    Button,
    Container,
    Field,
    Input,
    Stack,
    Text,
    Link,
    Alert,
    Card,
    VStack,
    Heading,
} from "@chakra-ui/react";
import { useAuth } from "@/contexts/auth-context";
import Navbar from "./Navbar";
import { authAPI } from "@/services/auth-api";
import { mutate } from "swr";

export default function Login() {
    const { isAuthenticated, loginUser } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const { isMutating, trigger, error } = useSWRMutation(
        "auth-login",
        (key, { arg }) => authAPI.login(arg),
        {
            onSuccess: async (response) => {
                await mutate("auth/me")
                let pathname = null;
                if(location.state) {
                    pathname = location.state.from
                } else {
                    pathname = "/dashboard"
                }
                navigate(pathname)
            },
        }
    );

    //   console.log({isMutating, trigger, error})
    const handleSubmit = async (e) => {
        e.preventDefault();
        await trigger({ email, password });
    };

    return (
        <>
            <Navbar />

            <Container maxW="md" py={12}>
                <Card.Root>
                    <Card.Header>
                        <VStack spacing={2}>
                            <Heading size="lg">Welcome Back</Heading>
                            <Text color="gray.600">
                                Sign in to your account
                            </Text>
                        </VStack>
                    </Card.Header>

                    <Card.Body>
                        {error && (
                            <Alert.Root status="error">
                                <Alert.Indicator />
                                <Alert.Title>Error</Alert.Title>
                                <Alert.Description>
                                    {error.message}
                                </Alert.Description>
                            </Alert.Root>
                        )}
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={4}>
                                <Field.Root>
                                    <Field.Label>Email</Field.Label>
                                    <Input
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="demo@example.com"
                                        required
                                    />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Password</Field.Label>
                                    <Input
                                        type="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Any password works for demo users"
                                        required
                                    />
                                </Field.Root>

                                <Button
                                    type="submit"
                                    colorPalette="blue"
                                    width="full"
                                    loading={isMutating}
                                    loadingText="Signing in"
                                >
                                    Sign In
                                </Button>
                            </Stack>
                        </form>

                        <Box mt={6} textAlign="center">
                            <Text fontSize="sm" color="gray.600">
                                Demo users: demo@example.com, john@example.com,
                                jane@example.com
                            </Text>
                        </Box>
                    </Card.Body>

                    <Card.Footer>
                        <Text>
                            Don't have an account?{" "}
                            <Link
                                as={RouterLink}
                                to="/register"
                                color="blue.500"
                            >
                                Sign up
                            </Link>
                        </Text>
                    </Card.Footer>
                </Card.Root>
            </Container>
        </>
    );
}
