---
author: Yug Jadvani
pubDatetime: 2024-09-04T03:22:24Z
title: Mastering Video Playback in React Native - A Journey Through Building a Custom Video Player
slug: mastering-video-playback-in-react-native-a-journey-through-building-a-custom-video-player
featured: true
draft: false
tags:
  - reactnative
  - Videoplayer
  - Appdevelopment
  - Mobiledevelopment
description: In the world of app development, multimedia capabilities are not just a luxury — they’re a necessity. From social media platforms to educational apps, integrating video playback can significantly enhance user experience.
image: ./images/video-player.webp
---

In the world of app development, multimedia capabilities are not just a luxury — they’re a necessity. From social media platforms to educational apps, integrating video playback can significantly enhance user experience. Today, I want to take you on a journey to create a robust video player in React Native, complete with play/pause, seek, mute/unmute, and fullscreen functionalities. But before we dive into the code, let’s start with a story.

## Table of contents

## The Power of Video: A Real-Life Story

A few years ago, I worked on a project for a small e-learning startup. Their goal was simple yet ambitious: to provide accessible education to underprivileged students through mobile apps. However, they faced a challenge — keeping students engaged. Text and images weren’t enough; they needed video content.

I vividly remember the day we launched our first video lesson. The students’ engagement skyrocketed. They could now see their teachers explaining concepts, which made learning more interactive and effective. This experience taught me the true power of integrating video into apps, and I’ve been passionate about it ever since.

## Building Your Own React Native Video Player

Let’s translate this passion into a practical tutorial. By the end of this post, you’ll have a fully functional video player in your React Native app. Here’s how to do it.

---

## How to Create a React Native App Using CLI

Before we dive into building our video player, we need to set up a React Native project. Here’s how you can create a React Native app using the React Native CLI.

### Step 1: Create a New React Native Project

With the React Native CLI installed, you can create a new React Native project by running:

```bash
npx react-native init VideoPlayerApp
```

This command will create a new directory named `VideoPlayerApp` with all the necessary boilerplate code.

### Step 2: Navigate to Your Project Directory

Change your directory to the newly created project:

```bash
cd VideoPlayerApp
```

### Step 3: Start the Development Server

Start the Metro development server by running:

```bash
npx react-native start
```

### Step 4: Run the App on Your Device or Emulator

For iOS, open another terminal window and run:

```bash
npx react-native run-ios
```

For Android, make sure you have an Android emulator running or an Android device connected, then run:

```bash
npx react-native run-android
```

Now, you should see your new React Native app running on your device or emulator.

---

## Required Dependencies

First, we need to install the necessary dependencies. Open your terminal and run the following commands:

```bash
npm install @react-native-community/slider
npm install react-native-orientation-locker
npm install react-native-video
```

These packages will provide the essential components for our video player: a slider for progress control, an orientation locker for handling screen orientation, and the video player itself.

## Setting Up the Video Player

Now, let’s dive into the code. Here’s a breakdown of the key parts of our video player:

### 1. Importing Dependencies:

```typescript
import React from "react";
import Slider from "@react-native-community/slider";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Orientation from "react-native-orientation-locker";
import Video, { OnProgressData } from "react-native-video";
```

### 2. State Management:

```typescript
const [clicked, setClicked] = React.useState<boolean>(false);
const [paused, setPaused] = React.useState<boolean>(false);
const [progress, setProgress] = React.useState<OnProgressData | null>(null);
const [fullScreen, setFullScreen] = React.useState<boolean>(false);
const [muted, setMuted] = React.useState<boolean>(true);
```

### 3. Functions:

```typescript
const ref = React.useRef<any>(null);

const format = (seconds: number): string => {
  let mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  let secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};
```

### 4. Video Player UI:

```typescript
return (
  <>
    {!fullScreen ? <Text style={styles.title}>Video Player App</Text> : null}
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
        onPress={() => setClicked(true)}>
        <Video
          paused={paused}
          source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}
          ref={ref}
          onProgress={(x: OnProgressData) => setProgress(x)}
          muted={muted}
          style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
          resizeMode='contain'
        />
        {clicked && progress && (
          <TouchableOpacity style={styles.overlay}>
            <View style={styles.controlsRow}>
              <TouchableOpacity onPress={() => ref.current?.seek(progress.currentTime - 10)}>
                <Image source={require('./assets/images/backward.png')} style={styles.controlIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPaused(!paused)}>
                <Image source={paused ? require('./assets/images/play-button.png') : require('./assets/images/pause.png')} style={[styles.controlIcon, styles.playPauseIcon]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => ref.current?.seek(progress.currentTime + 10)}>
                <Image source={require('./assets/images/forward.png')} style={[styles.controlIcon, styles.forwardIcon]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMuted(!muted)}>
                <Image source={muted ? require('./assets/images/mute.png') : require('./assets/images/medium-volume.png')} style={[styles.controlIcon, styles.volumeIcon]} />
              </TouchableOpacity>
            </View>
            <View style={styles.sliderRow}>
              <Text style={styles.timeText}>{format(progress.currentTime)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor='#FFFFFF'
                maximumTrackTintColor='#FFF'
                onValueChange={(x) => ref.current?.seek(x)}
              />
              <Text style={styles.timeText}>{format(progress.seekableDuration)}</Text>
            </View>
            <View style={styles.fullScreenButtonRow}>
              <TouchableOpacity onPress={() => {
                if (fullScreen) {
                  Orientation.lockToPortrait();
                } else {
                  Orientation.lockToLandscape();
                }
                setFullScreen(!fullScreen);
              }}>
                <Image source={fullScreen ? require("./assets/images/minimize.png") : require("./assets/images/full-size.png")} style={styles.fullScreenIcon} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  </>
);
```

### 5. Styling for video-player:

```typescript
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 24,
    color: "#000000",
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  controlsRow: {
    flexDirection: "row",
  },
  controlIcon: {
    width: 30,
    height: 30,
    tintColor: "white",
  },
  playPauseIcon: {
    marginLeft: 50,
  },
  forwardIcon: {
    marginLeft: 50,
  },
  volumeIcon: {
    marginLeft: 50,
  },
  sliderRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
  },
  slider: {
    width: "80%",
    height: 40,
  },
  timeText: {
    color: "white",
  },
  fullScreenButtonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
  },
  fullScreenIcon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
});
```

## Understanding the Code

- **Importing Dependencies:** We import necessary components from `@react-native-community/slider`, `react-native-orientation-locker`, and `react-native-video`.
- **State Management:** We use React hooks to manage the state of our video player, including play/pause, progress, fullscreen, and mute states.
- **Video Player UI:** We define the UI of our video player, including the video component itself and control overlays for play/pause, seek, and fullscreen toggles.

## Conclusion

Building a video player in React Native is a valuable skill that can significantly enhance your app’s multimedia capabilities. Whether you’re working on an educational app, a social media platform, or any other project that benefits from video content, this tutorial provides a solid foundation.

Remember, integrating video can make a profound impact on user engagement, just like it did for the students in the e-learning startup. So, get creative, experiment with the code, and bring your app to life with video!

If you have any questions or need further assistance, feel free to reach out. Happy coding!

---

> Enjoyed the read? If you found this article insightful or helpful, consider supporting my work by buying me a coffee. Your contribution helps fuel more content like this. [Click here](https://buymeacoffee.com/yugjadvani9) to treat me to a virtual coffee. Cheers!
