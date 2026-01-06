'use client'

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Text,
  Container,
  Drawer,
  Avatar,
  Menu,
  VStack,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'
import { useColorModeValue, ColorModeButton } from '@/components/ui/color-mode'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import { FiHome, FiPenTool, FiUsers, FiUser, FiInfo } from 'react-icons/fi'
import { Portal } from '@chakra-ui/react'
// import { useAuth } from '../AuthContext'
import { useAuth } from '@/contexts/auth-context'
import { authAPI } from '@/services/auth-api'
import { mutate } from 'swr'

const navLinks = [
  { name: 'Home', href: '/', icon: FiHome },
  { name: 'About', href: '/about', icon: FiInfo },
  { name: 'Write', href: '/posts/create', icon: FiPenTool },
  { name: 'Posts', href: '/posts', icon: FiUsers },
  { name: 'Profile', href: '#', icon: FiUser },
]

function Navbar() {

    const data = useAuth()
    const isAuthenticated = data.isAuthenticated


  const { isOpen, onOpen, onClose } = useDisclosure()
//   const { user, isAuthenticated, logout } = useAuth()
    const user = {
        name: "John",
        email: "John@gmail.com",
        avatar: "https://picsum.photos/200/300"
    }
    const logout = async () => {
      await authAPI.logout()
      mutate("auth/me")
    }
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBgDesktop = useColorModeValue('gray.200', 'gray.700')
  const hoverBgMobile = useColorModeValue('gray.100', 'gray.700')
  const drawerVStackBg = useColorModeValue('gray.50', 'gray.700')

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={10}
      bg={bgColor}
      borderBottom={1}
      borderStyle="solid"
      borderColor={borderColor}
      backdropFilter="blur(10px)"
    >
      <Container maxW="6xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo/Brand */}
          <Flex alignItems="center">
            <Text
              fontSize="xl"
              fontWeight="bold"
            >
              BlogSpace
            </Text>
          </Flex>

          {/* Desktop Navigation */}
          <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                as={RouterLink}
                to={link.href}
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgDesktop,
                }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <link.icon size={16} />
                {link.name}
              </Link>
            ))}
          </HStack>

          {/* Desktop Actions */}
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <ColorModeButton />
            {isAuthenticated ? (
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="ghost" p={1}>
                    <Avatar.Root size="sm">
                      <Avatar.Fallback name={user.name} />
                      <Avatar.Image src={user.avatar} />
                    </Avatar.Root>
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.ItemGroup>
                        <VStack align="start" p={3} spacing={1}>
                          <Text fontWeight="semibold">{user.name}</Text>
                          <Text fontSize="sm" color="gray.500">{user.email}</Text>
                        </VStack>
                      </Menu.ItemGroup>
                      <Menu.Separator />
                      <Menu.Item value="profile" asChild>
                        <RouterLink to="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                          <FiUser size={16} />
                          Profile
                        </RouterLink>
                      </Menu.Item>
                      <Menu.Item value="logout" onClick={logout}>
                        <FiLogOut size={16} />
                        Sign Out
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            ) : (
              <>
                <Button colorPalette="blue" variant="outline" size="sm" asChild>
                  <RouterLink to="/login">Sign In</RouterLink>
                </Button>
                <Button colorPalette="blue" size="sm" asChild>
                  <RouterLink to="/register">Get Started</RouterLink>
                </Button>
              </>
            )}
          </HStack>

          {/* Mobile menu button */}
          <HStack spacing={2} display={{ base: 'flex', md: 'none' }}>
            <ColorModeButton />
            <IconButton
              size="md"
              icon={<FiMenu />}
              aria-label="Open menu"
              onClick={onOpen}
              variant="ghost"
            />
          </HStack>
        </Flex>

        {/* Mobile Navigation Drawer */}
        <Drawer.Root open={isOpen} onOpenChange={onClose}>
          <Drawer.Backdrop />
          <Drawer.Content>
            <Drawer.CloseTrigger />
            <Drawer.Header borderBottomWidth="1px">
              <Text
                fontSize="xl"
                fontWeight="bold"
                bgGradient="linear(to-r, blue.400, purple.600)"
                bgClip="text"
              >
                BlogSpace
              </Text>
            </Drawer.Header>

            <Drawer.Body>
              <Stack spacing={6} pt={6}>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    as={RouterLink}
                    to={link.href}
                    onClick={onClose}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    p={3}
                    rounded="md"
                    _hover={{
                      textDecoration: 'none',
                      bg: hoverBgMobile,
                    }}
                  >
                    <link.icon size={20} />
                    <Text fontSize="lg">{link.name}</Text>
                  </Link>
                ))}

                <Stack spacing={4} pt={4} borderTopWidth="1px">
                  {isAuthenticated ? (
                    <>
                      <VStack align="start" p={3} spacing={1} bg={drawerVStackBg} rounded="md">
                        <Avatar.Root size="md">
                          <Avatar.Fallback name={user.name} />
                          <Avatar.Image src={user.avatar} />
                        </Avatar.Root>
                        <Text fontWeight="semibold">{user.name}</Text>
                        <Text fontSize="sm" color="gray.500">{user.email}</Text>
                      </VStack>
                      <Button colorPalette="red" variant="outline" onClick={() => { logout(); onClose(); }}>
                        <FiLogOut size={16} style={{ marginRight: '8px' }} />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button colorPalette="blue" variant="outline" onClick={onClose} asChild>
                        <RouterLink to="/login">Sign In</RouterLink>
                      </Button>
                      <Button colorPalette="blue" onClick={onClose} asChild>
                        <RouterLink to="/register">Get Started</RouterLink>
                      </Button>
                    </>
                  )}
                </Stack>
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      </Container>
    </Box>
  )
}

export default Navbar;