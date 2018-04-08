#!/bin/sh
case "$CONFIGURATION" in
  Debug)
  # Speed up build times by skipping the creation of the offline package for debug
  # builds on the simulator since the packager is supposed to be running anyways.
    if [[ "$PLATFORM_NAME" == *simulator ]]; then
      echo "Skipping bundling for Simulator platform"
      exit 0;
    fi

    DEV=true
    ;;
  "")
    echo "$0 must be invoked by Xcode"
    exit 1
    ;;
  *)
    DEV=false
    ;;
esac

set -x
DEST=$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH

if [[ "$CONFIGURATION" = "Debug" && ! "$PLATFORM_NAME" == *simulator ]];
then
  PLISTBUDDY='/usr/libexec/PlistBuddy'
  PLIST=$TARGET_BUILD_DIR/$INFOPLIST_PATH
  IP=$(ipconfig getifaddr en0)
  if [ -z "$IP" ]; then
    IP=$(ifconfig | grep 'inet ' | grep -v 127.0.0.1 | cut -d\   -f2  | awk 'NR==1{print $1}')
  fi
  $PLISTBUDDY -c "Add NSAppTransportSecurity:NSExceptionDomains:localhost:NSTemporaryExceptionAllowsInsecureHTTPLoads bool true" "$PLIST"
  $PLISTBUDDY -c "Add NSAppTransportSecurity:NSExceptionDomains:$IP.xip.io:NSTemporaryExceptionAllowsInsecureHTTPLoads bool true" "$PLIST"
  echo $IP > "$DEST/ip.txt"
fi


