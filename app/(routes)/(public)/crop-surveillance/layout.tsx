import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata('Crop Surveillance', 'Early warning for crop pests and disease, built from what farmers observe in their own fields.');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
