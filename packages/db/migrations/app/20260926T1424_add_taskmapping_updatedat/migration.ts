#!/usr/bin/env -S node
import type { Contract as Start } from "../../snapshots/169e1a7bbc0f59bb701403139f8b3385bef32a85aa729d6219af83fa45f7c3dd/contract";
import startContract from "../../snapshots/169e1a7bbc0f59bb701403139f8b3385bef32a85aa729d6219af83fa45f7c3dd/contract.json" with { type: "json" };
import type { Contract as End } from "../../snapshots/7f22a2fcf8dc3a88ac4961a30b043055b12c550f198f081bc40f373f9ddbf11c/contract";
import endContract from "../../snapshots/7f22a2fcf8dc3a88ac4961a30b043055b12c550f198f081bc40f373f9ddbf11c/contract.json" with { type: "json" };
import { Migration, MigrationCLI, col } from "@prisma/orm-postgres/migration";
import postgres from "@prisma/orm-postgres/runtime";
import "temporal-polyfill/full/global";
import "temporal-polyfill/types/global";
const { sql: db, contract } = postgres<End>({ contractJson: endContract });

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropDefault({
        schema: "public",
        table: "board",
        column: "updatedAt",
      }),
      this.dropDefault({
        schema: "public",
        table: "comment",
        column: "updatedAt",
      }),
      this.dropDefault({ schema: "public", table: "org", column: "updatedAt" }),
      this.dropDefault({
        schema: "public",
        table: "section",
        column: "updatedAt",
      }),
      this.dropDefault({
        schema: "public",
        table: "task",
        column: "updatedAt",
      }),
      this.dropDefault({
        schema: "public",
        table: "user",
        column: "updatedAt",
      }),
      this.addColumn({
        schema: "public",
        table: "taskMapping",
        column: col("updatedAt", "timestamptz", {
          codecRef: { codecId: "pg/timestamptz-temporal@1" },
        }),
      }),
      this.dataTransform(contract, "backfill-taskMapping-updatedAt", {
        check: () =>
          db.public.taskMapping
            .select("id")
            .where((f, fns) => fns.eq(f.updatedAt, null))
            .limit(1),
        run: () =>
          db.public.taskMapping
            .update({ updatedAt: Temporal.Now.instant() })
            .where((f, fns) => fns.eq(f.updatedAt, null)),
      }),
      this.setNotNull({
        schema: "public",
        table: "taskMapping",
        column: "updatedAt",
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
