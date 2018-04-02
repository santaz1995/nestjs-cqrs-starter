import { Feedback } from './feedback';

export interface FeedbackRepository {

    /**
     * @param {Feedback} feedback
     */
    store(feedback: Feedback): Promise<Feedback>;
}