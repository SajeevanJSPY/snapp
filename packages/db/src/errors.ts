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

enum PostgresErrorCode {
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
    StringDataRightTruncation = '22001',
}

const HttpCodes: Record<string, string> = {
    bad_request: '400',
    not_found: '404',
    conflict: '409',
    internal_error: '500',
};

export class DatabaseError extends Error {
    constructor(
        message?: string,
        public code?: string
    ) {
        super(message);
    }

    static dataNotFoundError(message?: string): DatabaseError {
        return new DatabaseError(message ?? 'data not found', HttpCodes['not_found']);
    }

    static unknownError(message?: string): DatabaseError {
        return new DatabaseError(message ?? 'unknown_error', HttpCodes['internal_error']);
    }

    static upsertError(message?: string): DatabaseError {
        return new DatabaseError(message ?? 'upsert_error', HttpCodes['bad_request']);
    }

    static deleteError(message?: string): DatabaseError {
        return new DatabaseError(message ?? 'delete_error', HttpCodes['not_found']);
    }
    static fromPgError(err: PgError): DatabaseError {
        const table = err.table ?? 'unknown_table';

        function message(detail: string): string {
            return `${table}: ${detail}`;
        }

        switch (err.code) {
            case PostgresErrorCode.UniqueViolation:
                return new DatabaseError(
                    message(err.detail ?? 'Duplicate key'),
                    HttpCodes['conflict']
                );
            case PostgresErrorCode.CheckViolation:
                return new DatabaseError(
                    message(err.detail ?? 'Check constraint violated'),
                    HttpCodes['bad_request']
                );
            case PostgresErrorCode.StringDataRightTruncation:
                return new DatabaseError(
                    message(err.detail ?? 'Value too long'),
                    HttpCodes['bad_request']
                );
            case PostgresErrorCode.NotNullViolation:
                return new DatabaseError(
                    message(err.detail ?? 'Duplicate key'),
                    HttpCodes['bad_request']
                );
        }

        return this.unknownError();
    }
}
