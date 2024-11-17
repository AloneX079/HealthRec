package com.alone_x.myhealthrec;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.content.Intent;
import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.RequestBody;
import okhttp3.MediaType;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import java.io.IOException;
import javax.net.ssl.X509TrustManager;

public class MainActivity extends AppCompatActivity {
    private EditText editTextEmail, editTextPassword;
    private Button btnLogin;
    private OkHttpClient client;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        SharedPreferences sharedPreferences = getSharedPreferences("UserPrefs", MODE_PRIVATE);
        String cookie = sharedPreferences.getString("cookie", null);

        if (cookie != null) {
            // User is already logged in, proceed to the next activity
            Intent intent = new Intent(MainActivity.this, MainActivity2.class);
            startActivity(intent);
            finish();
        } else {
            // No cookie found, stay on the login screen
            editTextEmail = findViewById(R.id.editTextEmail);
            editTextPassword = findViewById(R.id.editTextPassword);
            btnLogin = findViewById(R.id.btnLogin);

            try {
                client = getSecureHttpClient();
            } catch (Exception e) {
                e.printStackTrace();
                Toast.makeText(this, "SSL Configuration Failed", Toast.LENGTH_SHORT).show();
                return; // Stop execution if SSL setup fails
            }
            // Default OkHttpClient (no SSL/TLS configuration)
            //client = new OkHttpClient();

            btnLogin.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    String email = editTextEmail.getText().toString();
                    String password = editTextPassword.getText().toString();
                    if (!email.isEmpty() && !password.isEmpty()) {
                        loginUser(email, password);
                    } else {
                        Toast.makeText(MainActivity.this, "Please enter Email and Password", Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }



        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
    private void saveCookie(String cookie) {
        SharedPreferences sharedPreferences = getSharedPreferences("UserPrefs", MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("cookie", cookie);
        editor.apply();
    }
    private OkHttpClient getSecureHttpClient() throws Exception {
        // Load the certificate
        CertificateFactory cf = CertificateFactory.getInstance("X.509");
        InputStream cert = getResources().openRawResource(R.raw.server_cert); // Place your cert in res/raw
        Certificate ca = cf.generateCertificate(cert);
        cert.close();

        // Create a KeyStore with the trusted certificate
        KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
        keyStore.load(null, null);
        keyStore.setCertificateEntry("ca", ca);

        // Create a TrustManager that trusts the KeyStore
        TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        tmf.init(keyStore);

        // Create an SSLContext using the TrustManager
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, tmf.getTrustManagers(), null);

        return new OkHttpClient.Builder()
                .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) tmf.getTrustManagers()[0])
                .build();
    }

    private void loginUser(String email, String password) {
        String url = "https://healthrec.unstablehosting.co.in:25590/api/v1/user/login";

        String jsonBody = "{ \"email\": \"" + email + "\", \"password\": \"" + password + "\" }";

        Request request = new Request.Builder()
                .url(url)
                .post(RequestBody.create(jsonBody, MediaType.parse("application/json; charset=utf-8")))
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                runOnUiThread(() -> Toast.makeText(MainActivity.this, "Login Failed: " + e.getMessage(), Toast.LENGTH_SHORT).show());
                Log.d("LoginError", e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    String cookie = response.header("Set-Cookie");
                    saveCookie(cookie);
                    runOnUiThread(() -> Toast.makeText(MainActivity.this, "Login Successful", Toast.LENGTH_SHORT).show());
                    Intent intent = new Intent(MainActivity.this,MainActivity2.class);
                    startActivity(intent);
                    finish();
                } else {
                    runOnUiThread(() -> Toast.makeText(MainActivity.this, "Login Failed. Invalid credentials.", Toast.LENGTH_SHORT).show());
                }
            }
        });
    }
}
