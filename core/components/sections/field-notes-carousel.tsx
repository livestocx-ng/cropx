'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { sortedPosts } from '@/core/content/blog-posts';
import { SectionHeader } from './section-header';

interface FieldNotesCarouselProps {
  title?: string;
  description?: string;
}

/** Real Field Notes cards as social proof — no invented testimonials. */
export function FieldNotesCarousel({
  title = 'From the Field Notes',
  description = 'Practical agronomy on seed choice, drought, soil, and planting under a changing climate.',
}: FieldNotesCarouselProps) {
  const posts = sortedPosts.slice(0, 6);
  const [index, setIndex] = useState(0);

  if (posts.length === 0) {
    return null;
  }

  const post = posts[index % posts.length];

  const prev = () => setIndex((value) => (value - 1 + posts.length) % posts.length);
  const next = () => setIndex((value) => (value + 1) % posts.length);

  return (
    <Box component="section" py="var(--cropx-section-py)" bg="white">
      <Container size="xl" px={20}>
        <Stack gap={40}>
          <Group justify="space-between" align="flex-end" wrap="wrap" gap="md">
            <SectionHeader title={title} description={description} />
            <Group gap="xs">
              <Button variant="default" radius="md" onClick={prev} aria-label="Previous note" px="sm">
                <IconArrowLeft size={18} />
              </Button>
              <Button variant="default" radius="md" onClick={next} aria-label="Next note" px="sm">
                <IconArrowRight size={18} />
              </Button>
            </Group>
          </Group>

          <Box
            component={Link}
            href={`/blog/${post.slug}`}
            p={{ base: 'lg', md: 40 }}
            style={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              borderRadius: 12,
              border: '1px solid var(--cropx-border)',
              backgroundColor: 'var(--cropx-cream)',
              transition: 'box-shadow 0.2s ease',
            }}
          >
            <Stack gap="md" maw={720}>
              <Text size="xs" fw={700} c="primary.7" tt="uppercase" style={{ letterSpacing: '0.06em' }}>
                Field Notes · {post.readMinutes} min read
              </Text>
              <Title
                order={3}
                style={{
                  fontFamily: 'var(--cropx-font-heading)',
                  fontSize: 'var(--cropx-text-h2)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.2,
                }}
              >
                {post.title}
              </Title>
              <Text style={{ lineHeight: 1.7, color: 'var(--cropx-muted)', fontSize: 'var(--cropx-text-body-lg)' }}>
                {post.excerpt}
              </Text>
              <Text size="sm" fw={600} c="primary.7" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Read article <IconArrowRight size={16} />
              </Text>
            </Stack>
          </Box>

          <Group gap={6} justify="center">
            {posts.map((item, i) => (
              <Box
                key={item.slug}
                component="button"
                type="button"
                aria-label={`Show note ${i + 1}`}
                onClick={() => setIndex(i)}
                style={{
                  width: i === index % posts.length ? 24 : 8,
                  height: 8,
                  borderRadius: 99,
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  backgroundColor:
                    i === index % posts.length
                      ? 'var(--mantine-color-primary-6)'
                      : 'var(--cropx-border)',
                  transition: 'width 0.2s ease, background-color 0.2s ease',
                }}
              />
            ))}
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
