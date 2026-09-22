import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Markdown from 'react-markdown';
import {
  Anchor,
  Box,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { BlogCard } from '@/core/components/cards/blog-card';
import { ManagedImage } from '@/core/components/media';
import { SectionHeader } from '@/core/components/sections/section-header';
import { blogPosts, getPost, sortedPosts } from '@/core/content/blog-posts';
import { dateFormatter } from '@/core/middlewares';
import { buildMetadata } from '@/core/utils/metadata';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return buildMetadata('Field Notes');
  }

  return buildMetadata(post.title, post.excerpt);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const related = sortedPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <Box>
      <Box
        component="section"
        py="var(--cropx-hero-py)"
        style={{ backgroundColor: 'var(--cropx-white)', borderBottom: '1px solid var(--cropx-border)' }}
      >
        <Container size="md" px={20} maw="var(--cropx-reading-max)">
          <Stack gap="md">
            <Group gap="xs">
              <Text size="sm" c="dimmed">{post.author}</Text>
              <Text size="sm" c="dimmed">&middot;</Text>
              <Text size="sm" c="dimmed">{dateFormatter(post.publishedAt)}</Text>
              <Text size="sm" c="dimmed">&middot;</Text>
              <Text size="sm" c="dimmed">{post.readMinutes} min read</Text>
            </Group>

            <Title
              order={1}
              style={{
                fontFamily: 'var(--cropx-font-heading)',
                fontSize: 'var(--cropx-text-display)',
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                color: 'var(--cropx-ink)',
              }}
            >
              {post.title}
            </Title>
          </Stack>
        </Container>
      </Box>

      <Container size="md" px={20} py="var(--cropx-section-py-sm)" maw="var(--cropx-reading-max)">
        <Stack gap="xl">
          <Box style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 8, overflow: 'hidden' }}>
            <ManagedImage slot={post.cover} fill sizes="(max-width: 680px) 100vw, 680px" priority />
          </Box>

          <Box
            style={{
              fontSize: 'var(--cropx-text-body-lg)',
              lineHeight: 1.8,
              color: 'var(--mantine-color-dark-7)',
            }}
          >
            <Markdown
              components={{
                h2: ({ children }) => (
                  <Title order={2} mt={40} mb={16} style={{ fontSize: 'var(--cropx-text-h2)', lineHeight: 1.25 }}>
                    {children}
                  </Title>
                ),
                h3: ({ children }) => (
                  <Title order={3} mt={28} mb={12} style={{ fontSize: 'var(--cropx-text-h3)' }}>
                    {children}
                  </Title>
                ),
                p: ({ children }) => (
                  <Text mb={20} style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.8 }}>
                    {children}
                  </Text>
                ),
                ul: ({ children }) => (
                  <Box component="ul" mb={20} pl={24} style={{ lineHeight: 1.8 }}>
                    {children}
                  </Box>
                ),
                li: ({ children }) => (
                  <Box component="li" mb={8} style={{ fontSize: 'var(--cropx-text-body-lg)' }}>
                    {children}
                  </Box>
                ),
                strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
                a: ({ href, children }) => (
                  <Anchor href={href} c="primary.7" target="_blank" rel="noopener noreferrer">
                    {children}
                  </Anchor>
                ),
              }}
            >
              {post.body}
            </Markdown>
          </Box>

          {post.tags.length > 0 && (
            <Group gap={8}>
              {post.tags.map((tag) => (
                <Text key={tag} size="sm" c="primary.7" fw={600}>{tag}</Text>
              ))}
            </Group>
          )}

          <Divider />

          <Text size="sm" c="dimmed" style={{ lineHeight: 1.7 }}>
            The agronomy here is general guidance, not a substitute for advice tailored to your
            field. Confirm variety choices with an agronomist or your state agricultural
            development programme.{' '}
            <Anchor component={Link} href="/seed-advisor#advisor" c="primary.7">
              Try the Seed Advisor
            </Anchor>
            .
          </Text>
        </Stack>
      </Container>

      {related.length > 0 && (
        <Box py="var(--cropx-section-py)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
          <Container size="xl" px={20}>
            <Stack gap="xl">
              <SectionHeader title="More field notes" />
              <Stack gap="lg">
                {related.map((item) => (
                  <BlogCard key={item.slug} post={item} />
                ))}
              </Stack>
            </Stack>
          </Container>
        </Box>
      )}
    </Box>
  );
}
