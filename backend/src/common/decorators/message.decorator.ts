import { SetMetadata } from '@nestjs/common';

export const MESSAGE = 'message' as const;

export const Message = (message: string) => {
  return SetMetadata(MESSAGE, message ?? 'The operation was sucessful.');
};
