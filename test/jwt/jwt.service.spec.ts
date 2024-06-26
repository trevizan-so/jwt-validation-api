import request from "supertest";
import { Test } from "@nestjs/testing";

import { JwtService } from "../../src/jwt/jwt.service";
import { TEST_TOKEN_1 } from "../docs/tokens-examples";

describe("JwtService", () => {
    let jwtService: JwtService;

    beforeEach(() => {
        jwtService = new JwtService();
    });

    it("shoud validate jwt", async () => {
        const token = TEST_TOKEN_1.token;
        const result = TEST_TOKEN_1.result;
        expect(jwtService.validateJWT(token)).toBe(result);
    });
});
