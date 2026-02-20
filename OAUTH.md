# OAuth Entegrasyonu Dokümantasyonu

Bu dokümantasyon, BentoAuth projesine Google ve GitHub OAuth entegrasyonunun nasıl yapıldığını açıklamaktadır.

## İçindekiler

- [Genel Bakış](#genel-bakış)
- [Mimari](#mimari)
- [Backend Değişiklikleri](#backend-değişiklikleri)
- [Frontend Değişiklikleri](#frontend-değişiklikleri)
- [Yapılandırma](#yapılandırma)
- [OAuth Akışı](#oauth-akışı)
- [Test Etme](#test-etme)
- [Sorun Giderme](#sorun-giderme)

---

## Genel Bakış

Bu entegrasyon, kullanıcıların Google veya GitHub hesaplarıyla giriş yapabilmelerini sağlar. Passport.js kütüphanesi kullanılarak implement edilmiştir.

### Kullanılan Teknolojiler

| Teknoloji | Amaç |
|-----------|------|
| `passport` | Kimlik doğrulama middleware'i |
| `passport-google-oauth20` | Google OAuth 2.0 stratejisi |
| `passport-github2` | GitHub OAuth stratejisi |
| `express-session` | Oturum yönetimi |

---

## Mimari

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Frontend      │───▶│   Backend       │───▶│   OAuth         │
│   (React)       │    │   (Express)     │    │   Provider      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                      │                      │
        │                      │                      │
        ▼                      ▼                      ▼
   /auth/callback      /api/auth/:provider    OAuth Provider
                        /api/auth/:provider/callback
```

---

## Backend Değişiklikleri

### 1. User Model (`backend/models/User.js`)

OAuth kullanıcıları için yeni alanlar eklendi:

```javascript
const UserSchema = new mongoose.Schema({
  // ... mevcut alanlar
  
  // OAuth Provider Info
  provider: {
    type: String,
    enum: ['local', 'google', 'github'],
    default: 'local'
  },
  providerId: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: null
  }
});
```

**Önemli Değişiklikler:**
- `password` alanı artık OAuth kullanıcıları için opsiyonel
- `provider` alanı ile kimlik doğrulama yöntemi takip ediliyor
- `providerId` ile OAuth sağlayıcısındaki benzersiz ID saklanıyor

### 2. Passport Config (`backend/config/passport.js`)

Passport stratejileri yapılandırıldı:

```javascript
// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, verifyCallback));

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/api/auth/github/callback'
}, verifyCallback));
```

### 3. OAuth Routes (`backend/routes/oauth.js`)

Yeni endpoint'ler eklendi:

| Endpoint | Açıklama |
|----------|----------|
| `GET /api/auth/google` | Google OAuth akışını başlatır |
| `GET /api/auth/google/callback` | Google OAuth callback |
| `GET /api/auth/github` | GitHub OAuth akışını başlatır |
| `GET /api/auth/github/callback` | GitHub OAuth callback |

### 4. Server Updates (`backend/server.js`)

Session ve Passport middleware'leri eklendi:

```javascript
const session = require('express-session');
const passport = require('./config/passport');

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
```

---

## Frontend Değişiklikleri

### 1. AuthContext (`frontend/src/context/AuthContext.jsx`)

Yeni fonksiyonlar eklendi:

```javascript
// Google OAuth login
const loginWithGoogle = () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  window.location.href = `${apiBaseUrl}/api/auth/google`;
};

// GitHub OAuth login
const loginWithGithub = () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  window.location.href = `${apiBaseUrl}/api/auth/github`;
};

// OAuth callback handler
const handleOAuthCallback = (token, userData, rememberMe = true) => {
  // Token ve user data'yı storage'a kaydet
  // State'i güncelle
};
```

### 2. Auth Page (`frontend/src/pages/Auth.jsx`)

Butonlara onClick handler'ları eklendi:

```jsx
<button onClick={loginWithGoogle} className="btn-ghost">
  {/* Google SVG */}
  Google
</button>

<button onClick={loginWithGithub} className="btn-ghost">
  <i className="fab fa-github" />
  GitHub
</button>
```

### 3. OAuth Callback Page (`frontend/src/pages/OAuthCallback.jsx`)

Callback handling için yeni sayfa oluşturuldu:

```jsx
const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const token = searchParams.get('token');
    const userData = searchParams.get('user');
    
    handleOAuthCallback(token, userData);
    navigate('/dashboard');
  }, []);
  
  return <LoadingSpinner />;
};
```

### 4. Routes (`frontend/src/main.jsx`)

Yeni route eklendi:

```jsx
<Route path="/auth/callback" element={<OAuthCallback />} />
```

---

## Yapılandırma

### Environment Variables (`backend/.env`)

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5001/api/auth/google/callback

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:5001/api/auth/github/callback

# Session
SESSION_SECRET=your_session_secret_here

# Frontend URL (for redirects)
FRONTEND_URL=http://localhost:5173
```

### Google OAuth Yapılandırması

