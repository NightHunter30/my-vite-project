import {
    Box,
    SimpleGrid,
    GridItem,
    Container,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import CategoriesSidebar from "./CategoriesSidebar";
import FeaturedPostSection from "./FeaturedPostSection";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import StatsSection from "./StatsSection";
import RecentPostsSection from "./RecentPostsSection";
import CallToActionSection from "./CallToActionSection";
import Footer from "./Footer";
import useSWR from "swr";
import { api } from "@/services/api";
import { useState } from "react";
import { useEffect } from "react";

const featuredPost = {
    id: 1,
    title: "The Future of Web Development: What's Next in 2025",
    content:
        "As we stand on the brink of 2025, the web development landscape is evolving at an unprecedented pace. From AI-powered development tools to the rise of WebAssembly and edge computing, developers are facing both challenges and exciting opportunities. In this comprehensive guide, we'll explore the key trends shaping the future of web development and how you can prepare for them.",
    slug: "future-web-development-2025",
    published: true,
    created_at: "2024-11-20T10:00:00Z",
    author: { id: 1, email: "sarah.dev@example.com" },
    tags: [
        { id: 1, name: "Technology", slug: "technology" },
        { id: 2, name: "Web Development", slug: "web-development" },
        { id: 3, name: "Future Trends", slug: "future-trends" },
    ],
    likes_count: 42,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
};

const categories = [
    { name: "Web Development", count: 45, color: "blue" },
    { name: "React", count: 32, color: "cyan" },
    { name: "JavaScript", count: 28, color: "yellow" },
    { name: "CSS", count: 21, color: "purple" },
    { name: "TypeScript", count: 18, color: "green" },
    { name: "DevOps", count: 15, color: "orange" },
];

const stats = {
    totalPosts: 156,
    totalUsers: 1247,
    totalViews: 45632,
    avgReadTime: 5,
};

function Home() {
    const isAuthenticated = false;

    const { data, isLoading, error } = useSWR("/articles", async () => {
        const response = await api.get("/articles");
        return response.data;
    });

    let latestArticle = null;
    if(data) {
        latestArticle = data
        .filter(article => article.status === "published")
        .sort(
            (a, b) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
        )[0];
    }
    return (
        <>
            {/* Navbar component */}
            <Navbar />

            {/* Renders the hero section */}
            <HeroSection isAuthenticated={false} />

            {/* Renders the stats section */}
            <StatsSection />

            {/* Renders the featured post section */}
            {isLoading ? (
                <VStack colorPalette="blue">
                    <Spinner color="colorPalette.600" />
                    <Text color="colorPalette.600">Loading...</Text>
                </VStack>
            ) : (
                <FeaturedPostSection featuredPost={latestArticle} />
            )}

            <Container>
                <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: "24px" }}>
                    <GridItem colSpan={{ base: 1, md: 3 }}>
                        {data && <RecentPostsSection recentPosts={data} /> }
                    </GridItem>

                    <GridItem colSpan={{ base: 1, md: 1 }}>
                        <CategoriesSidebar
                            categories={categories}
                            stats={stats}
                        />
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
