# Supabase Configuration

## Migrations

Database migrations are stored in `migrations/` directory with version numbers.

### Current Migrations

- `001_create_base_tables.sql` - Creates `mapa_contribuicoes` and `mapa_expansao` tables with RLS policies

### How to Apply Migrations

1. **Using Supabase CLI (Recommended)**

   ```bash
   supabase migration new create_base_tables
   # Copy content of 001_create_base_tables.sql into the new file
   supabase db push
   ```

2. **Using Supabase Dashboard**

   - Go to SQL Editor
   - Create new query
   - Copy content from `001_create_base_tables.sql`
   - Run the entire script

### Tables

#### mapa_contribuicoes
Anonymous feedback about care pathways. **No personal identification.**

Fields:
- `id` (UUID) - Primary key
- `municipio` (VARCHAR) - City/Municipality
- `estado` (VARCHAR) - 2-letter state code
- `resposta_categoria` (VARCHAR) - Selected response category
- `origem` (VARCHAR) - Always "merco-2026" for this MVP
- `criado_em` (TIMESTAMP) - Creation timestamp

Security:
- Anyone can INSERT (anonymous feedback)
- Anyone can SELECT but via aggregated queries only (RLS allows but intended for stats)
- Row-level security enabled

#### mapa_expansao
Contact information for territorial expansion. **Private - contacts not accessible publicly.**

Fields:
- `id` (UUID) - Primary key
- `nome` (VARCHAR) - Contact name
- `cidade` (VARCHAR) - City
- `estado` (VARCHAR) - 2-letter state code
- `contato_whatsapp` (VARCHAR) - Optional WhatsApp number
- `contato_email` (VARCHAR) - Optional email address
- `tipo_participante` (VARCHAR) - Type of participant
- `consentimento_contato` (BOOLEAN) - Contact consent
- `origem` (VARCHAR) - Always "mapa-cuidado-expansao" for this MVP
- `criado_em` (TIMESTAMP) - Creation timestamp

Security:
- Anyone can INSERT (expansion interests)
- PUBLIC CANNOT SELECT (RLS policy blocks all public reads)
- Future: Admin users can SELECT with appropriate role

## Environment Variables

Required for frontend:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Privacy & Compliance

- ✓ No CPF or personal identification in contributions
- ✓ No clinical or health information in contributions
- ✓ No addresses in contributions
- ✓ Contacts stored separately and protected
- ✓ Row-level security configured
- ✓ Aggregated data only accessible to public

## Development Notes

- Migrations are idempotent (can run multiple times safely)
- All tables have automatic timestamps
- Proper indexes added for common queries
- Constraints ensure data integrity
