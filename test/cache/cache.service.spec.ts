import request from "supertest";
import { Test } from "@nestjs/testing";
import { Cache } from "cache-manager";
import { TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { CacheService } from "../../src/cache/cache.service";
import { INestApplication } from "@nestjs/common";

describe("CacheService", () => {
    let cacheService: CacheService;
    let app: INestApplication;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
          }).compile();
          app = moduleRef.createNestApplication();
          await app.init();
          cacheService = moduleRef.get(CacheService);

        
    });
    it("shoud retrive data using key", async () => {
        let key = "jwt:token";
        expect(cacheService.findKey(key)).toBeDefined();
    });
});
