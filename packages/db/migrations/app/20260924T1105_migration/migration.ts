#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0abbafb354b90e5e9b29c590f3778ef25b78db4ef86080318609eb901022eeaa/contract';
import startContract from '../../snapshots/0abbafb354b90e5e9b29c590f3778ef25b78db4ef86080318609eb901022eeaa/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/169e1a7bbc0f59bb701403139f8b3385bef32a85aa729d6219af83fa45f7c3dd/contract';
import endContract from '../../snapshots/169e1a7bbc0f59bb701403139f8b3385bef32a85aa729d6219af83fa45f7c3dd/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropDefault({ schema: 'public', table: 'project', column: 'updatedAt' }),
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
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
