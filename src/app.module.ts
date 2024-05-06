import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([
      {
        name: 'short', // name = identifier for the rate limiter
        ttl: 1000, // ttl = time to live (in seconds)
        limit: 3, // limit = number of requests per ttl
      },
      {
        name: 'long', // name = identifier for the rate limiter
        ttl: 6000, // ttl = time to live (in seconds)
        limit: 100, // limit = number of requests per ttl
      },
    ]),
    MyLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD', // APP_GUARD is a special token that tells Nest to use the ThrottlerGuard globally
      useClass: ThrottlerGuard, // ThrottlerGuard is the class that implements the rate limiting logic
    },
  ],
})
export class AppModule {}
