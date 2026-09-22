import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata(
  'Climate Insights',
  'Rainfall, season length, and drought risk across Nigeria’s six agro-ecological zones: the climate assumptions behind every seed recommendation.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
