# 🅿️ SmartPark — Code: React Frontend

## Setup

```bash
cd frontend
npx -y create-vite@latest smartpark-ui -- --template react-ts
cd smartpark-ui
npm install axios react-router-dom
```

---

## `frontend/smartpark-ui/src/services/api.ts`

```typescript
import axios from 'axios';

// Create an axios instance that points to our API Gateway
const api = axios.create({
  baseURL: 'http://localhost:5000',  // Ocelot Gateway URL
});

// Before every request, attach the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If we get a 401 (unauthorized), redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## `frontend/smartpark-ui/src/context/AuthContext.tsx`

```tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import api from '../services/api';

// What user info we store
interface User {
  userId: string;
  fullName: string;
  email: string;
  role: string;
}

// What the context provides
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

// Hook to use auth anywhere in the app
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    });
  };

  const register = async (name: string, email: string, password: string, phone: string) => {
    const { data } = await api.post('/api/auth/register', {
      fullName: name, email, password, phoneNumber: phone,
    });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## `frontend/smartpark-ui/src/pages/Login.tsx`

```tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await register(name, email, password, phone);
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🅿️ SmartPark</h1>
        <h2>{isRegister ? 'Register' : 'Login'}</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input type="text" placeholder="Full Name" value={name}
                onChange={e => setName(e.target.value)} required />
              <input type="tel" placeholder="Phone Number" value={phone}
                onChange={e => setPhone(e.target.value)} required />
            </>
          )}
          <input type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} required />
          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        </form>

        <p onClick={() => setIsRegister(!isRegister)} className="toggle">
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
}
```

---

## `frontend/smartpark-ui/src/pages/Dashboard.tsx`

```tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ totalSpots: 0, available: 0, myBookings: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [spotsRes, bookingsRes] = await Promise.all([
          api.get('/api/spots'),
          api.get('/api/bookings'),
        ]);
        const spots = spotsRes.data;
        setStats({
          totalSpots: spots.length,
          available: spots.filter((s: any) => s.isAvailable).length,
          myBookings: bookingsRes.data.length,
        });
      } catch (err) { console.error(err); }
    };
    loadStats();
  }, []);

  return (
    <div className="dashboard">
      <header>
        <h1>🅿️ SmartPark Dashboard</h1>
        <div>
          <span>Welcome, {user?.fullName} ({user?.role})</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Spots</h3>
          <p className="stat-number">{stats.totalSpots}</p>
        </div>
        <div className="stat-card available">
          <h3>Available</h3>
          <p className="stat-number">{stats.available}</p>
        </div>
        <div className="stat-card">
          <h3>My Bookings</h3>
          <p className="stat-number">{stats.myBookings}</p>
        </div>
      </div>

      <div className="quick-links">
        <Link to="/spots" className="link-card">🔍 Find Parking</Link>
        <Link to="/bookings" className="link-card">📋 My Bookings</Link>
      </div>
    </div>
  );
}
```

---

## `frontend/smartpark-ui/src/pages/Spots.tsx`

```tsx
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Spots() {
  const [spots, setSpots] = useState<any[]>([]);
  const [vehicle, setVehicle] = useState('');
  const [hours, setHours] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSpots();
  }, []);

  const loadSpots = async () => {
    const { data } = await api.get('/api/spots');
    setSpots(data);
  };

  const bookSpot = async (spotId: string, pricePerHour: number) => {
    if (!vehicle) { setMessage('Enter your vehicle number!'); return; }
    try {
      await api.post('/api/bookings', {
        spotId,
        startTime: new Date().toISOString(),
        hours,
        vehicleNumber: vehicle,
      });
      setMessage('✅ Booking created! Payment is being processed...');
      loadSpots(); // Refresh spots
    } catch (err: any) {
      setMessage('❌ ' + (err.response?.data?.message || 'Booking failed'));
    }
  };

  return (
    <div className="spots-page">
      <h1>🔍 Available Parking Spots</h1>

      <div className="booking-form">
        <input placeholder="Your Vehicle Number (eg: KA-01-AB-1234)"
          value={vehicle} onChange={e => setVehicle(e.target.value)} />
        <select value={hours} onChange={e => setHours(Number(e.target.value))}>
          {[1, 2, 3, 4, 5, 6, 8, 12, 24].map(h => (
            <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="spots-grid">
        {spots.map(spot => (
          <div key={spot.id} className={`spot-card ${spot.isAvailable ? 'free' : 'taken'}`}>
            <h3>{spot.spotNumber}</h3>
            <p>{spot.location} • {spot.type}</p>
            <p className="price">₹{spot.pricePerHour}/hr</p>
            {spot.isAvailable ? (
              <button onClick={() => bookSpot(spot.id, spot.pricePerHour)}>
                Book Now (₹{spot.pricePerHour * hours})
              </button>
            ) : (
              <span className="taken-badge">Occupied</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## `frontend/smartpark-ui/src/pages/Bookings.tsx`

```tsx
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Bookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    api.get('/api/bookings').then(res => setBookings(res.data));
  }, []);

  const statusColor = (status: string) => {
    if (status === 'Confirmed') return 'green';
    if (status === 'Cancelled') return 'red';
    return 'orange';
  };

  return (
    <div className="bookings-page">
      <h1>📋 My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet. Go find a spot!</p>
      ) : (
        <div className="bookings-list">
          {bookings.map(b => (
            <div key={b.id} className="booking-card">
              <div className="booking-header">
                <h3>{b.spot?.spotNumber || 'Spot'}</h3>
                <span style={{ color: statusColor(b.status) }} className="status">
                  {b.status}
                </span>
              </div>
              <p>🚗 {b.vehicleNumber}</p>
              <p>⏰ {new Date(b.startTime).toLocaleString()} • {b.hours}h</p>
              <p>💰 ₹{b.totalAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## `frontend/smartpark-ui/src/App.tsx`

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Spots from './pages/Spots';
import Bookings from './pages/Bookings';
import './App.css';

// Protects routes — redirects to login if not logged in
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/spots" element={<ProtectedRoute><Spots /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

---

## `frontend/smartpark-ui/src/App.css`

```css
/* ── Global Styles ── */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; color: #333; }

/* ── Login Page ── */
.login-page { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #667eea, #764ba2); }
.login-card { background: white; padding: 40px; border-radius: 16px; width: 400px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
.login-card h1 { text-align: center; font-size: 2rem; margin-bottom: 8px; }
.login-card h2 { text-align: center; color: #666; margin-bottom: 24px; }
.login-card input { width: 100%; padding: 12px; margin-bottom: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; }
.login-card button { width: 100%; padding: 12px; background: #667eea; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; }
.login-card button:hover { background: #5a6fd6; }
.toggle { text-align: center; margin-top: 16px; color: #667eea; cursor: pointer; }
.error { color: red; text-align: center; margin-bottom: 12px; }

/* ── Dashboard ── */
.dashboard { max-width: 900px; margin: 0 auto; padding: 24px; }
.dashboard header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
.dashboard header button { padding: 8px 16px; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; }
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
.stat-card { background: white; padding: 24px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.stat-card.available { border-left: 4px solid #27ae60; }
.stat-number { font-size: 2.5rem; font-weight: bold; color: #667eea; }
.quick-links { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.link-card { display: block; padding: 20px; background: white; border-radius: 12px; text-align: center; text-decoration: none; color: #333; font-size: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s; }
.link-card:hover { transform: translateY(-4px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }

/* ── Spots Page ── */
.spots-page { max-width: 900px; margin: 0 auto; padding: 24px; }
.booking-form { display: flex; gap: 12px; margin: 16px 0; }
.booking-form input, .booking-form select { padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; }
.booking-form input { flex: 1; }
.message { padding: 12px; margin: 12px 0; border-radius: 8px; background: #e8f5e9; }
.spots-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-top: 16px; }
.spot-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.spot-card.free { border-top: 4px solid #27ae60; }
.spot-card.taken { border-top: 4px solid #e74c3c; opacity: 0.7; }
.spot-card h3 { font-size: 1.4rem; margin-bottom: 6px; }
.spot-card .price { font-weight: bold; color: #667eea; font-size: 1.2rem; margin: 8px 0; }
.spot-card button { width: 100%; padding: 10px; background: #27ae60; color: white; border: none; border-radius: 8px; cursor: pointer; }
.spot-card button:hover { background: #219a52; }
.taken-badge { display: block; text-align: center; padding: 10px; background: #fce4e4; color: #c0392b; border-radius: 8px; }

/* ── Bookings Page ── */
.bookings-page { max-width: 900px; margin: 0 auto; padding: 24px; }
.bookings-list { display: grid; gap: 12px; }
.booking-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.booking-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.status { font-weight: bold; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; }
```

---

## Frontend Dockerfile

### `frontend/smartpark-ui/Dockerfile`

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

> [!TIP]
> **To run the frontend locally for development:**
> ```bash
> cd frontend/smartpark-ui
> npm install
> npm run dev
> ```
> It will start at `http://localhost:5173`
