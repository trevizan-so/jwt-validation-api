import { Injectable } from '@nestjs/common';
import { ITrackingService } from './tracking.interface';

// Service e interface adicionadas para futura integração com servicos de APM
@Injectable()
export class TrackingService implements ITrackingService{
    
    constructor(){}

    public emitEvent(event: string): void {
        
    }

}