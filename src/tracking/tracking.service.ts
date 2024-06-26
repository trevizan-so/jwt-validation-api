import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITrackingService } from './tracking.interface';


@Injectable()
export class TrackingService implements ITrackingService{
    
    constructor(){}

    public emitEvent(event: string): void {
        
    }

}