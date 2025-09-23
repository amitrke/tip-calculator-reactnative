#!/bin/bash

# Maestro Test Runner for Tip Calculator App
# Usage: ./run_maestro_tests.sh [platform] [flow]
# Platform: android, ios (default: android)
# Flow: specific flow file or 'all' (default: all)

PLATFORM=${1:-android}
FLOW=${2:-all}

echo "Running Maestro tests for Tip Calculator App"
echo "Platform: $PLATFORM"
echo "Flow: $FLOW"

if [ "$FLOW" = "all" ]; then
    echo "Running all flows..."
    maestro test . --platform $PLATFORM
else
    echo "Running flow: $FLOW"
    maestro test $FLOW --platform $PLATFORM
fi

echo "Tests completed. Screenshots saved in maestro/screenshots/"