1. [Google Cloud Console](https://console.cloud.google.com/)'a gidin
2. Proje oluşturun veya mevcut projeyi seçin
3. **APIs & Services > Credentials** > **Create Credentials > OAuth client ID**
4. Application type: **Web application**
5. Authorized redirect URIs:
   ```
   http://localhost:5001/api/auth/google/callback
   ```
6. Client ID ve Client Secret'ı `.env` dosyasına ekleyin

### GitHub OAuth Yapılandırması

1. GitHub'da **Settings > Developer settings > OAuth Apps > New OAuth App**
2. Bilgileri doldurun:
   - Application name: `BentoAuth Dev`
   - Homepage URL: `http://localhost:5173`
   - Authorization callback URL: `http://localhost:5001/api/auth/github/callback`
3. Client ID ve Client Secret'ı `.env` dosyasına ekleyin

---

## OAuth Akışı

### 1. Kullanıcı "Google ile Giriş" butonuna tıklar

```
Frontend → GET /api/auth/google
```

### 2. Backend Google'a yönlendirir

```
Backend → 302 Redirect → Google OAuth Sayfası
```

### 3. Kullanıcı Google'da yetkilendirir

```
Google → GET /api/auth/google/callback?code=xxx
```

### 4. Backend code'u token'a çevirir ve kullanıcı bilgilerini alır

```
Backend → Google API → User Info
```

### 5. Backend kullanıcıyı oluşturur/bulur ve JWT token üretir

```
Backend → MongoDB (User create/find)
Backend → JWT Token Generate
```

### 6. Backend frontend callback sayfasına yönlendirir

```
Backend → 302 Redirect → /auth/callback?token=xxx&user=xxx
```

### 7. Frontend token'ı kaydeder ve dashboard'a yönlendirir

```
Frontend → localStorage/sessionStorage → /dashboard
```

---

## Test Etme

### Backend Testi

```bash
# Backend'i başlat
cd backend
npm run dev

# Health check
curl http://localhost:5001/api/health

# Google OAuth endpoint testi
curl -I http://localhost:5001/api/auth/google
# Beklenen: 302 Redirect to Google

# GitHub OAuth endpoint testi
curl -I http://localhost:5001/api/auth/github
# Beklenen: 302 Redirect to GitHub
```

### Frontend Testi

```bash
# Frontend'i başlat
cd frontend
npm run dev

# Tarayıcıda aç
open http://localhost:5173

# OAuth butonlarına tıklayın
```

### Tam OAuth Akışı Testi

1. Frontend ve Backend'i başlatın
2. `http://localhost:5173` adresine gidin
3. "Google" veya "GitHub" butonuna tıklayın
4. OAuth sağlayıcısında giriş yapın
5. Dashboard'a yönlendirilmelisiniz

---

## Sorun Giderme

### Yaygın Hatalar

#### 1. "OAuth2RedirectUriMismatch" (Google)
- **Neden:** Callback URL eşleşmiyor
- **Çözüm:** Google Console'da callback URL'i kontrol edin

#### 2. "redirect_uri_mismatch" (GitHub)
- **Neden:** Callback URL eşleşmiyor
- **Çözüm:** GitHub OAuth App ayarlarında callback URL'i kontrol edin

#### 3. Session Hatası
- **Neden:** SESSION_SECRET tanımlı değil
- **Çözüm:** `.env` dosyasına SESSION_SECRET ekleyin

#### 4. CORS Hatası
- **Neden:** Frontend URL backend CORS ayarlarında yok
- **Çözüm:** `server.js`'te CORS ayarlarını kontrol edin

#### 5. MongoDB Bağlantı Hatası
- **Neden:** MongoDB çalışmıyor
- **Çözüm:** MongoDB'yi başlatın: `mongod`

### Loglama

Backend loglarını kontrol edin:
```bash
# Backend console çıktısı
# OAuth hataları "OAuth Error:" prefix'i ile loglanır
```

### Debug Modu

Passport debug modunu etkinleştirin:
```javascript
// backend/config/passport.js
passport.use(new GoogleStrategy({
  // ...
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  console.log('Google Profile:', profile);
  // ...
}));
```

---

## Güvenlik Notları

1. **State Parameter:** Production'da OAuth state parameter kullanın (CSRF koruması)
2. **HTTPS:** Production'da HTTPS kullanın
3. **Token Expiry:** JWT token sürelerini uygun şekilde ayarlayın
4. **Scope:** Sadece gerekli OAuth scope'larını isteyin
5. **Secrets:** Client secret'ları asla frontend'de saklamayın

---

## Dosya Yapısı

```
almanya101/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── passport.js       # YENİ
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js           # GÜNCELLENDİ
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   └── oauth.js          # YENİ
│   ├── server.js             # GÜNCELLENDİ
│   └── .env                  # GÜNCELLENDİ
├── frontend/
│   └── src/
│       ├── context/
│       │   └── AuthContext.jsx  # GÜNCELLENDİ
│       ├── pages/
│       │   ├── Auth.jsx         # GÜNCELLENDİ
│       │   ├── Dashboard.jsx
│       │   └── OAuthCallback.jsx # YENİ
│       └── main.jsx             # GÜNCELLENDİ
└── docs/
    └── OAUTH.md                 # BU DOSYA
```

---

## Tarihçe

| Tarih | Değişiklik |
|-------|------------|
| 2026-02-19 | Google ve GitHub OAuth entegrasyonu eklendi |

---

## İletişim

Herhangi bir sorun yaşarsanız, proje sahibiyle iletişime geçin.
