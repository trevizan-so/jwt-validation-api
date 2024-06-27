import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

import { TEST_TOKEN_1, TEST_TOKEN_2,TEST_TOKEN_3, TEST_TOKEN_4 } from '../docs/tokens-examples';
import { AuthGuard } from '../../src/auth/auth.guard';
import { ConfigService } from '@nestjs/config';


describe('ValidationController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jest.spyOn(ConfigService.prototype, "get").mockImplementation((key)=>{
      if(key == "BASIC_TOKEN"){
        return "TEST_TOKEN"
      }
    });
  });

  it('(GET) /validation with query Param', () => {
    return request(app.getHttpServer())
      .get('/validation')
      .query({
        jwt:TEST_TOKEN_1.token
      })
      .set({
        authorization: "Bearer TEST_TOKEN" 
      })
      .expect(res=>{
        expect(res.body.valido).toBe("verdadeiro")
      })
      .expect(200)
  });


  it('(POST) /validation Test1', () => {
    return request(app.getHttpServer())
      .post('/validation')
      .set({
        authorization: "Bearer TEST_TOKEN" 
      })
      .send({
        jwt:TEST_TOKEN_1.token
      })
      .expect(res=>{
        expect(res.body.valido).toBe("verdadeiro")
      })
      .expect(200)
  });

  it('(POST) /validation Test1', () => {
    return request(app.getHttpServer())
      .post('/validation')
      .set({
        authorization: "Bearer TEST_TOKEN" 
      })
      .send({
        jwt:TEST_TOKEN_2.token
      })
      .expect(res=>{
        expect(res.body.valido).toBe("falso")
      })
      .expect(200)
  });

  it('(POST) /validation Test2', () => {
    return request(app.getHttpServer())
      .post('/validation')
      .set({
        authorization: "Bearer TEST_TOKEN" 
      })
      .send({
        jwt:TEST_TOKEN_3.token
      })
      .expect(res=>{
        expect(res.body.valido).toBe("falso")
      })
      .expect(200)
  });

  it('(POST) /validation Test1', () => {
    return request(app.getHttpServer())
      .post('/validation')
      .set({
        authorization: "Bearer TEST_TOKEN" 
      })
      .send({
        jwt:TEST_TOKEN_4.token
      })
      .expect(res=>{
        expect(res.body.valido).toBe("falso")
      })
      .expect(200)
  });
});
