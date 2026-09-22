import { buildMetadata } from '@/core/utils/metadata';
import { brand } from '@/core/content/brand';

export const metadata = buildMetadata(
  'Seed Advisor',
  `${brand.valueProp} Rank drought and climate resilient varieties by location, soil, and crop.`
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
