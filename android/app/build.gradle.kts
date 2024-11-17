plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "com.alone_x.myhealthrec"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.alone_x.myhealthrec"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
}

dependencies {
    implementation(libs.appcompat)  // Make sure this is properly defined in your 'libs.versions.toml'
    implementation(libs.material)  // Same here
    implementation(libs.activity)  // Same here
    implementation(libs.constraintlayout)  // Same here

    implementation ("com.github.yuriy-budiyev:code-scanner:2.3.0")

    // OkHttp for network requests
    implementation("com.squareup.okhttp3:okhttp:4.10.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.10.0")

    // CameraX dependencies (all at 1.5.0)
    implementation("androidx.camera:camera-core:1.4.0")
    implementation("androidx.camera:camera-view:1.4.0")
    implementation("androidx.camera:camera-lifecycle:1.4.0")

    // Testing dependencies
    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
}