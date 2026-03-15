# Watch party app — architecture context

## What this is
A private watch party app where authenticated users can create a room, stream video live, and share a 6-digit room code with viewers. Viewers join anonymously — no login required. Only manually created accounts can stream.

## Tech stack
- **Framework**: Next.js (App Router)
- **Auth**: NextAuth.js (Auth.js v5) — credentials provider, email + password only, no OAuth
- **ORM**: Prisma 7 with PostgreSQL
- **Room state**: Redis (ephemeral — rooms live only while the stream is active)
- **Video ingest**: WebRTC via WHIP (host browser → media server)
- **Video delivery**: HLS via VidStack player (media server → viewers)
- **Media server**: Cloudflare Stream or mediamtx (TBD)
- **Infrastructure**: Self-hosted VPS with Podman

---

## Database (Postgres via Prisma)

Rooms are **not** stored in Postgres. They are ephemeral and live only in Redis.

### `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
}
```

---

## Auth (NextAuth.js)

- Credentials provider only — email + password
- Password stored as bcrypt hash (cost factor 12)
- `role` is attached to the JWT and exposed on the session
- Custom sign-in page at `/login`

### Role permissions
| Role | Can do |
|------|--------|
| `USER` | Log in, create a room, start a stream |
| `ADMIN` | Everything USER can + manage users at `/admin/users`, manage active rooms at `/admin/rooms` |

### Session shape
```ts
session.user.id      // string (UUID)
session.user.email   // string
session.user.role    // "USER" | "ADMIN"
```

### Route protection pattern
```ts
const session = await auth()
if (!session) redirect('/login')
if (session.user.role !== 'ADMIN') redirect('/')
```

---

## Admin account
- One admin account, seeded via `prisma/seed.ts`
- Admin credentials come from env vars `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- Seed is idempotent — skips if admin already exists
- Run with: `npx prisma db seed`

---

## Redis — room schema

Rooms are stored as Redis hashes under the key `room:{code}`.

### Fields
| Field | Type | Description |
|-------|------|-------------|
| `code` | string | 6-character alphanumeric room code |
| `hostId` | string | UUID of the User who created the room |
| `hostEmail` | string | For display in admin panel |
| `streamUrl` | string | HLS .m3u8 URL for viewers |
| `whipEndpoint` | string | WHIP URL for host to push to |
| `active` | boolean | Whether the stream is live |
| `createdAt` | ISO string | Room creation timestamp |

### Key pattern
```
room:ABC123       — room data (hash)
rooms:active      — set of active room codes
```

---

## Room codes
- 6-digit alphanumeric (e.g. `A3F9K2`)
- Generated on room creation, checked for uniqueness against Redis
- Viewers enter the code on the home page to join

---

## Environment variables needed
```env
DATABASE_URL="postgresql://user:password@localhost:5432/watchparty"
NEXTAUTH_SECRET="random-secret"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="you@example.com"
ADMIN_PASSWORD="plain-text-only-used-at-seed-time"
REDIS_URL="redis://localhost:6379"
```

---

## Infrastructure — Docker / Podman Compose

Postgres and Redis run as containers on the VPS, managed via `docker-compose.yml` that is also compatible with `podman-compose` (and can be used to create a Podman pod).

---

## Pages & routes (planned)

| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Home — enter room code or sign in link |
| `/login` | Public | Email + password sign-in form |
| `/room/[code]` | Public | Viewer room page with VidStack player |
| `/stream` | USER + ADMIN | Host page — create room, start streaming |
| `/admin/users` | ADMIN only | Add / remove / list users |
| `/admin/rooms` | ADMIN only | View and force-close active rooms |
