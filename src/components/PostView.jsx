import {
    Box,
    Container
} from "@chakra-ui/react";
import { useParams } from "react-router";
import Navbar from "./Navbar";
import RenderPost from "./RenderPost";

const PostView = () => {
    const { postId } = useParams();

    return (
        <Box>
            <Navbar />
            <Container maxW={"4xl"} py={10}>
                <RenderPost postId={postId} />
            </Container>
        </Box>
    );
};
export default PostView;
