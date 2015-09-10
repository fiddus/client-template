#!/usr/bin/env bash

########################################################################################################################
# Instructions
########################################################################################################################
#
# 1. Execute this command ". ./project.sh"
# 2. Type "help" + Enter to show available functions
# 3. That's it, have a good work!
#


########################################################################################################################
# Command colors
########################################################################################################################

RESTORE='\033[0m'
RED='\033[00;31m'
GREEN='\033[00;32m'
YELLOW='\033[00;33m'
CYAN='\033[0;36m'


########################################################################################################################
# Help function
########################################################################################################################

function help {
    echo_red "---------------------------------------------------------------------------------------------------------"
    echo -e ""
    echo -e "${CYAN}help${RESTORE}          Prints this help"
    echo -e ""
    echo -e "${CYAN}serve${RESTORE}         Builds the front-end into the ${GREEN}build${RESTORE} folder and start a local server to serve this files."
    echo -e ""
    echo -e "${CYAN}build${RESTORE}         Build ${GREEN}Fiddus${RESTORE} place it at ${GREEN}build${RESTORE} folder"
    echo -e ""
    echo -e "${CYAN}production${RESTORE}    Build ${GREEN}Fiddus${RESTORE} and place it at ${GREEN}/var/www/fiddus${RESTORE} path"
    echo -e ""
    echo -e "${CYAN}test${RESTORE}          Perform front-end tests"
    echo -e ""
    echo -e "${CYAN}check${RESTORE}         Check code style with JavaScript Code Style (${GREEN}JSCS${RESTORE}) as well check code errors with ${GREEN}JSHint${RESTORE}"
    echo -e ""
    echo -e "${CYAN}jshint${RESTORE}        Check code errors with ${GREEN}JSHint${RESTORE}"
    echo -e ""
    echo -e "${CYAN}jscs${RESTORE}          Check code style with JavaScript Code Style (${GREEN}JSCS${RESTORE})"
    echo -e ""
    echo_red "---------------------------------------------------------------------------------------------------------"
}


########################################################################################################################
# Work functions
########################################################################################################################

function serve {
    echo_green "Press 'Ctrl' + 'c' to exit"
    grunt serve
}

function build {
    dorun "grunt build" "Build Fiddus website and add it at /var/www/fiddus folder"
    exitcode=$?
    return $exitcode
}

function production {
    dorun "grunt production" "Build Fiddus website at /var/www/fiddus folder"
    exitcode=$?
    return $exitcode
}

function test {
    dorun "grunt test-client" "Mocha Tests"
    exitcode=$?
    return $exitcode
}

function check {
    dorun "grunt check" "JSHint & SCSC"
    exitcode=$?
    return $exitcode
}

function jshint {
    dorun "grunt jshint" "JSHint - Check code errors"
    exitcode=$?
    return $exitcode
}

function jscs {
    dorun "grunt jscs" "JSCS - Check code styles"
    exitcode=$?
    return $exitcode
}


########################################################################################################################
# Configuration functions
########################################################################################################################

function echo_red {
    echo -e "${RED}$1${RESTORE}";
}

function echo_green {
    echo -e "${GREEN}$1${RESTORE}";
}

function echo_yellow {
    echo -e "${YELLOW}$1${RESTORE}";
}

function echo_cyan {
    echo -e "${CYAN}$1${RESTORE}";
}

function now_milis {
    date +%s | cut -b1-13
}

function dorun {
    cmd_first="$1"
    cmd_second="$2"
    name="$3"
    echo_red "---------------------------------------------------------------------------------------------------------"
    echo_green "STARTING ${YELLOW} $name ${GREEN} ..."
    echo_cyan "$cmd_first"
    t1=$(now_milis)
    eval "$cmd_first"

    exitcode=$?
    t2=$(now_milis)
    delta_t=$(expr $t2 - $t1)

    if [ $exitcode == 0 ]
    then
        echo_green "Finished task '${YELLOW}$name${GREEN}' in $delta_t ms"
        echo_red "---------------------------------------------------------------------------------------------------------"
    else
        echo_red "Error running task '${YELLOW}$name${RED}' (status: $exitcode, time: $delta_t ms)"
        echo_red "---------------------------------------------------------------------------------------------------------"
        return $exitcode
    fi
}


########################################################################################################################
# Welcome message
########################################################################################################################

echo_green "Welcome to the Fiddus Development Environment"
echo_green "See available commands below:"
help
