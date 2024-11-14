import { profanity } from '@2toad/profanity';

export interface FeedbackProps {
  message: string | null;
  isValid: boolean;
}

export const validateUsername = (username: string) => {
  const feedback: FeedbackProps = {
    message: null,
    isValid: true,
  };

  if (!username) {
    feedback.message = 'Username cannot be blank';
    feedback.isValid = false;
  }

  // tell user 20 is the max, but still valid
  if (username.length === 20) {
    feedback.message = 'Username cannot be more than 20 characters';
    feedback.isValid = true;
  }

  if (username.length < 5) {
    feedback.message = 'Username must be at least 4 characters';
    feedback.isValid = false;
  }

  if (profanity.exists(username)) {
    feedback.message = 'Username cannot include profanity';
    feedback.isValid = false;
  }

  return feedback;
};
