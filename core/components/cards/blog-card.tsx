'use client';

import Link from 'next/link';
import { Box, Group, Stack, Text, Title } from '@mantine/core';
import { ManagedImage } from '@/core/components/media';
import { dateFormatter } from '@/core/middlewares';
import { BlogPost } from '@/core/types';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Box
      component={Link}
      href={`/blog/${post.slug}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 280px) 1fr',
        gap: 24,
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid var(--cropx-border-warm)',
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: 'var(--cropx-white)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      className="blog-card"
    >
      <Box style={{ position: 'relative', aspectRatio: '4 / 3', minHeight: 180 }}>
        <ManagedImage
          slot={post.cover}
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          showCredit
        />
      </Box>

      <Stack gap="sm" p="lg" justify="center">
        <Text size="xs" c="dimmed">
          {dateFormatter(post.publishedAt)} &middot; {post.readMinutes} min read
        </Text>

        <Title order={3} size="h4" style={{ lineHeight: 1.3 }}>
          {post.title}
        </Title>

        <Text size="sm" c="dimmed" style={{ lineHeight: 1.65 }}>
          {post.excerpt}
        </Text>

        {post.tags.length > 0 && (
          <Group gap={6}>
            {post.tags.map((tag) => (
              <Text key={tag} size="xs" c="primary.7" fw={600}>
                {tag}
              </Text>
            ))}
          </Group>
        )}
      </Stack>

      <style>{`
        @media (max-width: 768px) {
          .blog-card {
            grid-template-columns: 1fr !important;
          }
        }
        .blog-card:hover {
          border-color: var(--mantine-color-primary-3);
          box-shadow: 0 8px 24px rgba(12, 31, 20, 0.06);
        }
      `}</style>
    </Box>
  );
}
