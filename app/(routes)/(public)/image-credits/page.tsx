import { Anchor, Box, Container, Stack, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Text, Title } from '@mantine/core';
import { attributedImages, images } from '@/core/content/image-manifest';
import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata(
  'Photo credits',
  'Attribution for the photographs used across the CropX site.'
);

export default function ImageCreditsPage() {
  const total = Object.keys(images).length;

  return (
    <Box style={{ backgroundColor: 'var(--cropx-white)', minHeight: '100%' }}>
      <Container size="md" px={20} py="var(--cropx-section-py)">
        <Stack gap="lg">
          <Title
            order={1}
            style={{
              fontFamily: 'var(--cropx-font-heading)',
              fontSize: 'var(--cropx-text-display)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: 'var(--cropx-ink)',
            }}
          >
            Photo credits
          </Title>

          <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
            Every photograph on this site is used under a licence permitting commercial use and
            modification. Images have been resized and recompressed from their originals; the
            licence of each derivative is unchanged. Of {total} photographs, {attributedImages.length}{' '}
            carry an attribution requirement and are credited below.
          </Text>

          <Text c="dimmed" style={{ lineHeight: 1.75 }}>
            Sourced via{' '}
            <Anchor href="https://openverse.org" target="_blank" rel="noopener noreferrer">
              Openverse
            </Anchor>{' '}
            and{' '}
            <Anchor href="https://commons.wikimedia.org" target="_blank" rel="noopener noreferrer">
              Wikimedia Commons
            </Anchor>
            .
          </Text>

          <Box style={{ overflowX: 'auto' }}>
            <Table striped highlightOnHover withTableBorder verticalSpacing="sm" miw={520}>
              <TableThead>
                <TableTr>
                  <TableTh>Photograph</TableTh>
                  <TableTh>Credit</TableTh>
                  <TableTh>Source</TableTh>
                </TableTr>
              </TableThead>
              <TableTbody>
                {attributedImages.map((entry) => (
                  <TableTr key={entry.slot}>
                    <TableTd>
                      <Text size="sm">{entry.alt}</Text>
                    </TableTd>
                    <TableTd>
                      <Text size="sm">{entry.credit}</Text>
                    </TableTd>
                    <TableTd>
                      {entry.creditUrl ? (
                        <Anchor
                          href={entry.creditUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          size="sm"
                        >
                          View original
                        </Anchor>
                      ) : (
                        <Text size="sm" c="dimmed">
                          &mdash;
                        </Text>
                      )}
                    </TableTd>
                  </TableTr>
                ))}
              </TableTbody>
            </Table>
          </Box>

          <Text size="sm" c="dimmed" style={{ lineHeight: 1.7 }}>
            Photographs are illustrative. Unless a caption says otherwise, they do not depict CropX
            users, CropX trials, or the specific varieties discussed nearby.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
