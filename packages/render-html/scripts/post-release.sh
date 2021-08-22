#!/bin/bash

# Fail early
set -e

declare -rx name=$1
declare -rx version=$2
declare -rx isDry=$3
declare -rx canonicalVersion=${version%-*}
declare -rx minorVersion=${canonicalVersion%.*}
declare -x preReleaseTag=$(echo "${version}" | cut -d "-" -sf2)
declare dryRun
preReleaseTag=${preReleaseTag:1}

if [ -n "$isDry" ]; then
    dryRun=dryrun
fi

if [ -z "$name" ]; then
    echo "Missing package name"
    exit 1
fi

if [ -z "$version" ]; then
    echo "Missing version name"
    exit 1
fi

# A time buffer to make sure npm will allow the tagging
sleep 2

dryrun() {
    if [[ ! -t 0 ]]; then
        cat
    fi
    printf -v cmd_str '%q ' "$@"
    echo "dry: $cmd_str" >&2
}

execTagLatest() {
    echo "Tagging $name@$version with tag $1"
    $dryRun yarn npm tag add "$name@$version" "$1"
}

execGit() {
    $dryRun git "$@"
}

runGithubActions() {
    # https://docs.github.com/en/rest/reference/actions#create-a-workflow-dispatch-event
    curl \
        -X POST \
        -H "Accept: application/vnd.github.v3+json" \
        -H "authorization: Bearer $GITHUB_TOKEN" \
        https://api.github.com/repos/meliorence/react-native-render-html/actions/workflows/npm.yml/dispatches \
        -d '{"ref":"master","inputs":{"version":"'"${version}"'"}}'
}

# echo 0 if $1 == $2, 1 if $1 > $2, -1 if $1 < $2
versionsAreEqual() {
    declare -r firstCanonical=${1%-*}
    declare -r firstPrerelease=$(echo "${1}" | cut -d "-" -sf2)
    declare -r secondCanonical=${2%-*}
    declare -r secondPrerelease=$(echo "${2}" | cut -d "-" -sf2)
    if [[ "$firstCanonical" > "$secondCanonical" ]]; then
        echo 1
        return
    fi
    if [[ "$firstCanonical" < "$secondCanonical" ]]; then
        echo -1
        return
    fi
    if [[ -z "$firstPrerelease" && -n "$secondPrerelease" ]]; then
        echo 1
        return
    fi
    if [[ -n "$firstPrerelease" && -z "$secondPrerelease" ]]; then
        echo -1
        return
    fi
    if [[ "$firstPrerelease" > "$secondPrerelease" ]]; then
        echo 1
        return
    fi
    if [[ "$firstPrerelease" < "$secondPrerelease" ]]; then
        echo -1
        return
    fi
    echo 0
}

getLastNext() {
    npm dist-tag ls react-native-render-html | grep -e "^next:" | awk '{for(i=1;i<=NF;i++)if($i=="next:")print $(i+1)}'
}

if [ -z "$preReleaseTag" ]; then
    declare tag="release/$minorVersion"
    declare currentBranch
    # If this is not a pre-release, we should set a release/minor dist-tag
    execTagLatest "$tag"
    currentBranch="$(git rev-parse --abbrev-ref HEAD)"
    if git show-ref --verify --quiet "refs/heads/$tag"; then
        execGit switch "$tag"
        execGit merge --ff-only "$currentBranch"
    else
        execGit switch -c "$tag"
    fi
    execGit push -u origin "$tag"
    execGit checkout "$currentBranch"
    declare -r lastNextVersion=$(getLastNext)
    declare -r compareLastNext=$(versionsAreEqual "$version" "$lastNextVersion")
    # If version@next is lower than current, tag current with next
    if ((compareLastNext == 1)); then
        execTagLatest "next"
    fi
else
    execTagLatest "next"
fi

execTagLatest foundry
runGithubActions
