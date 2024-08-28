"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = exports.UPDATE_EMAIL = exports.USER_REGISTERED = exports.EMAIL_QUEUE = void 0;
const bull_1 = require("@nestjs/bull");
const mailer_1 = require("@nestjs-modules/mailer");
exports.EMAIL_QUEUE = 'email-queue';
exports.USER_REGISTERED = 'user-registered';
exports.UPDATE_EMAIL = 'update-email';
let EmailService = class EmailService {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async userRegistered(job) {
        const subject = `Welcome to nexus app! dear, ${job.data.username}`;
        await this.emailService.sendMail({
            to: job.data.email,
            subject,
            html: `<div> 
        <h4>nexus app!</h4>
        Otp Code : ${job.data.otp}
      </div>`,
        });
    }
    async updateEmail(job) {
        const subject = `email change request`;
        await this.emailService.sendMail({
            to: job.data.email,
            subject,
            html: `
      <div> nexus app
      <h4> otp code : ${job.data.otp}
      </div>
      `,
        });
    }
};
exports.EmailService = EmailService;
__decorate([
    (0, bull_1.Process)(exports.USER_REGISTERED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailService.prototype, "userRegistered", null);
__decorate([
    (0, bull_1.Process)(exports.UPDATE_EMAIL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailService.prototype, "updateEmail", null);
exports.EmailService = EmailService = __decorate([
    (0, bull_1.Processor)(exports.EMAIL_QUEUE),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map