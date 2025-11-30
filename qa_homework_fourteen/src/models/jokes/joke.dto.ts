export interface JokeDto {
    id: number;
    type: string;
    setup: string;
    punchline: string;
}

export type JokeListDto = JokeDto[];
