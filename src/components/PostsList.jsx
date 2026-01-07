import {
    Box,
    Container,
    Table,
    IconButton,
    Badge,
    VStack,
    Spinner,
    Text,
    Flex,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Heading } from "@chakra-ui/react";
import { BiPencil } from "react-icons/bi";
import useSWR from "swr";
import { api } from "@/services/api";
import { Link } from "react-router";
import { BsEye } from "react-icons/bs";
import PostDialogBox from "./PostDialogBox";
import { useState } from "react";

const PostsList = () => {
    // {data, error, isLoading, isvalidating, mutate }
    const {data, isLoading} = useSWR("key1", async () => {
        try {
            // { data, status, statusText, headers}
            const { data }  = await api.get("/users/articles");
            return data;
        } catch {
            return null;
        }
    });

    const [open, setOpen] = useState(false)
    const [viewingPostId, setViewingPostId] = useState(null);
    
    const handleViewPost = (postId) => {
        setViewingPostId(postId)
        setOpen(true)
    }


    return (
        <Box>
            <Navbar />
            <Container maxW={"4xl"} py={10}>
                <Heading>User Posts</Heading>
                {isLoading && 
                <VStack colorPalette="blue">
                    <Spinner color="colorPalette.600" />
                    <Text color="colorPalette.600">Loading...</Text>
                </VStack>
                }
                {data && 
                <Table.Root size="sm">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>ID</Table.ColumnHeader>
                            <Table.ColumnHeader>Title</Table.ColumnHeader>
                            <Table.ColumnHeader>Status</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="end">
                                Actions
                            </Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map((post) =>
                        <Table.Row key={post.id}>
                            <Table.Cell>1.</Table.Cell>
                            <Table.Cell>{post.title}</Table.Cell>
                            <Table.Cell><Badge colorPalette={post.status == "Draft" ? "blue" : "green"} variant={"subtle"}>{post.status}</Badge></Table.Cell>
                            <Table.Cell textAlign="end">
                                <IconButton to={`/posts/${post.id}`} as={Link} size="sm" variant={"ghost"} colorPalette="blue" aria-label="Search database"><BiPencil /></IconButton>

                                <IconButton onClick={() => handleViewPost(post.id)}  size="sm" variant={"ghost"} colorPalette={"purple"}>
                                    <BsEye />
                                </IconButton>
                            </Table.Cell>
                        </Table.Row>
                    )}
                        
                    </Table.Body>
                </Table.Root> }

                <PostDialogBox open={open} onOpenChange={(e) => setOpen(e.open)} postId={viewingPostId}  />
            </Container>
            <Footer />
        </Box>
    );
};

export default PostsList;
