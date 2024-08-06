package in.sanjeetdutt.M006_Factory.P002_Audio_Player;

public class AudioPlayerFactory {

    public static AudioPlayer getAudioPlayer (MediaFormat mediaFormat, int volume, double playBackRate) throws IllegalAccessException {

        return switch (mediaFormat){
            case MP3 -> new MP3Player(volume, playBackRate);
            case FLAC -> new FLACPlayer(volume, playBackRate);
            case WAV -> new WAVPlayer(volume, playBackRate);
        };
    }
}
