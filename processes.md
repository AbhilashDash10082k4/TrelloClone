1. DB Migration-
   - last contract missed temporal.updatedAt and temporal.createdAt
   -                DEVELOPMENT

contract.prisma
│
▼
contract emit
│
▼
migration plan
│
▼
migration.ts
│
├── manually edit if data migration required
│
▼
compile migration.ts
│
▼
ops.json
│
▼
migration check
│
▼
test locally
│
▼
COMMIT EVERYTHING

                    PRODUCTION

                    Git commit
                       │
                       ▼
                migration check
                       │
                       ▼
                migration status
                       │
                       ▼
                db migrate --show
                       │
                       ▼
                   db migrate
                       │
                       ▼
                migration status
                       │
                       ▼
                 db verify --strict
