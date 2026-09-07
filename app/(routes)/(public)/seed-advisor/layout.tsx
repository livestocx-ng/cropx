import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata('Seed Advisor', 'Match your farm to drought and heat-resilient crop varieties by location, soil, and crop.');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
