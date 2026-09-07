import { Box, Container, Stack } from '@mantine/core';
import { BlogCard } from '@/core/components/cards/blog-card';
import { SectionHeader } from '@/core/components/sections/section-header';
import { sortedPosts } from '@/core/content/blog-posts';

export default function BlogPage() {
  return (
    <Box>
      <Box
        component="section"
        py={{ base: 48, md: 64 }}
        style={{ backgroundColor: 'var(--cropx-cream)', borderBottom: '1px solid var(--cropx-border-warm)' }}
      >
        <Container size="xl" px={20}>
          <SectionHeader
            title="Field Notes"
            description="Practical agronomy, written for the decision in front of you. Seed choice, soil, planting timing, and crop protection."
          />
        </Container>
      </Box>

      <Container size="xl" px={20} py={{ base: 48, md: 72 }}>
        <Stack gap="lg">
          {sortedPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
