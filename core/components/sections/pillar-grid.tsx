import { Box, Container, Grid, GridCol, Stack, Text, Title } from '@mantine/core';
import { SectionHeader } from './section-header';

export interface Pillar {
  title: string;
  body: string;
}

interface PillarGridProps {
  pillars: Pillar[];
  title?: string;
  description?: string;
}

export function PillarGrid({ pillars, title, description }: PillarGridProps) {
  return (
    <Box component="section" py="var(--cropx-section-py)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
      <Container size="xl" px={20}>
        <Stack gap={40}>
          {title && <SectionHeader title={title} description={description} />}

          <Grid gutter={{ base: 24, md: 32 }}>
            {pillars.map((pillar) => (
              <GridCol key={pillar.title} span={{ base: 12, md: 4 }}>
                <Stack gap="sm">
                  <Title order={3} size="h4">{pillar.title}</Title>
                  <Text c="dimmed" style={{ lineHeight: 1.7 }}>
                    {pillar.body}
                  </Text>
                </Stack>
              </GridCol>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
