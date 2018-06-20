package com.weex.shuyu.githubapp.ui.view;

import android.view.View;

public interface IGSYWebView {
    public View getView();
    public void destroy();
    public void loadUrl(String url);
    public void loadHtml(String html);
    public void reload();
    public void goBack();
    public void goForward();
    public void setShowLoading(boolean shown);
    public void setOnErrorListener(OnErrorListener listener);
    public void setOnPageListener(OnPageListener listener);

    public interface OnErrorListener {
        public void onError(String type, Object message);
    }

    public interface OnPageListener {
        public void onReceivedTitle(String title);
        public void onPageStart(String url);
        public void onPageFinish(String url, boolean canGoBack, boolean canGoForward);
        public void shouldOverrideUrlLoading(String url);
    }
}
