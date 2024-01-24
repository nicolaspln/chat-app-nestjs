import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config, database, up } from 'migrate-mongo';
import * as path from 'path';

@Injectable()
export class DbMigrationService implements OnModuleInit {
  private readonly dbMigrationConfig: Partial<config.Config> = {
    mongodb: {
      databaseName: this.configService.get('MONGODB_NAME'),
      url: this.configService.get('MONGODB_URI'),
    },
    changelogCollectionName: 'changelog',
    migrationFileExtension: '.js',
    migrationsDir: path.join(__dirname, '..', '..', 'migrations'),
  };

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    config.set(this.dbMigrationConfig);
    const { db, client } = await database.connect();
    await up(db, client);
  }

  async migrate() {}
}
