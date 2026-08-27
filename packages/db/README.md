1. (_packages/db/_) -DB schema- No arrays/JSONs as field types coz difficult to query the data (this is DB normalization)

- **TABLES**:-
  - Users -
    - id, name, email(magic link auth/Google OAuth) , roles, board_assigned, 1-many relation with tasks, many-many relation with Orgs (maybe a separate table name members)
  - Org
    - id, name, description, members (1-many relation with users - separate table named members ), boards_assigned
  - Members
    - id, userId (referencing to users table), orgId (referencing to org table), boardId (members assigned to a particular proj(board) )
    - contains composite primary key
  - Project -
    - id title description
    - relations -
      - 1 org can have many projects but 1 proj can belong to only 1 org (1-many for org - proj)
      - 1 proj can have many boards but 1 board can belong to 1 proj
      - many users can belong to many projects at a time & 1 proj can have many users
  - Board
    - id, title, description, many-1 relation with an Org,
    - members_assigned_to_the_board (many-many relation with Users - 1 board-many users, 1 user-many boards based on user role)
  - Tasks
    - id, title, description
    - boardId (many-1 relation with board)
    - (many-many relation with users:-
      - 1 user-many tasks
      - 1 task -many users  
        -> table task_mapping (id, userId, taskId))
  - Section (Admin dynamically creates the sections for tasks - no enum)
    - id, title (ENUMS) : state of task - upcoming, in_progres, done -> by default
    - boardId (which tasks are in which board),
    - 1-many relation with tasks (1 section can have many tasks, 1 task can have only 1 section) -> ondelete:"restrict"

  - Comments - conversation of members on a particular tasks

- **Relations**
  - 1-many for tasks-comments -> 1 tasks can have many comments, 1 comment can belong to only 1 tasks

  - 1-many for tasks-sections -> 1 tasks can belong to 1 section but 1 section can have many tasks

  - many-many relation b/w users-orgs-> 1 user many orgs, 1 org can have many users

  - 1-many for boards-tasks -> 1 board can have many tasks but 1 task can belong to a particular board

  - many-many relation b/w users-tasks-> 1 user many tasks, 1 task - many users

Hierarchy -

- I am the Admin -> Members (AI Agents)
- Project -> Boards -> Tasks
- Admin onboards members (agents) into an proj -> assign them projects -> Admin creates boards/project -> creates tasks per board
- (Future impl) -> Agents take up the task - creates issue in github - solve them - raise PR - review the PR - merge them
