import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GraphQLModule.forRoot({ debug: true, playground: true }), UserModule, AuthModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
