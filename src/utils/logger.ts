import { format } from 'date-fns';

interface LogEntry {
  timestamp: string;
  level: 'error' | 'warn' | 'info';
  message: string;
  error?: Error;
  component?: string;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogEntry['level'], message: string, error?: Error, component?: string): LogEntry {
    return {
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'),
      level,
      message,
      error,
      component
    };
  }

  error(message: string, error?: Error, component?: string) {
    const entry = this.formatMessage('error', message, error, component);
    this.logs.push(entry);
    console.error(`[${entry.timestamp}] ERROR: ${message}`, error);
  }

  warn(message: string, error?: Error, component?: string) {
    const entry = this.formatMessage('warn', message, error, component);
    this.logs.push(entry);
    console.warn(`[${entry.timestamp}] WARN: ${message}`, error);
  }

  info(message: string, component?: string) {
    const entry = this.formatMessage('info', message, undefined, component);
    this.logs.push(entry);
    console.info(`[${entry.timestamp}] INFO: ${message}`);
  }

  getLogs(): LogEntry[] {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
}

export const logger = Logger.getInstance(); 