import { Box, Container, Stack } from '@mantine/core';
import { BlogCard } from '@/core/components/cards/blog-card';
import { CtaBand } from '@/core/components/sections/cta-band';
import { SectionHeader } from '@/core/components/sections/section-header';
import { brand } from '@/core/content/brand';
import { sortedPosts } from '@/core/content/blog-posts';

export default function BlogPage() {
  return (
    <Box>
      <Box
        component="section"
        py="var(--cropx-hero-py)"
        style={{
          backgroundColor: 'var(--cropx-white)',
          borderBottom: '1px solid var(--cropx-border)',
        }}
      >
        <Container size="xl" px={20}>
          <SectionHeader
            title="Field Notes"
            description="Practical agronomy for food security decisions: seed choice, soil, planting timing, and crop protection under a changing climate."
          />
        </Container>
      </Box>

      <Box py="var(--cropx-section-py)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
        <Container size="xl" px={20}>
          <Stack gap="lg">
            {sortedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </Stack>
        </Container>
      </Box>

      <CtaBand
        title="Put the notes into practice"
        description="Open the Seed Advisor for a climate fit shortlist for your farm."
        buttonLabel={brand.ctaAdvisor}
      />
    </Box>
  );
}
