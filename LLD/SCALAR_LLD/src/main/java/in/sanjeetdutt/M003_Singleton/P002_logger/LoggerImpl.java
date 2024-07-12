package in.sanjeetdutt.M003_Singleton.P002_logger;

import java.io.*;
import java.time.LocalDateTime;

public class LoggerImpl implements Logger {

    static volatile Logger logger;
    private PrintWriter printWriter;
    private String filePath;

    private LoggerImpl() {}

    public static Logger getInstance(){
        if(logger == null){
            synchronized (Logger.class){
                if(logger == null){
                    logger = new LoggerImpl();
                }
            }
        }

        return logger;
    }

    public static void resetInstance(){
        logger = null;
    }

    @Override
    public void log(LogLevel level, String message) {
        if(printWriter == null) {
            throw new IllegalStateException("Logger is not initialized in setLogFile()");
        }
        String logMessage = "DateTime: " + LocalDateTime.now() + "LogLevel: " + level + "message: " + message;
        printWriter.println(logMessage);

    }

    @Override
    public void setLogFile(String filePath) {
        try {
            this.filePath = filePath;
            printWriter = new PrintWriter(new FileWriter(this.filePath, true));
        } catch(IOException e) {
            e.printStackTrace();
            System.out.println("Invalid file path.");
        }
    }

    @Override
    public String getLogFile() {
        return filePath;
    }

    @Override
    public void flush() {
        if(printWriter != null)
            printWriter.flush();
    }

    @Override
    public void close() {
        if(printWriter != null) {
            printWriter.close();
            printWriter = null;
        }
    }
}
