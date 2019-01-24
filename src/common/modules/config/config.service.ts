import * as Joi from 'joi';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService {

    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    get port(): boolean {
        return Boolean(this.envConfig.PORT);
    }

    get jwtSecret(): boolean {
        return Boolean(this.envConfig.JWT_SECRET);
    }

    get jwtExpiresIn(): boolean {
        return Boolean(this.envConfig.EXPIRES_IN);
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),
            PORT: Joi.number().default(3000),
            JWT_SECRET: Joi.string().default('nestjs-started'),
            EXPIRES_IN: Joi.number().default(36000),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
}