#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0abbafb354b90e5e9b29c590f3778ef25b78db4ef86080318609eb901022eeaa/contract';
import startContract from '../../snapshots/0abbafb354b90e5e9b29c590f3778ef25b78db4ef86080318609eb901022eeaa/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/7f22a2fcf8dc3a88ac4961a30b043055b12c550f198f081bc40f373f9ddbf11c/contract';
import endContract from '../../snapshots/7f22a2fcf8dc3a88ac4961a30b043055b12c550f198f081bc40f373f9ddbf11c/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropDefault({ schema: 'public', table: 'board', column: 'updatedAt' }),
      this.dropDefault({ schema: 'public', table: 'comment', column: 'updatedAt' }),
      this.dropDefault({ schema: 'public', table: 'org', column: 'updatedAt' }),
      this.dropDefault({ schema: 'public', table: 'project', column: 'updatedAt' }),
      this.dropDefault({ schema: 'public', table: 'section', column: 'updatedAt' }),
      this.dropDefault({ schema: 'public', table: 'task', column: 'updatedAt' }),
      this.dropDefault({ schema: 'public', table: 'user', column: 'updatedAt' }),
      this.addColumn({
        schema: 'public',
        table: 'project',
        column: col('endDate', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'project',
        column: col('startDate', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'taskMapping',
        column: col('updatedAt', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.dataTransform(endContract, 'backfill-taskMapping-updatedAt', {
        check: () => placeholder('backfill-taskMapping-updatedAt:check'),
        run: () => placeholder('backfill-taskMapping-updatedAt:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'taskMapping', column: 'updatedAt' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
