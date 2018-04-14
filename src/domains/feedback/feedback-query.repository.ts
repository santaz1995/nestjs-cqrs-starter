import { Feedback } from './feedback';

export interface FeedbackQueryRepository {
    
    /**
     * @returns {Promise<Feedback[]>}
     */
    getAll(): Promise<Feedback[]>;

    /**
     * @param {Feedback} feedback
     */
    store(feedback: Feedback): Promise<Feedback>;
}