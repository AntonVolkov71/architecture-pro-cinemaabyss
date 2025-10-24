import * as dotenv from 'dotenv';

dotenv.config();

class Config {
    portApp(): number {
        return Number(process.env.PORT) || 8000;
    }

    urlApi(): string {
        return '/api'
    }

    urlHealth(): string {
        return '/health'
    }

    monolithUrl(): string {
        return process.env.MONOLITH_URL || "http://localhost:8080"
    }

    moviesServiceUrl(): string {
        return process.env.MOVIES_SERVICE_URL || "http://localhost:8081"
    }

    eventServiceUrl(): string {
        return process.env.EVENTS_SERVICE_URL || "http://localhost:8082"
    }

    gradualMigration(): boolean {
        const gradualMigration = process.env.GRADUAL_MIGRATION || "";

        return gradualMigration.toLowerCase() === "true"
    }

    moviesMigrationPercent(): number {
        return Number(process.env.MOVIES_MIGRATION_PERCENT) || 0;
    }
}

export default new Config();