import { WithId } from '../../lib/utils';

export interface Comment extends WithId {
    by: string;
    score: number;
    time: number;
    text: string;
}