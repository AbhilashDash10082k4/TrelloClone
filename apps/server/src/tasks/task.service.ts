// apps/server/src/tasks/task.service.ts
import { db } from "@repo/db";
import { AppError } from "../errors/AppError";

//chks hierarchy of task before changing it
export class Task {
  async getTaskInOrg(taskId: string, orgId: string) {
    const plan = db.sql.public.Task.innerJoin(db.sql.public.Section, (f, fns) =>
      fns.eq(f.Task.sectionId, f.Section.id),
    )
      .innerJoin(db.sql.public.Board, (f, fns) =>
        fns.eq(f.Section.boardId, f.Board.id),
      )
      .innerJoin(db.sql.public.Project, (f, fns) =>
        fns.eq(f.Board.projectId, f.Project.id),
      )
      .innerJoin(db.sql.public.Org, (f, fns) =>
        fns.eq(f.Project.orgId, f.Org.id),
      )
      .select((f) => ({
        taskId: f.Task.id,
        taskTitle: f.Task.title,
        sectionId: f.Section.id,
        boardId: f.Board.id,
        projectId: f.Project.id,
        orgId: f.Org.id,
      }))
      .where((f, fns) =>
        fns.and(fns.eq(f.Task.id, taskId), fns.eq(f.Org.id, orgId)),
      )
      .build();

    const rows = await db.runtime().execute(plan);

    return rows[0] ?? null;
  }
  async assertTaskBelongsToOrg(taskId: string, orgId: string) {
    const tasks = await db.orm.public.Task.where({ id: taskId }).all();

    const task = tasks[0];

    if (!task) {
      throw new AppError(404, "TASK_NOT_FOUND", "Task not found");
    }

    const sections = await db.orm.public.Section.where({
      id: task.sectionId,
    }).all();

    const section = sections[0];

    if (!section) {
      throw new AppError(404, "TASK_NOT_FOUND", "Task not found");
    }

    const boards = await db.orm.public.Board.where({
      id: section.boardId,
    }).all();

    const board = boards[0];

    if (!board) {
      throw new AppError(404, "TASK_NOT_FOUND", "Task not found");
    }

    const projects = await db.orm.public.Project.where({
      id: board.projectId,
    }).all();

    const project = projects[0];

    if (!project || project.orgId !== orgId) {
      // Don't disclose that a task exists in another organization.
      throw new AppError(404, "TASK_NOT_FOUND", "Task not found");
    }

    return task;
  }
}
