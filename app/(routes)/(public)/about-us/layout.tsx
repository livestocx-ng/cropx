import { buildMetadata } from '@/core/utils/metadata';
import { brand } from '@/core/content/brand';

export const metadata = buildMetadata('About', brand.missionFull);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
