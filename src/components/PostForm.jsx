import {
    Badge,
    Button,
    Field,
    Fieldset,
    HStack,
    Icon,
    Input,
    Portal,
    Select,
    SimpleGrid,
    createListCollection,
    Stack,
    Textarea
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiXCircle } from "react-icons/bi";
import slugify from "slugify";
import z from "zod";

const frameworks = createListCollection({
    items: [
        { label: "Draft", value: "Draft" },
        { label: "Published", value: "Published" },
    ],
});


const postSchema = z.object({
    title: z
        .string()
        .min(10, "Title cannot be less than 10 characters long")
        .transform((val) => val.trim()),
    slug: z.string().min(1, "Slug is required (derived from post title)"),
    excerpt: z
        .string()
        .min(20, "excerpt cannot be less than 20 characters long."),
    featuredImageUrl: z.url(),
    status: z.enum(["Draft", "Published"]),
    content: z
        .string()
        .min(50, "Content should be larger than 50 characters long"),
});

const PostForm = ({ post, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [featuredImageUrl, setFeaturedImageUrl] = useState("");
    const [readTimeMinutes, setReadTimeMinutes] = useState("");
    const [status, setStatus] = useState("");
    const [publishedAt, setPublishedAt] = useState("");
    const [tag, setTag] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [content, setContent] = useState("");

    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setExcerpt(post.excerpt);
            setFeaturedImageUrl(post.featured_image_url);
            setReadTimeMinutes(post.read_time_minutes);
            setStatus([post.status]);
            const tagTitles = post.tags.map((tag) => tag.title);
            setSelectedTags(tagTitles);
            setContent(post.content)
        }
    }, [post]);

    const addTag = () => {
        const trimmedTag = tag.trim();
        if (!trimmedTag) {
            return;
        }
        setSelectedTags([...selectedTags, trimmedTag]);
        setTag("");
    };

    const removeTag = (tagName) => {
        setSelectedTags(selectedTags.filter((tn) => tn !== tagName));
    };

    useEffect(() => {
        setSlug(slugify(title));
    }, [title]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)
        const payload = {
            title,
            slug,
            excerpt,
            featuredImageUrl,
            readTimeMinutes,
            status: status[0],
            publishedAt,
            tags: selectedTags,
            content
        }
        const result = postSchema.safeParse(payload)
        if(!result.success) {
            const fieldErrors = {}
            for(const issue of result.error.issues) {
                fieldErrors[issue.path[0]] = issue.message
            }
            setErrors(fieldErrors)
        } else {
            setErrors({})
            await onSubmit(payload)
        }
        setLoading(false)
    };

    return (
        <form onSubmit={handleSubmit}>
            <Fieldset.Root>
                <Stack>
                    <Fieldset.Legend>{post ? "Edit Post" : "Create Post"}</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Write your post details below
                    </Fieldset.HelperText>
                </Stack>
                <SimpleGrid columns={2} gap={4}>
                    <Field.Root required invalid={Boolean(errors.title)}>
                        <Field.Label>
                            Post Title <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your post title"
                        />
                        <Field.ErrorText>{errors.title}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root required>
                        <Field.Label>
                            Slug Title (auto-generated field){" "}
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input value={slug} readOnly />
                    </Field.Root>
                </SimpleGrid>

                <Field.Root required invalid={Boolean(errors.excerpt)}>
                    <Field.Label>
                        Excerpt <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Short summary about your post"
                    />
                    <Field.ErrorText>{errors.excerpt}</Field.ErrorText>
                </Field.Root>

                <SimpleGrid columns={2} gap={4}>
                    <Field.Root required invalid={errors.featuredImageUrl}>
                        <Field.Label>
                            Featured Image URL <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            value={featuredImageUrl}
                            onChange={(e) =>
                                setFeaturedImageUrl(e.target.value)
                            }
                            placeholder="http://"
                        />
                        <Field.ErrorText>
                            {errors.featuredImageUrl}
                        </Field.ErrorText>
                    </Field.Root>

                    <Field.Root
                        required
                        invalid={Boolean(errors.readTimeMinutes)}
                    >
                        <Field.Label>
                            Read Time in Minutes <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            type="number"
                            value={readTimeMinutes}
                            onChange={(e) => setReadTimeMinutes(e.target.value)}
                            placeholder="Enter read time in minutes"
                        />
                        <Field.ErrorText>
                            {errors.readTimeMinutes}
                        </Field.ErrorText>
                    </Field.Root>
                </SimpleGrid>

                <SimpleGrid columns={2} gap={4}>
                    <Field.Root required>
                        <Select.Root
                            collection={frameworks}
                            size="sm"
                            value={status}
                            onValueChange={(e) => setStatus(e.value)}
                        >
                            <Select.HiddenSelect />
                            <Field.Label>
                                Status <Field.RequiredIndicator />
                            </Field.Label>
                            <Select.Control>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Select framework" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {frameworks.items.map((framework) => (
                                            <Select.Item
                                                item={framework}
                                                key={framework.value}
                                            >
                                                {framework.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Published At</Field.Label>
                        <Input
                            type="date"
                            value={publishedAt}
                            onChange={(e) => setPublishedAt(e.target.value)}
                            placeholder="Enter the publish date"
                        />
                    </Field.Root>
                </SimpleGrid>

                <Field.Root>
                    <Field.Label>Tag</Field.Label>
                    <HStack>
                        <Input
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            placeholder="Enter tag"
                        />
                        <Button onClick={addTag} colorPalette={"blue"}>
                            Add Tag
                        </Button>
                    </HStack>
                    {selectedTags.length > 0 && (
                        <HStack mt={1}>
                            {selectedTags.map((tagName, index) => (
                                <HStack
                                    key={index}
                                    position={"relative"}
                                    pr={3}
                                >
                                    <Badge
                                        colorPalette={"blue"}
                                        variant={"subtle"}
                                    >
                                        {tagName}
                                    </Badge>
                                    <Icon
                                        color={"red"}
                                        onClick={() => removeTag(tagName)}
                                        variant={"plain"}
                                        size="xs"
                                        position={"absolute"}
                                        top={0}
                                        right={0}
                                    >
                                        <BiXCircle />
                                    </Icon>
                                </HStack>
                            ))}
                        </HStack>
                    )}
                </Field.Root>

                <Field.Root required invalid={!!errors.content}>
                    <Field.Label>
                        Post Content <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your post here..."
                    />
                    <Field.ErrorText>{errors.content}</Field.ErrorText>
                </Field.Root>
                <HStack justifyContent={"end"}>
                    <Button type="button" variant={"outline"}>
                        Cancel
                    </Button>
                    <Button type="submit" loading={isLoading} colorPalette={"blue"}>
                        Submit
                    </Button>
                </HStack>
            </Fieldset.Root>
        </form>
    );
};


export default PostForm;