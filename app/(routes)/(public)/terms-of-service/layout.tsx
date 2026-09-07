import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata('Terms of Service', 'The terms governing use of CropX.');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
