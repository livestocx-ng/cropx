'use client';

import Link from 'next/link';
import {
	Box,
	Button,
	Container,
	Grid,
	GridCol,
	Group,
	Stack,
	Text,
} from '@mantine/core';
import {IconArrowRight} from '@tabler/icons-react';
import {AdvisorPreview} from '@/core/components/advisor/advisor-preview';
import {brand} from '@/core/content/brand';

/**
 * Home hero with full-bleed video background + Seed Advisor preview.
 */
export function HomeHero() {
	return (
		<Box
			component='section'
			style={{
				position: 'relative',
				overflow: 'hidden',
				borderBottom: '1px solid var(--cropx-border)',
				minHeight: 'min(92vh, 820px)',
				display: 'flex',
				alignItems: 'center',
				backgroundColor: 'var(--cropx-ink)',
			}}
			pt={{base: 40, md: 56}}
			pb='var(--cropx-hero-py)'
		>
			<video
				autoPlay
				muted
				loop
				playsInline
				preload='metadata'
				aria-hidden
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					zIndex: 0,
				}}
			>
				<source src='/videos/video_home_1.mp4' type='video/mp4' />
			</video>

			{/* Readability scrim — keeps type legible over field footage */}
			<Box
				aria-hidden
				style={{
					position: 'absolute',
					inset: 0,
					zIndex: 1,
					background:
						'linear-gradient(105deg, rgba(10, 31, 18, 0.88) 0%, rgba(10, 31, 18, 0.45) 45%, rgba(10, 31, 18, 0.45) 70%, rgba(10, 31, 18, 0.35) 100%)',
				}}
			/>

			<Container
				size='xl'
				px={20}
				style={{position: 'relative', zIndex: 2, width: '100%'}}
			>
				<Grid gutter={{base: 40, md: 56}} align='center'>
					<GridCol span={{base: 12, md: 6}}>
						<Stack gap={24} maw={560}>
							{/* <Text size="sm" fw={600} c="accent.3" style={{ letterSpacing: '-0.01em' }}>
                Climate-smart seed for African farms
              </Text> */}

							<Text
								component='h1'
								m={0}
								c='white'
								style={{
									fontFamily: 'var(--cropx-font-heading)',
									fontSize: 'var(--cropx-text-display)',
									fontWeight: 700,
									lineHeight: 1.05,
									letterSpacing: '-0.035em',
								}}
							>
								CropX Seed Advisor
							</Text>

							<Text
								fw={600}
								c='white'
								style={{
									fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
									letterSpacing: '-0.02em',
									opacity: 0.95,
								}}
							>
								Safeguarding food security through climate-fit
								variety choice
							</Text>

							<Text
								m={0}
								style={{
									fontSize: 'var(--cropx-text-body-lg)',
									lineHeight: 1.65,
									color: 'rgba(255,255,255,0.82)',
									maxWidth: 480,
								}}
							>
								{brand.missionFull}
							</Text>
							{/* 
              <Group gap="sm" wrap="wrap" mt={4}>
                <Button
                  component={Link}
                  href="/seed-advisor#advisor"
                  size="lg"
                  radius="md"
                  color="primary"
                  rightSection={<IconArrowRight size={18} />}
                  styles={{ root: { height: 48, fontWeight: 600, paddingInline: 22 } }}
                >
                  Get started — free
                </Button>
                <Button
                  component={Link}
                  href="/seed-advisor"
                  size="lg"
                  radius="md"
                  variant="white"
                  color="dark"
                  styles={{ root: { height: 48, fontWeight: 600 } }}
                >
                  Explore Seed Advisor
                </Button>
                <Button
                  component={Link}
                  href="/climate-insights"
                  size="lg"
                  radius="md"
                  variant="outline"
                  color="gray.0"
                  styles={{
                    root: {
                      height: 48,
                      fontWeight: 600,
                      borderColor: 'rgba(255,255,255,0.45)',
                      color: 'white',
                    },
                  }}
                >
                  Climate Insights
                </Button>
              </Group> */}

							{/* <Text size="sm" m={0} style={{ color: 'rgba(255,255,255,0.65)' }}>
                No account · Runs in your browser · Reasoning shown on every match
              </Text> */}
						</Stack>
					</GridCol>

					<GridCol span={{base: 12, md: 6}}>
						<Box
							style={{
								borderRadius: 12,
								overflow: 'hidden',
								// border: '1px solid rgba(255,255,255,0.35)',
								// background:
								//   'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.42) 38%, rgba(255,255,255,0.92) 72%, #ffffff 100%)',
								backgroundColor: 'rgba(255,255,255)',
								boxShadow: '0 24px 64px rgba(10, 31, 18, 0.2)',
								backdropFilter: 'blur(10px)',
								WebkitBackdropFilter: 'blur(10px)',
							}}
						>
							<Group
								justify='space-between'
								px='lg'
								py={12}
								style={{
									borderBottom:
										'1px solid rgba(10, 31, 18, 0.08)',
									backgroundColor: 'transparent',
								}}
							>
								<Text size='sm' fw={600} c='dark.7'>
									Seed Advisor
								</Text>
								<Text size='xs' c='primary.7' fw={600}>
									Live preview
								</Text>
							</Group>
							<Box
								p={{base: 'md', md: 'lg'}}
								style={{backgroundColor: 'transparent'}}
							>
								<AdvisorPreview variant='embedded' />
							</Box>
						</Box>
					</GridCol>
				</Grid>
			</Container>

			<style>{`
        @media (prefers-reduced-motion: reduce) {
          section video {
            display: none;
          }
        }
      `}</style>
		</Box>
	);
}
