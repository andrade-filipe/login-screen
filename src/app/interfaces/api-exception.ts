import { HttpStatusCode } from '@angular/common/http';

export interface ApiException {
    type: string;
    title: string;
    detail?: string;
    status: HttpStatusCode;
    instance: string;
}
