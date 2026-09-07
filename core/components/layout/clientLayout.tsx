'use client';

import { Box } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { Footer } from '../navigation/footer';
import { Navbar } from '../navigation/navbar';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box style={{ position: 'relative' }}>
      <NavigationProgress color="green" />
      <Notifications position="top-right" />
      <ModalsProvider>
        <Navbar />
        {children}
        <Footer />
      </ModalsProvider>
    </Box>
  );
}
