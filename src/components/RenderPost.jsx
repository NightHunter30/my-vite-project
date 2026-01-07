import { api } from "@/services/api";
import {
    AspectRatio,
    Badge,
    Heading,
    HStack,
    Image,
    Spinner,
    Text,
    VStack,
    Alert,
} from "@chakra-ui/react";
import useSWR from "swr";

const RenderPost = ({ postId }) => {
    const { data, isLoading, error } = useSWR(
        `/posts/view/${postId}`,
        async () => {
            const response = await api.get(`/articles/${postId}`);
            return response.data;
        }
    );

    if (isLoading) {
        return (
            <VStack colorPalette="blue">
                <Spinner color="colorPalette.600" />
                <Text color="colorPalette.600">Loading...</Text>
            </VStack>
        );
    }
    
    if (error) {
        return (
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Content>
                    <Alert.Title>Error occurred</Alert.Title>
                    <Alert.Description>
                        Unexpected error has occurred while loading the post
                        details
                    </Alert.Description>
                </Alert.Content>
            </Alert.Root>
        );
    }


    return (
        <>
            <Heading size={"xl"} mb={2}>
                {data.title}
            </Heading>
            <AspectRatio ratio={4 / 2}>
                <Image
                    src={data.featured_image_url}
                    alt="naruto"
                    objectFit="cover"
                />
            </AspectRatio>
            <HStack mt={2}>
                {data.tags.map((tag) => (
                    <Badge colorPalette={"blue"} variant={"subtle"}>
                        {tag.title}
                    </Badge>
                ))}
            </HStack>
            <Text mt={4}>{data.content}</Text>
        </>
    );
};

export default RenderPost;
