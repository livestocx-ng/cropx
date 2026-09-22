'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  NavLink,
  Stack,
} from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { BrandMark } from '@/core/components/brand/brand-mark';
import { navLinks } from '@/core/utilities';
import classes from './navbar.module.css';

export function Navbar() {
  const pathname = usePathname();
  const [scroll] = useWindowScroll();
  const [opened, { toggle, close }] = useDisclosure(false);

  const scrolled = scroll.y > 8;

  const isLinkActive = (link?: string) =>
    !!link && !link.startsWith('http') && (pathname === link || pathname.startsWith(`${link}/`));

  const linkStyle = (active: boolean) =>
    ({
      display: 'block',
      lineHeight: 1.2,
      padding: '10px 6px',
      textDecoration: 'none',
      color: active ? 'var(--mantine-color-primary-8)' : 'var(--mantine-color-dark-7)',
      fontSize: 14,
      fontWeight: active ? 600 : 500,
      whiteSpace: 'nowrap' as const,
      transition: 'color 150ms ease',
    }) as const;

  return (
    <Box
      component="header"
      className={classes.header}
      style={{
        transition: 'background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.96)' : 'var(--cropx-white)',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: '1px solid var(--cropx-border)',
        boxShadow: scrolled ? '0 4px 20px rgba(10, 31, 18, 0.04)' : 'none',
      }}
    >
      <Container size="xl" px={20} py={14}>
        <Group justify="space-between" gap="md" align="center" wrap="nowrap">
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              flexShrink: 0,
            }}
            aria-label="CropX home"
          >
            <BrandMark />
          </Link>

          <Group gap={8} visibleFrom="lg" justify="center" style={{ flex: 1 }}>
            {navLinks.map((link) => {
              const active = isLinkActive(link.link);
              return (
                <Link key={link.label} href={link.link as string} style={linkStyle(active)}>
                  {link.label}
                </Link>
              );
            })}
          </Group>

          <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
            <Button
              component={Link}
              href="/seed-advisor#advisor"
              variant="filled"
              color="primary"
              radius="md"
              size="sm"
              visibleFrom="xs"
              styles={{ root: { fontWeight: 600, height: 40, paddingInline: 18 } }}
            >
              Get started
            </Button>
            <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="sm" aria-label="Toggle navigation" />
          </Group>
        </Group>
      </Container>

      <Drawer opened={opened} onClose={close} size="100%" padding="md" hiddenFrom="lg" zIndex={1000}>
        <Stack gap="xs" mt="md">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              component={Link}
              href={link.link as string}
              label={link.label}
              onClick={close}
              active={isLinkActive(link.link)}
              color="primary"
            />
          ))}

          <Button
            component={Link}
            href="/seed-advisor#advisor"
            onClick={close}
            variant="filled"
            color="primary"
            radius="md"
            mt="md"
            fullWidth
          >
            Get started (free)
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
