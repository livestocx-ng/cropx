import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata('Contact', 'Get in touch with the CropX team.');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
