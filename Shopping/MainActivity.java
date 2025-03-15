import com.unity3d.player.UnityPlayerActivity;
import android.content.Intent;

public class MainActivity extends ReactActivity {
    public void openUnity() {
        Intent intent = new Intent(this, UnityPlayerActivity.class);
        startActivity(intent);
    }
}
