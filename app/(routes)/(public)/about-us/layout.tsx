import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata('About', 'Why CropX exists: safeguarding African food security by getting climate-resilient seed to the farmers who need it.');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
