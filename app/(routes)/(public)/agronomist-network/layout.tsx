import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata(
  'Agronomist Network',
  'Confirm climate-fit variety shortlists with agronomists and extension officers who know the district.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
