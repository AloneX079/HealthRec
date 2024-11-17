package com.alone_x.myhealthrec;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.budiyev.android.codescanner.CodeScanner;
import com.budiyev.android.codescanner.CodeScannerView;
import com.budiyev.android.codescanner.DecodeCallback;
import com.google.zxing.Result;
import java.io.IOException;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.RequestBody;
import okhttp3.MediaType;


public class MainActivity2 extends AppCompatActivity {
    private CodeScanner mCodeScanner;

    private OkHttpClient client;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);
        CodeScannerView scannerView = findViewById(R.id.scanner_view);
        mCodeScanner = new CodeScanner(this, scannerView);
        mCodeScanner.setDecodeCallback(new DecodeCallback() {
            @Override
            public void onDecoded(@NonNull final Result result) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
//                        Toast.makeText(MainActivity2.this, result.getText(), Toast.LENGTH_SHORT).show();
                        String docobjid = result.getText();
                        sendQRCodeToApi(docobjid);
                    }
                });
            }
        });
        scannerView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mCodeScanner.startPreview();
            }
        });
        try {
            client = getSecureHttpClient();
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(this, "SSL Configuration Failed", Toast.LENGTH_SHORT).show();
            return; // Stop execution if SSL setup fails
        }
//        client = new OkHttpClient();

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

    }
    @Override
    protected void onResume() {
        super.onResume();
        mCodeScanner.startPreview();
    }

    @Override
    protected void onPause() {
        mCodeScanner.releaseResources();
        super.onPause();
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

    private void sendQRCodeToApi(String qrString) {
        String url = "https://healthrec.unstablehosting.co.in:25590/api/v1/user/doc-qr";  // Replace with your actual API URL
        String jsonBody = "{ \"docobjid\": \"" + qrString + "\" }";

        SharedPreferences sharedPreferences = getSharedPreferences("UserPrefs", MODE_PRIVATE);
        String cookie = sharedPreferences.getString("cookie", "");


        Request request = new Request.Builder()
                .url(url)
                .addHeader("Cookie", cookie)
                .post(RequestBody.create(jsonBody, MediaType.parse("application/json; charset=utf-8")))
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                runOnUiThread(() -> {
                    Toast.makeText(MainActivity2.this, "Request Failed: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                });
                Log.d("QRScanError", "Request Failed: " + e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    String responseBody = response.body().string();
                    runOnUiThread(() -> {
                        Toast.makeText(MainActivity2.this, "QR Data Sent Successfully", Toast.LENGTH_SHORT).show();
                    });
                    Log.d("QRScanSuccess", "Response: " + responseBody);
                } else {
                    runOnUiThread(() -> {
                        Toast.makeText(MainActivity2.this, "API Request Failed: " + response.message(), Toast.LENGTH_SHORT).show();
                    });
                    Log.d("QRScanError", "API Request Failed: " + response.message());
                }
            }
        });
    }
}
