#!/usr/bin/env node
import { checkPackageVersion } from './actions/check-package-version.js';
import { askDetails } from './actions/ask-details';
import { createTempDir } from './actions/create-temp-dir';
import { getLatestRelease } from './actions/get-latest-release';
import { extractFile } from './actions/extract-file';
import { cleanUp } from './actions/cleanup';

export const startCli = () => checkPackageVersion()
  .then(askDetails)
  .then(createTempDir)
  .then(getLatestRelease)
  .then(extractFile)
  .then(cleanUp);
