import { AuthenticationService } from '../authentication.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthenticationController } from '../authentication.controller';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import mockedUser from './user.mock';
import User from '../../components/users/entity/user.entity';
import { UsersService } from '../../components/users/users.service';
import mockedJwtService from '../../utils/mocks/jwt.service';
import mockedConfigService from '../../utils/mocks/config.service';
import { PassportModule } from '@nestjs/passport';
import * as passport from 'passport';
import MockStrategy from 'passport-mock-strategy';

describe('The AuthenticationController', () => {
  let app: INestApplication;
  let userData: User;
  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };
    const usersRepository = {
      create: jest.fn().mockResolvedValue(userData),
      save: jest.fn().mockReturnValue(Promise.resolve()),
    };
    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        PassportModule,
        UsersService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  describe('When login', () => {
    describe('and using valid data', () => {
      it('should response with user data', () => {
        passport.use('local', new MockStrategy());
        return request(app.getHttpServer())
          .post('/authentication/log-in')
          .expect(200);
      });
    });
  });
  describe('when registering', () => {
    describe('and using valid data', () => {
      it('should respond with the data of the user without the password', () => {
        const expectedData = {
          ...userData,
        };
        delete expectedData.password;
        return request(app.getHttpServer())
          .post('/authentication/register')
          .send({
            email: mockedUser.email,
            name: mockedUser.name,
            password: 'strongPassword',
          })
          .expect(201)
          .expect(expectedData);
      });
    });
    describe('and using invalid data', () => {
      it('should throw an error', () => {
        return request(app.getHttpServer())
          .post('/authentication/register')
          .send({
            name: mockedUser.name,
          })
          .expect(400);
      });
    });
  });
});
