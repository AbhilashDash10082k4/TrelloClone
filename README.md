- The entire thing can be AI Native -
    - the user comes-signs up- creates orgs -> defines he requirements -> agent spawns up the tasks -> lines them up in different sections based on their states -> take up the tasks from kanban board -> creates the tasks in github -> solve them -> gen PR -> review the PR -> merges them

    - complete agentic SDLC

- SignUp/ SignIn (in house auth) 

- Orgs -> Teams -> Boards (Board specific permissions) 

- Dashboard (to show all the boards, their team members, tasks, etc.) 

- Tasks (Kanban boards - upcoming, in prog, done) movable tasks 

- Each task (collaborative space for teams to work on -file uploads for the particular task, comments)

- Admin can add/remove members

- At the top of board, the active profile should be visible (websockets) - card movements in real time to be shown

- If 2 people starts doing the same task at the same time then whose activity to accept? Like 2 people commenting at the same time (Conflict resolution)

- Comments to be shown in real time

- User connects the project repo (github repo) & creates tasks in the kanban form

- AI Solver : takes the tasks -> (creates them in git) solves them -> generates a PR -> reviews the PR -> automatically moves the tasks to in_progress & completed states

- DB schema -> Backend api routes -> Frontend

1. (*packages/db/*) -DB schema- No arrays/JSONs as field types coz difficult to query the data (this is DB normalization)
- **TABLES**:-
    - Users -
        - id, name, email(magic link auth/Google OAuth) , roles, board_assigned, 1-many relation with tasks, many-many relation with Orgs (maybe a separate table name members)
    - Org 
        - id, name, description, members (1-many relation with users - separate table named members ), boards_assigned
    - Members
        - id, userId (referencing to users table), orgId (referencing to org table), boardId (members assigned to a particular proj(board) )
        - contains composite primary key
    - Board (Project)
        - id, title, description, many-1 relation with an Org, 
        - members_assigned_to_the_board (many-many relation with Users - 1 board-many users, 1 user-many boards based on user role)
    - Tasks
        - id, title, description
        - boardId (many-1 relation with board)
        - (many-many relation with users:- 
            - 1 user-many tasks
            - 1 task -many users  
                -> table task_mapping (id, userId, taskId))
    - Section 
        - id, title (ENUMS) : state of task - upcoming, in_progres, done -> by default
        - boardId (which tasks are in which board), 
        - 1-many relation with tasks (1 section can have many tasks, 1 task can have only 1 section) -> ondelete:"restrict"
    
    - Comments - conversation of members on a particular tasks

- **Relations**
    - 1-many for tasks-comments -> 1 tasks can have many comments, 1 comment can belong to only 1 tasks
    - 1-many for tasks-sections -> 1 tasks can belong to 1 
    - many-many relation b/w users-orgs-> 1 user many orgs, 1 org -many users
    - 1-many for boards-tasks -> 1 board can have many tasks
    - many-many relation b/w users-tasks-> 1 user many tasks, 1 task -many users


2. *apps/backend*- flow -> api call -> controller -> service -> repository -> DB

3. *apps/websockets* - create all the real time features (comments , real time card movements, active users)