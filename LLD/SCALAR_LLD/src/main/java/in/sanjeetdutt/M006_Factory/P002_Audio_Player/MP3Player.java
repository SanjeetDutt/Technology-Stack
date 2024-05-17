package in.sanjeetdutt.M006_Factory.P002_Audio_Player;

public class MP3Player extends AudioPlayer {


    public MP3Player(int volume, double playBackRate) {
        super(volume, playBackRate);
    }

    public void play() {
        // Simulate playing audio in FLAC format
        // Each media format will have its own implementation
        System.out.println("Playing MP3 audio");
    }

    public void pause() {
        // Simulate pausing audio in FLAC format
        // Each media format will have its own implementation
        System.out.println("Pausing MP3 audio");
    }

    public void stop() {
        // Simulate stopping audio in FLAC format
        // Each media format will have its own implementation
        System.out.println("Stopping MP3 audio");
    }

    public MediaFormat supportsType() {
        return MediaFormat.MP3;
    }
}
