import request from "supertest";
import { Test } from "@nestjs/testing";

import { JwtService } from "../../src/jwt/jwt.service";
import { TEST_TOKEN_1, TEST_TOKEN_2 } from "../docs/tokens-examples";

describe("JwtService", () => {
    let jwtService: JwtService;

    beforeEach(() => {
        jwtService = new JwtService();
    });

    it("shoud validate jwt with true", async () => {
        const token = TEST_TOKEN_1.token;
        const result = TEST_TOKEN_1.result;
        expect(await jwtService.validateJWT(token)).toBe(result);
    });

    it("shoud validate jwt with false", async () => {
        const token = TEST_TOKEN_2.token;
        const result = TEST_TOKEN_2.result;
        expect(await jwtService.validateJWT(token)).toBe(result);
    });
});
