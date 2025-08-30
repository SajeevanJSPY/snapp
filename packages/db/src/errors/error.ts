import { DatabaseError as PgError } from 'pg';

export type Ok<T> = { ok: true; value: T };
export type Err<E extends Error> = { ok: false; error: E };
export type Result<T, E extends Error = Error> = Ok<T> | Err<E>;

export function ok<T>(value: T): Ok<T> {
    return { ok: true, value };
}
export function err<E extends Error>(error: E): Err<E> {
    return { ok: false, error };
}

export enum PostgresErrorCode {
    SuccessfulCompletion = '00000',
    Warning = '01000',
    NoData = '02000',
    SqlStatementNotYetComplete = '03000',
    ConnectionException = '08000',
    SyntaxErrorOrAccessRuleViolation = '42000',
    SyntaxError = '42601',
    InsufficientPrivilege = '42501',
    UndefinedTable = '42P01',
    UndefinedColumn = '42703',
    DuplicateColumn = '42701',
    ForeignKeyViolation = '23503',
    UniqueViolation = '23505',
    CheckViolation = '23514',
    NotNullViolation = '23502',
    ExclusionViolation = '23P01',
    SerializationFailure = '40001',
    DeadlockDetected = '40P01',
}

export class DatabaseErrorFactory {
    static fromPgError(err: PgError): GenericDatabaseError {
        const fields: Record<string, any> = {
            name: err.name,
            message: err.message,
            severity: err.severity,
            code: err.code,
            detail: err.detail,
            hint: err.hint,
            position: err.position,
            internalPosition: err.internalPosition,
            internalQuery: err.internalQuery,
            where: err.where,
            schema: err.schema,
            table: err.table,
            column: err.column,
            dataType: err.dataType,
            constraint: err.constraint,
            file: err.file,
            line: err.line,
            routine: err.routine,
            stack: err.stack,
        };

        const cleanFields: Record<string, string> = {};
        for (const [key, value] of Object.entries(fields)) {
            if (value !== undefined && value !== null && value !== '') {
                cleanFields[key] = value;
            }
        }
        let details = '';
        for (const key in cleanFields) {
            details += `[${key}: ${cleanFields[key]}], `;
        }

        switch (err.code) {
            case PostgresErrorCode.UniqueViolation:
                return new DatabaseUnAuthorizedError(
                    'failed to add data because of unique constraint'
                );
            case PostgresErrorCode.NoData:
                return new DatabaseNotFoundError();
            default:
                return new UnknownDatabaseError(details);
        }
    }
}

export abstract class GenericDatabaseError extends Error {
    public abstract code: string;

    constructor(message?: string) {
        super(message);
        Error.captureStackTrace?.(this, this.constructor);
    }
    abstract toDebugError(): any;
}

export class UnknownDatabaseError extends GenericDatabaseError {
    code = 'unknown';
    constructor(message?: string) {
        super(message);
    }

    toDebugError(): any {
        return { error: 'unknown database error', stack: this.stack };
    }
}

export class DatabaseUnAuthorizedError extends GenericDatabaseError {
    code = 'unauthorized';
    constructor(message?: string) {
        super(message);
    }

    toDebugError(): any {
        return { stack: this.stack };
    }
}

export class DatabaseNotFoundError extends GenericDatabaseError {
    code = 'data_not_found';
    constructor(message?: string) {
        super(message);
    }

    toDebugError(): any {
        return { stack: this.stack };
    }
}
