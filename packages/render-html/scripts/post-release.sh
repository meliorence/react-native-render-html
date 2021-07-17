#!/bin/bash

# Fail early
set -e

declare -rx name=$1
declare -rx version=$2
declare -rx isDry=$3
declare -rx canonicalVersion=${version%-*}
declare -rx minorVersion=${canonicalVersion%.*}
declare -x preReleaseTag=${version#[0-9]*.[0-9]*.[0-9]}
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
fi

execTagLatest foundry
