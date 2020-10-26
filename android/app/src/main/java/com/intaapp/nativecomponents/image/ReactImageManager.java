package com.intaapp.nativecomponents.image;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ImageResizeMode;
import com.intaapp.utilities.ImagesUtilities;
import com.intaapp.utilities.models.Image;

import java.util.Map;

public class ReactImageManager extends SimpleViewManager<CustomImageView> {

    ReactApplicationContext mCallerContext;
    private float currentBright;
    private float currentSat;
    private float currentContrast;

    public ReactImageManager(ReactApplicationContext context) {
        mCallerContext = context;
        currentBright = 0;
        currentContrast = 1;
        currentSat = 1;
    }

    @NonNull
    @Override
    public String getName() {
        return "CustomImage";
    }

    @NonNull
    @Override
    protected CustomImageView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new CustomImageView(reactContext, Fresco.newDraweeControllerBuilder(), null, mCallerContext);
    }

    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "onSave",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onSave")))
                .build();
    }

    @ReactProp(name = "src")
    public void setSrc(CustomImageView view, @Nullable ReadableMap image) {
        Image img = new Image(image.getInt("height"),image.getInt("width"),image.getArray("source"));
        view.setImageSource(img);
        Log.i("OBJECT", image.toString());
    }

    @ReactProp(name = "brightness")
    public void setBrightness(CustomImageView view, @Nullable float brightness) {
	// Log.d("FILTER", brightness);
	currentBright = brightness;
	view.applyFilter(brightness,currentContrast,currentSat);
    }

    @ReactProp(name = "saturation")
    public void setSaturation(CustomImageView view, @Nullable float saturation) {
	// Log.d("FILTER", saturation);
	currentSat = saturation;
	view.applyFilter(currentBright,currentContrast,saturation);
    }

    @ReactProp(name = "contrast")
    public void setContrast(CustomImageView view, @Nullable float contrast) {
	// Log.d("FILTER", contrast);
	currentContrast = contrast;
	view.applyFilter(currentBright, contrast, currentSat);
    }

    @ReactProp(name = ViewProps.RESIZE_MODE)
    public void setResizeMode(CustomImageView view, @Nullable String resizeMode) {
        view.setScaleType(ImageResizeMode.toScaleType(resizeMode));
    }

    @ReactProp(name = "saveImage")
    public void saveImage(CustomImageView view, @Nullable boolean save) {
        if (save) {
            view.saveImageToStorage();
	    view.clearColorFilter();
        }
    }


}
