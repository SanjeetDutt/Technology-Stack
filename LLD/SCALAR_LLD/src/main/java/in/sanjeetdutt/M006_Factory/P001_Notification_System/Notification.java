package in.sanjeetdutt.M006_Factory.P001_Notification_System;

public abstract class Notification {

    private String recipient;
    private String message;

    public Notification(String recipient,String message) {
        this.recipient = recipient;
        this.message = message;
    }

    public abstract NotificationType notificationType();

}
