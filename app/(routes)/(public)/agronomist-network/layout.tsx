import { buildMetadata } from '@/core/utils/metadata';

export const metadata = buildMetadata('Agronomist Network', 'Remote and in-person agronomy advice, routed to the farmers who need it most.');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
