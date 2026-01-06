import { useState } from 'react'
import { Navigate, Link as RouterLink } from 'react-router'
import { useNavigate } from 'react-router'
import useSWRMutation from 'swr/mutation'
import {
  Box,
  Button,
  Container,
  Field,
  Input,
  Stack,
  Text,
  Link,
  Alert,
  Card,
  VStack,
  Heading,
} from '@chakra-ui/react'
import { useAuth } from '@/contexts/auth-context'

export default function Register() {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { trigger: triggerRegister, isMutating: registerLoading } = useSWRMutation(
    'auth/register',
    (_key, { arg }) => register(arg)
  )
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      await triggerRegister({
        email: formData.email,
        password: formData.password,
        name: formData.name
      })
      // Registration successful, redirect to login
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Container maxW="md" py={12}>
      <Card.Root>
        <Card.Header>
          <VStack spacing={2}>
            <Heading size="lg">Create Account</Heading>
            <Text color="gray.600">Join BlogSpace today</Text>
          </VStack>
        </Card.Header>

        <Card.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {error && (
                <Alert.Root status="error">
                  <Alert.Indicator />
                  <Alert.Title>Error!</Alert.Title>
                  <Alert.Description>{error}</Alert.Description>
                </Alert.Root>
              )}

              <Field.Root>
                <Field.Label>Full Name</Field.Label>
                <Input
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Choose a password"
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Confirm Password</Field.Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </Field.Root>

              <Button
                type="submit"
                colorPalette="blue"
                width="full"
                loading={registerLoading}
              >
                Create Account
              </Button>
            </Stack>
          </form>
        </Card.Body>

        <Card.Footer>
          <Text>
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="blue.500">
              Sign in
            </Link>
          </Text>
        </Card.Footer>
      </Card.Root>
    </Container>
  )
}
