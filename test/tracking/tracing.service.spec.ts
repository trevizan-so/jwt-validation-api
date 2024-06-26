import request from "supertest";
import { Test } from "@nestjs/testing";
import { TrackingService } from "../../src/tracking/tracking.service";

describe("TrackingService", () => {
    let trackingService: TrackingService;

    beforeEach(() => {
        trackingService = new TrackingService();
    });

    it("shoud emit event", async () => {
        const trackingEvent = "JWT_VALIDATION:SUCCESS";
        const handle = jest.spyOn(TrackingService.prototype,"emitEvent");
        trackingService.emitEvent(trackingEvent)
        expect(handle).toHaveBeenCalled();
    });
});
