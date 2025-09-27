import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Button } from '../components/ui/button.jsx';
import { Container, Typography } from '@mui/material';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      nav('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-12">
      <Typography variant="h5" className="mb-4 font-semibold">Sign in</Typography>
      <Card>
        <CardHeader>
          <CardTitle>Secure Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={onSubmit}>
            <div>
              <label className="mb-1 block text-sm">Email</label>
              <Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@moes.gov.in" type="email" required />
            </div>
            <div>
              <label className="mb-1 block text-sm">Password</label>
              <Input value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" type="password" required />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>{loading? 'Signing in…':'Sign in'}</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
