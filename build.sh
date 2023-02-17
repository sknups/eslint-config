#!/usr/bin/env bash

set -e

###############################################################################
# CONSTANTS                                                                   #
###############################################################################

# exit codes
FAILURE=1

# colors
# shellcheck disable=SC2034
ANSI_BRIGHT="\033[1m"
ANSI_LIGHT_RED="\033[91m"
ANSI_LIGHT_GREEN="\033[92m"
ANSI_LIGHT_YELLOW="\033[93m"
ANSI_RESET="\033[0m"

###############################################################################
# VARIABLES                                                                   #
###############################################################################

SCRIPT_START_TIME=0
SCRIPT_ELAPSED_TIME=0

###############################################################################
# ALIASES                                                                     #
###############################################################################

shopt -s expand_aliases

alias now="date +%s"
alias echo="echo -e"

###############################################################################
# FUNCTIONS                                                                   #
###############################################################################

function build {

  echo "Checking shell scripts..."
  if ! [[ $(command -v shellcheck) ]] ; then
    error "shellcheck must be installed!"
  fi
  shellcheck ./*.sh || error

  echo "Checking YAML.."
  if ! [[ $(command -v yamllint) ]] ; then
    error "yamllint must be installed!"
  fi
  find .  \( -name "*.yml" -o -name "*.yaml" \) -not -path "./node_modules/*" -print0 | \
    while IFS= read -r -d '' YAML
  do
    yamllint -s "${YAML}" || error
  done

  echo "Checking package.json..."
  if ! [[ $(command -v jq) ]] ; then
    error "jq must be installed!"
  fi

  # modify package.json to have correct Git repository URL
  PACKAGE_GIT_REPOSITORY=$(jq -r '.repository.url' package.json)
  EXPECTED_GIT_REPOSITORY="git+$(git config --get remote.origin.url)"
  if [[ "${PACKAGE_GIT_REPOSITORY}" != "${EXPECTED_GIT_REPOSITORY}" ]] ; then
    echo "Setting Git repository to ${EXPECTED_GIT_REPOSITORY}"
    JQ_COMMAND=".repository.url = \"${EXPECTED_GIT_REPOSITORY}\""
    jq "${JQ_COMMAND}" package.json > package.json.modified
    mv package.json.modified package.json
  fi

  # if npm package is going to be published to Artifact Registry...
  PACKAGE_PRIVATE=$(jq -r '.private' package.json)
  if [ "$PACKAGE_PRIVATE" != "true" ] ; then

    # ...check package name HAS been modified since it was cloned from template
    PACKAGE_NAME=$(jq -r '.name' package.json)
    if [[ "${PACKAGE_NAME}" =~ ^.*-template$ ]] ; then
      error "Did you forget to change the package name?"
    fi
    if ! [[ "${PACKAGE_NAME}" =~ ^@sknups/.*$ ]] ; then
      error "Package name must be scoped, e.g. @sknups/foo"
    fi

    # ...check package version has NOT been modified since it was cloned from template
    PACKAGE_VERSION=$(jq -r '.version' package.json)
    if [ "$PACKAGE_VERSION" != "0.0.1-snapshot" ] ; then
      error "The package version MUST remain \"0.0.1-snapshot\"!"
    fi

  fi

  if ! [[ $(command -v node) ]] ; then
    error "Node.js must be installed!"
  fi

  echo "Configuring npm..."
  npm config set update-notifier false || error
  npm config set audit false || error
  npm config set fund false || error

  echo "Sorting package.json ..."
  npx sort-package-json || error

}

function start_timing {

  SCRIPT_START_TIME=$(now)

}

function stop_timing {

  SECONDS=$(($(now) - SCRIPT_START_TIME))
  SCRIPT_ELAPSED_TIME=""

  if [ ${SECONDS} -eq 0 ] ; then
    SCRIPT_ELAPSED_TIME="nil"
  else
    if [ ${SECONDS} -ge 60 ] ; then
      SCRIPT_ELAPSED_TIME="$(( SECONDS / 60 )) min "
    fi
    SCRIPT_ELAPSED_TIME="${SCRIPT_ELAPSED_TIME}$(( SECONDS % 60 )) sec"
  fi

}

function success {

  stop_timing

  echo "${ANSI_LIGHT_GREEN}"
  echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"
  echo "┃  ⭐️  SUCCESS                                                                 ┃"
  echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"
  echo
  echo "  Time elapsed:  ${SCRIPT_ELAPSED_TIME}"
  echo "${ANSI_RESET}"
  echo

}

function error {

  MESSAGE=$1

  stop_timing

  echo "${ANSI_LIGHT_RED}"
  echo
  echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"
  echo "┃  🛑  ERROR                                                                   ┃"
  echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"
  echo
  echo "  ${MESSAGE}" > /dev/stderr
  echo
  echo "  Time elapsed:  ${SCRIPT_ELAPSED_TIME}"
  echo "${ANSI_RESET}"

  exit ${FAILURE}

}

function abort {

  stop_timing

  echo "${ANSI_LIGHT_YELLOW}"
  echo
  echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"
  echo "┃  ⚠️  ABORTED                                                                  ┃"
  echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"
  echo
  echo "  Time elapsed:  ${SCRIPT_ELAPSED_TIME}"
  echo "${ANSI_RESET}"

  exit ${FAILURE}

}

###############################################################################
# SCRIPT                                                                      #
###############################################################################

start_timing

# if "CTRL-C" is seen, abort
trap abort INT

# Execute from the root of our Git repository
cd "$(dirname "$0")"

build

success
