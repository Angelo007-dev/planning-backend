import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { Request, Response } from 'express';
import * as process from "process";

@Catch() // Capture toutes les exceptions
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | object = 'Internal server error';
        let details: any = null;

        // Gestion des exceptions spécifiques
        if (exception instanceof UnauthorizedException) {
            // Cas 1: Unauthorized (401)
            status = HttpStatus.UNAUTHORIZED;
            message = exception.getResponse() || 'Unauthorized access';
            details = typeof exception.getResponse() === 'object' ? exception.getResponse() : null;
        } else if (exception instanceof BadRequestException) {
            // Cas 2: Bad Request (400)
            status = HttpStatus.BAD_REQUEST;
            message = exception.getResponse() || 'Invalid request';
            details = typeof exception.getResponse() === 'object' ? exception.getResponse() : null;
        }
        else if (exception instanceof NotFoundException) {
            // Cas 2: Bad Request (400)
            status = HttpStatus.BAD_REQUEST;
            message = exception.getResponse() || 'Invalid request';
            details = typeof exception.getResponse() === 'object' ? exception.getResponse() : null;
        }
        else if (exception instanceof HttpException) {
            // Cas 3: Autres exceptions HTTP
            status = exception.getStatus();
            message = exception.getResponse();
        } else if (exception instanceof EntityNotFoundError) {
            // Cas 4: Entité non trouvée (TypeORM)
            const entityNameMatch = exception.message.match(/"([^"]+)"/);
            const entityName = entityNameMatch ? entityNameMatch[1] : 'Entity';
            status = HttpStatus.NOT_FOUND;
            message = `${entityName} not found`;
        } else {
            // Cas 5: Erreurs non gérées
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'An unexpected error occurred';
            details = process.env.NODE_ENV === 'dev' ? exception.stack : null;
        }

        // Normalisation du message d'erreur
        const errorMessage = typeof message === 'string' ? message : (message as any).message || 'Error occurred';
        if((errorMessage !== 'An unexpected error occurred' ||  errorMessage !== 'Error occurred')) {
            details = undefined
        }
        // Structure de la réponse API
        response.status(status).json({
            success: false,
            error: {
                statusCode: status,
                message: errorMessage,
                details: details || undefined, // Détails inclus seulement s'ils existent
            },
            timestamp: new Date().toISOString(),
            path: process.env.BASE_URL+request.url,
        });
    }
}