import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata('Field Notes', 'Practical agronomy writing on seed choice, soil, climate, and crop protection.');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
