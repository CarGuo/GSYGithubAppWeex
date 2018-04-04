package com.weex.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_splash);
    new Handler().postDelayed(new Runnable() {
      @Override
      public void run() {
        Intent intent = new Intent(SplashActivity.this, WXPageActivity.class);
        Uri data = getIntent().getData();
        if (data != null) {
          intent.setData(data);
        }
        intent.putExtra("from", "splash");
        startActivity(intent);
        finish();
      }
    }, 1500);
  }
}
