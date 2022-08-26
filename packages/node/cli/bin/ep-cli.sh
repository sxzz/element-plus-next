#!/bin/bash

basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case $(uname) in
*CYGWIN*) basedir=$(cygpath -w "$basedir") ;;
esac

if [ -z ${EP_DEV+x} ]; then
  /usr/bin/env node "$basedir/../run-published.js" "$@"
else
  pnpm tsx -C dev "$basedir/../src/index.ts" "$@"
fi
