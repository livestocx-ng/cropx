import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata(
  'Crop Surveillance',
  'Early warning for pests and disease that can erase a climate fit variety before harvest, protecting food security after planting.'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
