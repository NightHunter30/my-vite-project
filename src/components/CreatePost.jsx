import { Toaster, toaster } from "@/components/ui/toaster";
import { api } from "@/services/api";
import {
    Box,
    Card,
    Container,
    Heading,
    Text
} from "@chakra-ui/react";
import { useNavigate, Navigate } from "react-router";
import Navbar from "./Navbar";
import PostForm from "./PostForm";

const CreatePost = () => {
    const navigate = useNavigate()
    const handleSubmit = async (formData) => {
        try {
            const resp = await api.post("/articles", formData);
            console.log(resp);
            toaster.create({
                title: "Article successfully created",
                type: "success",
            });
            setTimeout(() => {
                navigate("/posts")
            },2000)
        } catch (err) {
            console.log(err);
            toaster.create({
                title: "Failed to create article",
                type: "error",
            });
        }
    };
    return (
        <Box>
            <Toaster />
            <Navbar />
            <Container maxW={"4xl"} py={10}>
                <Heading size={"xl"} mb={2}>
                    Write a post
                </Heading>
                <Text color="gray.600">
                    Share your thoughts with the community
                </Text>

                <Card.Root>
                    <Card.Body>
                        <PostForm onSubmit={handleSubmit} />
                    </Card.Body>
                </Card.Root>
            </Container>
        </Box>
    );
};

export default CreatePost;
