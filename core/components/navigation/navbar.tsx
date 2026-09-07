'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconChevronDown, IconSeeding } from '@tabler/icons-react';
import {
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Menu,
  NavLink,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
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
      padding: '8px 4px',
      textDecoration: 'none',
      color: active ? 'var(--mantine-color-primary-8)' : 'var(--mantine-color-dark-7)',
      fontSize: 'var(--mantine-font-size-sm)',
      fontWeight: active ? 600 : 500,
      borderBottom: active ? '2px solid var(--mantine-color-primary-6)' : '2px solid transparent',
      transition: 'color 150ms ease, border-color 150ms ease',
    }) as const;

  return (
    <Box
      component="header"
      className={classes.header}
      style={{
        transition: 'background-color 200ms ease, border-color 200ms ease',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'var(--cropx-white)',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--cropx-border-warm)' : 'transparent'}`,
      }}
    >
      <Container size="xl" px={20} py={12}>
        <Group justify="space-between" gap={4} align="center" wrap="nowrap">
          {/* TODO: replace the icon + wordmark with the CropX logo once supplied. */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              color: 'inherit',
            }}
            aria-label="CropX home"
          >
            <ThemeIcon size={32} radius="md" color="primary" variant="filled">
              <IconSeeding size={20} />
            </ThemeIcon>
            <Text fw={700} size="lg" style={{ letterSpacing: '-0.02em' }}>
              CropX
            </Text>
          </Link>

          <Group gap={20} visibleFrom="md" justify="center">
            {navLinks.map((link) => {
              const active = link.links
                ? link.links.some((item) => isLinkActive(item.link))
                : isLinkActive(link.link);

              if (link.links) {
                return (
                  <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                      <Box component="button" type="button" style={{ ...linkStyle(active), border: 'none', cursor: 'pointer', background: 'none' }}>
                        <Group gap={5}>
                          {link.label}
                          <IconChevronDown size={14} />
                        </Group>
                      </Box>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {link.links.map((item) => (
                        <Menu.Item
                          key={item.label}
                          component={Link}
                          href={item.link}
                          style={
                            isLinkActive(item.link)
                              ? { color: 'var(--mantine-color-primary-8)', fontWeight: 600 }
                              : undefined
                          }
                        >
                          {item.label}
                        </Menu.Item>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
                );
              }

              return (
                <Link key={link.label} href={link.link as string} style={linkStyle(active)}>
                  {link.label}
                </Link>
              );
            })}
          </Group>

          <Group gap="xs" wrap="nowrap">
            <Button
              component={Link}
              href="/seed-advisor#advisor"
              variant="filled"
              color="primary"
              radius="md"
              size="sm"
              visibleFrom="xs"
            >
              Try the Seed Advisor
            </Button>
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" aria-label="Toggle navigation" />
          </Group>
        </Group>
      </Container>

      <Drawer opened={opened} onClose={close} size="100%" padding="md" hiddenFrom="md" zIndex={1000}>
        <Stack gap="xs">
          {navLinks.map((link) => {
            const active = link.links
              ? link.links.some((item) => isLinkActive(item.link))
              : isLinkActive(link.link);

            if (link.links) {
              return (
                <NavLink key={link.label} label={link.label} defaultOpened={active}>
                  {link.links.map((item) => (
                    <NavLink
                      key={item.label}
                      component={Link}
                      href={item.link}
                      label={item.label}
                      onClick={close}
                      active={isLinkActive(item.link)}
                      color="primary"
                    />
                  ))}
                </NavLink>
              );
            }

            return (
              <NavLink
                key={link.label}
                component={Link}
                href={link.link as string}
                label={link.label}
                onClick={close}
                active={active}
                color="primary"
              />
            );
          })}

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
            Try the Seed Advisor
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
