import {Box, Group, Progress, Stack, Text} from '@mantine/core';

interface AdvisorPreviewProps {
	variant?: 'default' | 'embedded';
}

/**
 * Static product preview for marketing heroes — not interactive.
 * Styled like a SaaS product surface (Bountiful-style).
 */
export function AdvisorPreview({variant = 'default'}: AdvisorPreviewProps) {
	const embedded = variant === 'embedded';

	return (
		<Box
			p={embedded ? 0 : 'md'}
			style={{
				backgroundColor: embedded
					? 'transparent'
					: 'var(--cropx-white)',
				border: embedded ? 'none' : '1px solid var(--cropx-border)',
				borderRadius: embedded ? 0 : 16,
			}}
		>
			<Stack gap='md'>
				{!embedded && (
					<Group justify='space-between' align='center'>
						<Text size='sm' fw={700} c='dark.7'>
							Seed Advisor
						</Text>
						<Text size='xs' c='primary.7' fw={600}>
							Preview
						</Text>
					</Group>
				)}

				{embedded && (
					<Group justify='space-between' align='center'>
						<Text size='sm' fw={700} c='dark.7'>
							Climate-fit ranking
						</Text>
						<Text size='xs' c='dimmed' fw={600}>
							Maize · Katsina
						</Text>
					</Group>
				)}

				<Box
					p='sm'
					style={{
						border: '1px solid var(--cropx-border)',
						borderRadius: 12,
						backgroundColor: 'var(--cropx-white)',
					}}
				>
					<Group grow>
						<Stack gap={2}>
							<Text size='xs' c='dimmed'>
								State
							</Text>
							<Text size='sm' fw={600}>
								Katsina
							</Text>
						</Stack>
						<Stack gap={2}>
							<Text size='xs' c='dimmed'>
								Soil
							</Text>
							<Text size='sm' fw={600}>
								Sandy loam
							</Text>
						</Stack>
						<Stack gap={2}>
							<Text size='xs' c='dimmed'>
								Crop
							</Text>
							<Text size='sm' fw={600}>
								Maize
							</Text>
						</Stack>
					</Group>
				</Box>

				<Stack gap='sm'>
					<Text
						size='xs'
						fw={700}
						c='primary.7'
						style={{letterSpacing: '-0.01em'}}
					>
						Top match
					</Text>

					<Box
						p='sm'
						style={{
							border: '1px solid var(--mantine-color-primary-3)',
							borderRadius: 12,
							backgroundColor: 'var(--mantine-color-primary-0)',
						}}
					>
						<Group
							justify='space-between'
							align='flex-start'
							mb='sm'
						>
							<Stack gap={2}>
								<Text fw={700} size='sm'>
									SAMMAZ 16
								</Text>
								<Text size='xs' c='dimmed'>
									IAR Zaria · 85 day maturity
								</Text>
							</Stack>
							<Text
								fw={700}
								c='primary.7'
								style={{
									fontFamily: 'var(--cropx-font-heading)',
									fontSize: '1.5rem',
									lineHeight: 1,
									letterSpacing: '-0.03em',
								}}
							>
								87
							</Text>
						</Group>

						<Stack gap={6}>
							<MetricRow label='Drought' value={92} />
							<MetricRow label='Heat' value={88} />
							<MetricRow label='Season fit' value={81} />
						</Stack>
					</Box>

					<Box
						p='sm'
						style={{
							border: '1px solid var(--cropx-border)',
							borderRadius: 12,
							backgroundColor: 'var(--cropx-white)',
						}}
					>
						<Group justify='space-between'>
							<Text fw={600} size='sm'>
								SAMMAZ 14
							</Text>
							<Text fw={700} c='dimmed' size='sm'>
								79
							</Text>
						</Group>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
}

function MetricRow({label, value}: {label: string; value: number}) {
	return (
		<Group gap='xs' wrap='nowrap'>
			<Text size='xs' c='dark.6' style={{width: 72, flexShrink: 0}}>
				{label}
			</Text>
			<Progress
				value={value}
				size='sm'
				radius='xl'
				color='primary'
				style={{flex: 1}}
			/>
			<Text
				size='xs'
				c='dimmed'
				fw={600}
				style={{width: 28, textAlign: 'right'}}
			>
				{value}
			</Text>
		</Group>
	);
}
