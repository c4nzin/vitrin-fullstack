import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PUBLIC = 'public';

export const PublicRoute = (): CustomDecorator<string> => {
  return SetMetadata<string, boolean>(PUBLIC, true);
};
