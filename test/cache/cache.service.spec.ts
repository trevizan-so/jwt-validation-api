import request from "supertest";
import { Test } from "@nestjs/testing";

import { CacheService } from "../../src/cache/cache.service";

describe("CacheService", () => {
    let cacheService: CacheService;

    beforeEach(() => {
        cacheService = new CacheService();
    });
    it("shoud retrive data using key", async () => {
        let key = "jwt:token";
        expect(cacheService.findKey(key)).toBeDefined();
    });
});
