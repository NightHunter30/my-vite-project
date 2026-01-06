import { Toaster, toaster } from "@/components/ui/toaster";
import { api } from "@/services/api";
import {
    Box,
    Card,
    Container,
    Heading,
    Spinner,
    Text
} from "@chakra-ui/react";
import { useParams } from "react-router";
import useSWR from "swr";
import Navbar from "./Navbar";
import PostForm from "./PostForm";

const EditPost = () => {
    const { postId } = useParams();
    const { isLoading, data } = useSWR(`/posts/${postId}`, async () => {
        const { data } = await api.get(`/articles/${postId}`);
        return data;
    });

    const handleSubmit = async (formData) => {
        try {
            const resp = await api.put(`/articles/${postId}`, formData);
            toaster.create({
                title: "Article successfully updated",
                type: "success",
            });
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
                    Edit your post
                </Heading>
                <Text color="gray.600">
                    Share your thoughts with the community
                </Text>

                <Card.Root>
                    <Card.Body>
                        {!data ? <Spinner /> : <PostForm post={data} onSubmit={handleSubmit} />}
                    </Card.Body>
                </Card.Root>
            </Container>
        </Box>
    );
};

export default EditPost;
