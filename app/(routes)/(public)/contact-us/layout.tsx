import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata(
  'Contact',
  'Get in touch about climate resilient variety recommendations, partnerships, or the Seed Advisor.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
