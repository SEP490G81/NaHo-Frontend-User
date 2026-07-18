import { FileResponse } from "./file.response";

export interface LeagueResponse {
    id: number;
    iconFile: FileResponse;
    name: string;
    description: string;
    minPoint: number;
    maxPoint: number;
}
