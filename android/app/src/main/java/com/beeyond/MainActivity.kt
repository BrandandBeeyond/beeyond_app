package com.beeyond

import android.os.Bundle
import com.zoontek.rnbootsplash.RNBootSplash
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.widget.ImageView

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Beeyond"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.BootTheme)
    super.onCreate(savedInstanceState)

    window.decorView.post {
      val logo = findViewById<ImageView>(R.id.bootsplash_logo)
      logo?.apply {
        alpha = 0f
        scaleX = 0.8f
        scaleY = 0.8f

        animate()
          .alpha(1f)
          .scaleX(1f)
          .scaleY(1f)
          .setDuration(500)
          .setStartDelay(100)
          .start()
      }
    }
  }
}
