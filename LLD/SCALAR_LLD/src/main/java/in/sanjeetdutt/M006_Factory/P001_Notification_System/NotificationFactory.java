package in.sanjeetdutt.M006_Factory.P001_Notification_System;

public class NotificationFactory {

    public static Notification createNotification (NotificationType type, String recipient, String message, String sender ) throws IllegalAccessException {
        switch (type){
            case SMS: return new SmsNotification(recipient, message);
            case PUSH: return new PushNotification(recipient, message);
            case EMAIL: return new EmailNotification(recipient, sender, message);
            default:throw new IllegalAccessException("No valid notification type");
        }

    }
}
