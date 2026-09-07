import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata(
  'Climate Insights',
  'Rainfall variability, drought risk, and warming across the six agro-ecological zones of Nigeria.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
