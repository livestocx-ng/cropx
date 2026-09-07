import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata('Privacy Policy', 'How CropX handles data.');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
