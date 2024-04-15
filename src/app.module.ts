import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        AuthModule,
        JwtModule.register({
            secret: 'admin12',
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtAuthGuard)
            .exclude({ path: 'auth/login', method: RequestMethod.POST })
            .forRoutes('*');
    }
}
