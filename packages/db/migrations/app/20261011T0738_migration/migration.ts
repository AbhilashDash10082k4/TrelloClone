#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/817cb0390fac6f55c2d505b3c1eda25b395330adb13b608b585b58d42c6f960f/contract';
import startContract from '../../snapshots/817cb0390fac6f55c2d505b3c1eda25b395330adb13b608b585b58d42c6f960f/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/da4bfd2a58404bc3d38f9fb2223066fd97a22b9f690d83d9f6e723ccee4f3f2a/contract';
import endContract from '../../snapshots/da4bfd2a58404bc3d38f9fb2223066fd97a22b9f690d83d9f6e723ccee4f3f2a/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('clerkUserId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_clerkUserId_key',
        columns: ['clerkUserId'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
