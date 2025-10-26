#!/usr/bin/env sh
# Husky bootstrap script
if [ "$HUSKY" = "0" ]; then
  exit 0
fi

if [ -n "$HUSKY_GIT_PARAMS" ]; then
  export GIT_PARAMS="$HUSKY_GIT_PARAMS"
fi

if [ -n "$HUSKY_GIT_STDIN" ]; then
  export GIT_STDIN="$HUSKY_GIT_STDIN"
fi

