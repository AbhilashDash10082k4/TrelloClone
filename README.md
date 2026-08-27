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


2. *apps/backend*- flow -> api call -> controller -> service -> repository -> DB

3. *apps/websockets* - create all the real time features (comments , real time card movements, active users)