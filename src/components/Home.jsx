import { Box, SimpleGrid, GridItem, Container, Spinner, VStack, Text } from "@chakra-ui/react";
import CategoriesSidebar from "./CategoriesSidebar";
import FeaturedPostSection from "./FeaturedPostSection";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import StatsSection from "./StatsSection";
import RecentPostsSection from "./RecentPostsSection";
import CallToActionSection from "./CallToActionSection";
import Footer from "./Footer";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/services/api";
import useSWR from "swr";
import { useEffect, useState } from "react";

// Fallback data
const defaultCategories = [
    { name: "Web Development", count: 45, color: "blue" },
    { name: "React", count: 32, color: "cyan" },
    { name: "JavaScript", count: 28, color: "yellow" },
    { name: "CSS", count: 21, color: "purple" },
    { name: "TypeScript", count: 18, color: "green" },
    { name: "DevOps", count: 15, color: "orange" },
];

const defaultStats = {
    totalPosts: 0,
    totalUsers: 0,
    totalViews: 0,
    avgReadTime: 0,
};

function Home() {
    const { isAuthenticated, user } = useAuth();
    const [featuredPost, setFeaturedPost] = useState(null);
    const [categories, setCategories] = useState(defaultCategories);
    const [stats, setStats] = useState(defaultStats);
    const [recentPosts, setRecentPosts] = useState([]);

    // Fetch posts
    const { data: postsData, isLoading: postsLoading } = useSWR("/posts", async () => {
        try {
            const { data } = await api.get("/articles");
            return data;
        } catch (error) {
            console.error("Error fetching posts:", error);
            return [];
        }
    });

    // Update state when posts data is fetched
    useEffect(() => {
        if (postsData && Array.isArray(postsData) && postsData.length > 0) {
            // Look for explicitly featured post
            let featured = postsData.find(post => post.featured);
            
            // If no explicit featured post, use the last published post
            if (!featured) {
                const publishedPosts = postsData.filter(post => post.status === 'published');
                featured = publishedPosts[publishedPosts.length - 1] || postsData[0];
            }
            
            if (featured) {
                setFeaturedPost(featured);
            }
            
            // Set recent posts (limit to 5), excluding the featured post
            const recentPostsList = postsData
                .filter(post => post.id !== featured?.id)
                .slice(0, 5);
            setRecentPosts(recentPostsList);
        }
    }, [postsData]);

    const isLoading = postsLoading;
    if (isLoading) {
        return (
            <>
                <Navbar />
                <VStack py={20} spacing={4}>
                    <Spinner size="lg" color="blue.500" />
                    <Text>Loading home page...</Text>
                </VStack>
            </>
        );
    }

    return (
        <>
            {/* Navbar component */}
            <Navbar />

            {/* Renders the hero section */}
            <HeroSection isAuthenticated={isAuthenticated} />

            {/* Renders the stats section */}
            <StatsSection stats={stats} />

            {/* Renders the featured post section only if featured post exists */}
            {featuredPost && (
                <FeaturedPostSection 
                    featuredPost={{
                        ...featuredPost,
                        image: featuredPost.featured_image_url,
                        content: featuredPost.excerpt,
                        created_at: featuredPost.published_at,
                        likes_count: 0,
                        tags: featuredPost.tags.map(tag => ({
                            ...tag,
                            name: tag.title
                        }))
                    }} 
                />
            )}

            <Container>
                <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: "24px" }}>
                    <GridItem colSpan={{ base: 1, md: 3 }}>
                        <RecentPostsSection 
                            recentPosts={recentPosts.map(post => ({
                                ...post,
                                image: post.featured_image_url,
                                content: post.excerpt,
                                created_at: post.published_at,
                                likes_count: 0,
                                tags: post.tags.map(tag => ({
                                    ...tag,
                                    name: tag.title
                                }))
                            }))} 
                        />
                    </GridItem>
                    
                    <GridItem colSpan={{ base: 1, md: 1 }}>
                        <CategoriesSidebar categories={categories} stats={stats} />
                    </GridItem>

                </SimpleGrid>
            </Container>
            <Box py={8}>
                <CallToActionSection isAuthenticated={isAuthenticated} />
            </Box>

            <Footer />
        </>
    );
}

export default Home;
