export class VerifyOtpCommand {
  constructor(
    public readonly email: string,
    public readonly otpCode: string,
  ) {}
}
