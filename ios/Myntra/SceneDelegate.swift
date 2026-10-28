import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import UIKit
import RNBootSplash

class SceneDelegate: RCTDefaultReactNativeFactoryDelegate, UIWindowSceneDelegate {
  var window: UIWindow?
  var reactNativeFactory: RCTReactNativeFactory?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = scene as? UIWindowScene else { return }

    let window = UIWindow(windowScene: windowScene)
    window.backgroundColor = .white
    window.rootViewController = UIStoryboard(
      name: "MyntraLaunchScreen", bundle: nil
    ).instantiateInitialViewController()
    self.window = window
    window.makeKeyAndVisible()

    // Present the native poster before React starts preparing its first surface.
    DispatchQueue.main.async { [weak self] in
      self?.startReactNative(connectionOptions)
    }
  }

  private func startReactNative(_ connectionOptions: UIScene.ConnectionOptions) {
    dependencyProvider = RCTAppDependencyProvider()
    reactNativeFactory = RCTReactNativeFactory(delegate: self)

    #if DEBUG
    reactNativeFactory?.devMenuConfiguration = RCTDevMenuConfiguration(
      devMenuEnabled: true,
      shakeGestureEnabled: true,
      keyboardShortcutsEnabled: true
    )
    #endif

    reactNativeFactory?.startReactNative(
      withModuleName: "Myntra",
      in: window,
      connectionOptions: connectionOptions
    )
  }

  func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    RCTLinkingManager.scene(scene, openURLContexts: URLContexts)
  }

  func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    RCTLinkingManager.scene(scene, continue: userActivity)
  }

  override func customize(_ rootView: RCTRootView) {
    super.customize(rootView)
    rootView.backgroundColor = .white
    RNBootSplash.initWithStoryboard("MyntraLaunchScreen", rootView: rootView)
  }

  override func bundleURL() -> URL? {
    #if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
