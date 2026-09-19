# Feature Specification: Database Schema (`packages/db`)

## Current State

- **Provider**: PostgreSQL via Prisma 7.
- **Models**:
  - `User`: Primary user accounts.

  - `Org`: Organization units.

  - `OrgMember`: Membership mapping between users and orgs (`@@unique([userId, orgId])`). _Future scope for multiple orgs_

  - `Project`: Project units belonging to an organization. Contains `Boards`.

  - `Board`: Project boards belonging to a project. Contains `Sections` & `Tasks`.

  - `BoardMember`: Membership mapping between users and project boards (`@@unique([userId, boardId])`). - Segregation of members in specific boards/tasks

  - `Section`: Task status sections per board (`UPCOMING`, `IN_PROGRESS`, `DONE`).

  - `Task`: Tasks assigned within sections and boards (`onDelete: Restrict` on Section relation).

  - `TaskMapping`: Task assignee mappings (`@@unique([userId, taskId])`).

  - `Comment`: Task comments tied to user and task.

- **IDs**: All models use surrogate cuid string primary keys (`id String @id @default(cuid())`).

## Data Flow

1. **By default** an Organization (`Workspace`) is created -> `Org` and `OrgMember` (ADMIN) records created. - ( Multiple Orgs - `Future Scope` )

2. Admin creates a Project -> then creates a `Board` linking `projectId`.

3. Default sections created for Board by the admin -> `Section` entries created (`UPCOMING`, `IN_PROGRESS`, `DONE`).

4. Tasks added to Board Section -> `Task` created linking `boardId` and `sectionId`.

5. Users assigned to Task -> `TaskMapping` entries created.

6. Users comment on Task -> `Comment` entries created linking `taskId` and `userId`.

## Future Improvements

- Add soft deletion (`deletedAt` field) for boards, tasks, projects, and organizations.
- Add audit log table for tracking task state transitions across sections.
- Support custom section titles beyond standard enum values if dynamic board workflows are enabled.
