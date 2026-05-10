# MaintenIQ MVP

Deployable Next.js MVP prototype for a Maintenance Operations SaaS platform.

## What is included
- Public landing website
- App dashboard
- Role-based demo views
- Work order workflow
- Scalable SaaS database schema
- Supabase-ready environment template

## Run locally
```bash
npm install
npm run dev
```

Open:
```bash
http://localhost:3000
```

## Deploy to Vercel
1. Create GitHub account.
2. Create a new GitHub repository.
3. Upload this folder contents.
4. Create Vercel account.
5. Import the GitHub repository into Vercel.
6. Click Deploy.

## Supabase setup
1. Create Supabase account.
2. Create a new project.
3. Open SQL Editor.
4. Run `supabase/schema.sql`.
5. Copy your Supabase URL and anon key into `.env.local`.

## Owner account
The real System Admin / Owner account will be created after Supabase Auth is enabled.
Suggested owner email:
`owner@mainteniq.com`

Replace it with your real business email when ready.
