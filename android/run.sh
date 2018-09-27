#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.evanbacon.demofirebasemodulesapp/host.exp.exponent.MainActivity
