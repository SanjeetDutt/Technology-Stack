package in.sanjeetdutt.M003_Singleton.P002_logger;

public interface Logger {

    void log(LogLevel level, String message);

    void setLogFile(String filePath);

    String getLogFile();

    // Flush the log entries to the file
    void flush();

    // Close the logger and release any resources
    void close();
}
