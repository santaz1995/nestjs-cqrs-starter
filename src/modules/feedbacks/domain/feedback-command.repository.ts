import { Feedback } from './feedback';

export interface FeedbackCommandRepository {
    
    /**
     * @param {Feedback} feedback
     */
    store(feedback: Feedback): Promise<Feedback>;
}